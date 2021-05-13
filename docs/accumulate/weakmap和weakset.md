# weakmap 和 weakset

## 前言

它们的出现都是为了有利于垃圾的回收。        

对于一般的 map 或者 set， 由于它们对对象有了引用，因此，只有它们还在，引用的对象就不会被垃圾回收清除。      

而 weak 是弱弱着拿着的键，因此它引用的对象，垃圾回收机制不会标记。一旦没有其他引用，就会直接清除。      

具体垃圾回收机制，可以看 前端进阶里面的  垃圾回收。            


## weakmap

weakmap 和 map 用法主要就一点区别，       

1. **weakmap 的键只能是引用类型**       

2. **weakmap 是不可迭代的 weakmap.length === 0**      

不可迭代的原因是，你不知道是否经历过垃圾回收。回收一次，是否会回收 weakmap 里面的元素。             

具体用法：(copy from mdn)       

```js
const wm1 = new WeakMap(),
      wm2 = new WeakMap(),
      wm3 = new WeakMap();
const o1 = {},
      o2 = function(){},
      o3 = window;

wm1.set(o1, 37);
wm1.set(o2, "azerty");
wm2.set(o1, o2); // value可以是任意值,包括一个对象或一个函数
wm2.set(o3, undefined);
wm2.set(wm1, wm2); // 键和值可以是任意对象,甚至另外一个WeakMap对象

wm1.get(o2); // "azerty"
wm2.get(o2); // undefined,wm2中没有o2这个键
wm2.get(o3); // undefined,值就是undefined

wm1.has(o2); // true
wm2.has(o2); // false
wm2.has(o3); // true (即使值是undefined)

wm3.set(o1, 37);
wm3.get(o1); // 37

wm1.has(o1);   // true
wm1.delete(o1);
wm1.has(o1);   // false
```       

---

weakmap 的用处：(这里根据阮一峰老师的书随便提一点)       

1. 存放以 dom 节点为 key 的场景        

```js
let myElement = document.getElementById('logo');
let myWeakmap = new WeakMap();

myWeakmap.set(myElement, { timeClicked: 0 });

myElement.addEventListener('click', () => {
    let logoData = myWeakmap.get(myElement);
    logoData.timeClick++;
},false)
```       
我们可以记录该 dom 节点的点击次数，一旦 dom 节点被删除了，对应的点击记录对象也会自动被回收。      

进一步说，事件监听的  Listener 对象很适合用  WeakMap 来实现。    

```js
const listener = new WeakMap();

listener.set(element1, handle1);
listener.set(element2, handle2);

element1.addEventListener('click',listener.get(element1), false)
element2.addEventListener('click',listener.get(element2), false)
```

2. 另一个作用是设置私有属性         

ps: 我是感觉没啥用，等以后碰到使用到的情况再说吧。         

## weakset 

1. weakset 的引用也是弱引用，原来的引用不在了，weakset 的值会被垃圾回收清除。         

2. 不可迭代，weakset.length === 0        

3. weakset 只能存引用类型。      

用法： (copy from mdn )        

```js
var ws = new WeakSet();
var foo = {};
var bar = {};

ws.add(foo);
ws.add(bar);

ws.has(foo);    // true
ws.has(bar);   // true

ws.delete(foo); // 从set中删除 foo 对象
ws.has(foo);    // false, foo 对象已经被删除了
ws.has(bar);    // true, bar 依然存在
```        

应用：       

1. 存储 DOM 节点，而不用担心这些节点从文档里移除时，是否会引发内存泄漏。


