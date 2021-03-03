# Diff 算法

diff算法, 自己实在不太熟，而且看了 InfoQ 的一篇博客，感觉自己很难写出比其还好理解的 diff 解释了。    

因此，本文大部分都按照这篇博客写。    

参考：https://www.infoq.cn/article/udlcpkh4iqb0cr5wgy7f      
  https://juejin.cn/post/6844903895467032589 

## 前言

之前，我们谈过了 vue 的响应式，还记得吗？    

当数据改变之后，会触发 set 函数，此时 watcher 要去更新 dom。     

这时候就是我们的 diff 算法登场之处了。    

diff 算法，通过比较同层树节点，来避免对树进行逐层搜索遍历，所以时间复杂度只有 O(n), 不仅在 vue 中，react 也是用 diff 的。    

## virtual dom

提到 diff 算法，就不得不先讲 virtual dom(虚拟dom) 了。    

之前看到一个很好玩的例子，在这里先分享一下    

### 一个小例子  

现在有一个需求，要你一次向 dom 中插入 10 个列表(li),问你怎么实现。    

我们先来看一个比较蠢的 实现：    

```js
const list = document.getElementById('list');

for(let i = 0; i < 10; i++) {
    const li = document.createElement('li');
    li.innerHTML = `list item ${i}`;
    list.appendChild(li);
}
```    

为什么很蠢呢？ 懂的人都懂，不懂得话我也不好和你说，毕竟这件事牵扯了太多。(狗头保命)    

好了，不开玩笑， 我们都知道，dom 操作是很昂贵的，极影响性能，所以，我们没新建一个 li 就执行 dom 操作，把它插进去，是很不划算的。    

那我们该怎么做的？ 很简单，先用个片段，把要更新的东西都攒起来，到时候，一把操作 dom 进行更新。 来看比较明智的做法。    

```js
// 先把要更新的 dom 都保存在一个片段里面
const frag = document.createDocumentFragment();
for(let i = 0; i < 10; i++) {
    let li = document.createElement('li');
    li.innerHTML = `list item ${i}`;
    frag.appendChild(li);
}
// 最后，一把执行 dom 更新。
let list = document.getElementById('list');
list.appendChild(frag);
```    

了解了上面的例子，我们再来延伸想一下，如果我们把整个 dom 都保存下来，做一个  fragment(片段) 呢？是不是更新效率会更高？    

答案是肯定的，而这，也是我们的 virtual dom 的由来。

### virtual 本质

virtual 本质就是一个 js 对象，和 dom 是一一映射的关系。    

我们先来看，如何根据 dom 来创建我们的 virtual dom    

假设有一个真实的 dom 节点 如下：    

```html
<div id = 'virtual-dom'>
    <p>Virtual Dom</p>
    <ul id = 'list'>
        <li class = 'item'> item 1</li>
        <li class = 'item'> item 2</li>
        <li class = 'item'> item 3</li>
    </ul>
    <div> hello world </div>
</div>
```

我们如何根据该 dom 得到 virtual dom 呢？    

看下面的代码

```js
function Element(tagName, props, children) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
    if(props.key) {
        this.key = props.key;
    }
    let count = 0;
    children.forEach((child, i) => {
        if(child instanceof Elemnet) {
            count += child.count;
        } else {
            children[i] = '' + child;// 字符串表示
        }
        count++;
    })
    this.count = count;
}

function createElement(tagName, props, children) {
    return new Element(tagName, props, children)
}
export default createElement;
```    

根据上述代码的解析，我们的 dom 就变成了如下的 virtual dom'：    

```js
var ul = el('div',{id:'virtual-dom'},[
  el('p',{},['Virtual DOM']),
  el('ul', { id: 'list' }, [
	el('li', { class: 'item' }, ['Item 1']),
	el('li', { class: 'item' }, ['Item 2']),
	el('li', { class: 'item' }, ['Item 3'])
  ]),
  el('div',{},['Hello World'])
]) 

```     

反过来，我们再来看看，virtual dom 是如何渲染成真实 dom 的。    

```js
Element.prototype.render = function() {
    let el = document.createElement(this.tagName);
    let props = this.props;
    for(let propName in props) {
        let val = props[propName];
        el.setAttribute(propName, val);
    }
    let children = this.children || [];
    children.forEach((child) => {
        let childEl;
        // 子节点还是节点的话，就递归
        if(child instanceof Element) {
            childEl = child.render(); 
        } 
        // 否则就创建文本节点
        else {
            childEl = document.createTextNode(child)
        }
        el.appendChild(childEl)
    })
}
```    
总的来说，就是一个递归调用的过程，之前在 react 写低代码引擎的时候，其实也写过，这里还是引用了别人的代码，自己还是太菜了。    

---

okk， 虚拟 dom 就先告一段落了.    
总结一下，就是一个 js 对象，和真实 dom 一一映射，对 dom 的操作，可以先在 虚拟dom 上进行，到时候再一起更新，减少了 dom 操作，提高了性能。    

接下来是我们的正题， diff 算法。    、

## diff 算法

diff 算法是用来比较两棵虚拟dom树的，一个是新的，一个是老的。    

目的是竟可能多用老的 virtual dom 树 的节点，这样就不必重新创一些重复的节点。    

- 比较只会在同层级进行，不会垮层级比较    

![](https://static001.infoq.cn/resource/image/91/54/91e9c9519a11caa0c5bf70714383f054.png)     

- 在 diff 比较的过程中，循环从两边向中间靠拢。    

![](https://static001.infoq.cn/resource/image/2d/ec/2dcd6ad5cf82c65b9cfc43a27ba1e4ec.png)     


---    

下面来看 diff 的流程。    

### 第一步

vue 的虚拟 dom 渲染真实的 dom 首先会对新老 Vnode 的开始和结束位置进行标记，oldStartIdx, oldEndIdx, newStratIdx,newEndIdx.     

```js
let oldStartIdx = 0 // 旧节点开始下标
let newStartIdx = 0 // 新节点开始下标
let oldEndIdx = oldCh.length - 1 // 旧节点结束下标
let oldStartVnode = oldCh[0]  // 旧节点开始vnode
let oldEndVnode = oldCh[oldEndIdx] // 旧节点结束vnode
let newEndIdx = newCh.length - 1 // 新节点结束下标
let newStartVnode = newCh[0] // 新节点开始vnode
let newEndVnode = newCh[newEndIdx] // 新节点结束vnode
```    

经过第一步之后，我们的初始新旧节点如下图：     

![](https://static001.infoq.cn/resource/image/80/6d/80dc339f73b186479e6d1fc18bfbf66d.png)     

### 第二步

标记好节点位置之后，就进入到 while 循环处理中，这里是 diff 算法的核心流程，分情况进行了新老节点的比较并移动对应的 VNode 节点，while 循环的退出条件是，新节点或者老节点的开始位置大于结束位置。    

```js
while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    ....//处理逻辑
}
```    

接下来具体介绍 while 循环中的处理逻辑，循环过程中首先对新老的 VNode 节点头尾进行比较，寻找相同节点，如果有相同节点满足 sameVNode (可以 复用的相同节点)，则直接从进行 patchVnode (该方法进行节点的复用处理)，并根据具体情况，移动新老节点的 VNode 索引，以便进入下一次循环处理，一共有 4 种情形，下面根据代码展开分析。      

**情形一**   

当新老的 Vnode 节点的 start 满足 sameVnode 时，直接 patchVnode，同时新老 VNode 节点的开始索引都 + 1.    

```js
if(sameVnode(oldStartVnode, newStartVnode)) {
    patchVnode(oldstartVnode, newStartVnode,insertedVnodeQueue, newCh, newStartIdx) {
        oldStartVnode = oldCh(++oldStartIdx);
        newStartVnode = newCh(++newStartIdx);
    }
}
```

**情形二**    
当新老 VNode 节点的 end 满足 sameVnode 时，同样直接 patchVnode 即可，同时新老 VNode 节点的结束索引都 - 1.    

```js
else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        oldEndVnode = oldCh[--oldEndIdx]
        newEndVnode = newCh[--newEndIdx]
      }

```     

**情形三**    

当老 VNode 节点的 start 和新 Vnode 节点的 end 满足 sameVnode 时，说明这次数据更新后， oldStartVnode 已经跑到 oldEndVnode 后面去了，这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldEndVnode 的后面，同时老 VNode 节点开始索引加 1，新 Vnode 节点的结束索引减 1.    

```js
else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue, newCh, newEndIdx)
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm))
        oldStartVnode = oldCh[++oldStartIdx]
        newEndVnode = newCh[--newEndIdx]
      }

```    

**情形四**    

当老 VNode 节点的 end 和新 VNode 节点的 start 满足 sameVnode 时，这说明这次数据更新后 oldEndVnode 跑到了 oldStartVnode 的前面去了。这时候在 patchVnode 后，还需要将当前真实 dom 节点移动到 oldStartVnode 的前面，同时老 VNode 节点结束索引减 1，新 VNode 节点的开始索引加 1     

```js
else if(sameVnode(oldEndVnode, newStartVnode)) {
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm)
        oldEndVnode = oldCh[--oldEndIdx]
        newStartVnode = newCh[++newStartIdx]
      }

```    

---
---

以上是有节点相同可以复用的情况，当不满足上述 4 种情形，说明没有相同节点可以复用。    

于是则通过查找事先建立好的以旧的 VNode 为 key 值，对应 index 序列为 value 值的哈希表。从这个哈希表中找到与 newStartVnode 一致 key 的旧的 VNode 节点，如果两者满足 sameVnode 的条件，在进行 patchVnode 的同时会将这个真实 dom 移动到 oldStartVnode 对应的真实 dom 的前面；如果没有找到，则说明当前索引下的新的 VNode 节点在旧的 VNode 队列中不存在，无法进行节点的复用，那么就只能调用 createElm 创建一个新的 dom 节点放到当前 newStartIdx 的位置。    

```js
else {// 没有找到相同的可以复用的节点，则新建节点处理
        /* 生成一个key与旧VNode的key对应的哈希表（只有第一次进来undefined的时候会生成，也为后面检测重复的key值做铺垫） 比如childre是这样的 [{xx: xx, key: 'key0'}, {xx: xx, key: 'key1'}, {xx: xx, key: 'key2'}] beginIdx = 0 endIdx = 2 结果生成{key0: 0, key1: 1, key2: 2} */
        if (isUndef(oldKeyToIdx)) oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
        /*如果newStartVnode新的VNode节点存在key并且这个key在oldVnode中能找到则返回这个节点的idxInOld（即第几个节点，下标）*/
        idxInOld = isDef(newStartVnode.key)
          ? oldKeyToIdx[newStartVnode.key]
          : findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
        if (isUndef(idxInOld)) { // New element
          /*newStartVnode没有key或者是该key没有在老节点中找到则创建一个新的节点*/
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
        } else {
          /*获取同key的老节点*/
          vnodeToMove = oldCh[idxInOld]
          if (sameVnode(vnodeToMove, newStartVnode)) {
            /*如果新VNode与得到的有相同key的节点是同一个VNode则进行patchVnode*/
            patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
            //因为已经patchVnode进去了，所以将这个老节点赋值undefined
            oldCh[idxInOld] = undefined
            /*当有标识位canMove实可以直接插入oldStartVnode对应的真实Dom节点前面*/
            canMove && nodeOps.insertBefore(parentElm, vnodeToMove.elm, oldStartVnode.elm)
          } else {
            // same key but different element. treat as new element
            /*当新的VNode与找到的同样key的VNode不是sameVNode的时候（比如说tag不一样或者是有不一样type的input标签），创建一个新的节点*/
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm, false, newCh, newStartIdx)
          }
        }
        newStartVnode = newCh[++newStartIdx]
      }

```    

---

我们来看 while 循环的执行过程：    

第一次循环后，newStartIndex === newEndIndex，满足**情形三**    
所以，直接复用 D 作为 diff 后创建的第一个真实节点，同时，oldIEndIndex 减 1， 移动到 C, newStartIndex 加 1，移动到 C    

![](https://static001.infoq.cn/resource/image/76/54/76032c78c8ef74047efd42c070e48854.png)    

接着开始第二轮循环，和第一次是一样的，复用 C 做为真实 dom 的第二个节点，oldEndIndex--， newStartIndex++。    

![](https://static001.infoq.cn/resource/image/1c/d7/1c76e7489660188d35f0a38ea8c8ecd7.png)    

第三轮循环，发现不符合四种情形的任何一个，于是，在旧节点队列中查找新的节点 E, 结果没有找到，只能创建新的 真实 dom 节点，作为 真实 dom 的第三个节点，同时 newStartIndex++；    

![](https://static001.infoq.cn/resource/image/4b/08/4b622c0d61673ec5474465d82305d308.png)    

第四次循环，newStartIndex === oldStartIndex，符合**情形一**    
于是，直接复用 节点 A，并且 newStartIndex++， oldStartIndex++。     

![](https://static001.infoq.cn/resource/image/59/b4/5982417c3e0b2fa9ae940354a0e67ab4.png)     

第五次循环，和第四次循环一样，直接复用 B 节点，同时    
newStartIndex++， oldStartIndex++。    

![](https://static001.infoq.cn/resource/image/16/86/16cf0ef90f6e19d26c0ddffeca067e86.png)    

此时，oldStartIndex < oldEndIndex 了。 跳出循环。    

### 第三步    

循环结束后，根据新老节点数目不同，做相应的添加或者删除，    

- 若新节点数目大于老节点，则要把多出来的节点创建出来，加入到真实的 dom 中。    

- 反之，则要删除多余的节点，使 dom 的长度等于 新节点     

```js
 if (oldStartIdx > oldEndIdx) {
      /*全部比较完成以后，发现oldStartIdx > oldEndIdx的话，说明老节点已经遍历完了，新节点比老节点多， 所以这时候多出来的新节点需要一个一个创建出来加入到真实Dom中*/
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue) //创建 newStartIdx - newEndIdx 之间的所有节点
    } else if (newStartIdx > newEndIdx) {
      /*如果全部比较完成以后发现newStartIdx > newEndIdx，则说明新节点已经遍历完了，老节点多于新节点，这个时候需要将多余的老节点从真实Dom中移除*/
      removeVnodes(oldCh, oldStartIdx, oldEndIdx) //移除 oldStartIdx - oldEndIdx 之间的所有节点
    }

```
![](https://static001.infoq.cn/resource/image/dc/ad/dc215b45682cf6c9cc4700a5425673ad.png)     

---

至此，整个 diff 的过程就全部完成了。     

总结一下，就是在 老的节点集上进行更新，和新节点集进行对比，尽可能的复用 老节点集。    











