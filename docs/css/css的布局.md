
## CSS 布局的一些模式

## 左边固定，右边自适应布局

### 前言
今天面试碰到题目，    

实现一个左侧固定宽度200px,右侧内容自适应     

我直接没写出来，感觉一部分原因是，自己太紧张，没搞清啥意思，    
其实，就左边类似一个导航栏的效果。    

### 正常思路
```css
.parent {
    position: relative;
}
.left {
    position: absolute;
    width: 200px;
}
.right {
    margin-left: 200px;
}
```
首先，父元素相对定位，让左边绝对定位的元素能以父元素为参照    

接着，左边元素绝对定位，给予200px，默认放左边    

最后，右边自适应的部分 距离左边 200px； 即左边元素的宽度，即okk了

这种题目都卡，这波是我大意了。

### flex 方法

flex 的方法是在网上借鉴来的，

```css
.parent {
    display:flex;
    background:#ddd
     }

.left {
    flex:0 0 200px; 
    background:#bbb 
    }

.right {
    background:#999
    }
```
然后解释一下，并补充 子元素的 flex 属性包含哪些属性    

首先，父元素使用了 display: flex; 即声明了 flex 布局
接着左边的元素用到了 flex: 0 0 200px; 

**子元素的 flex 属性**    

子元素的 flex 属性包含了三个属性：    

1. flex-grow: 定义元素的放大比例，默认是 0 ，即如果存在剩余空间也不放大

            如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。    
            如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍.    

    !['info'](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071014.png)

2. flex-shrink: 定义元素的缩小比例，默认是1， 即如果空间不足，元素会缩小

            如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。    
            如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。    

    !['info'](http://www.ruanyifeng.com/blogimg/asset/2015/bg2015071015.jpg)

3. flex-basis:  定义了在分配多余空间之前，项目占据的主轴空间（main size），即横轴   

            浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

**子元素 flex属性的两个常用快捷值**

1. flex: 1 (1,1,0%)  使项目均分父元素，并且保持弹性

2. flex: none (0,0,auto)  由于项目不会 grow ，也不会 shrink，失去了弹性，表现为元素最大内容宽度

**了解了上面知识， 我们再来回到题目本身**    

left 设置的 flex 属性是 0,0,200px，即既不放大也不会缩小，再给他 200px ，即可实现左边固定老。    
右边的空间自然而然也就是自适应了。

## 两边固定，中间自适应布局 

1. flex 实现     

有了上面的 flex 基础，我们第一个想法，肯定是用 flex 来实现。      

想法也很简单，容器盒子给 flex 布局，然后 justify-content: space-between    

left 和 right 给一个固定宽度，既不放大，也不收缩。    

center 就 然它有空位就放大就行了。    

实现如下：    

```html
<style>
/* 容器采用 flex 布局 */
.container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content:space-between;
}
.left {
    flex: 0 0 200px;
    background: red;
    min-height: 200px
}
.right {
    flex: 0 0 200px;
    background: red;
    min-height: 200px
}
.center {
    flex: 1;
    min-height: 200px;
    background: blue;
}
</style>
<body>
    <div class="container">
        <div class="left">left</div>
        <div class="center">center</div>
        <div class='right'>right</div>
    </div>
</body>
```
2. 定位实现    

当然，我们也可以采用定位的方法。    

让 center 的 margin-left 和 margin-right 都为 200px。空出空间    

然后，再把 left 和 right 绝对定位到对应位置即可。    

实现如下：    

```html
<style>
    .container {
        width: 100%;
        height: 100%;
        position: relative;
    }
    .center {
        background: red;
        margin: 0 200px;
        min-height: 300px
    }
    .left {
        position: absolute;
        left: 0;
        top: 0;
        background: rgb(108, 108, 212);
        min-height: 200px;
        width: 200px;
    }
    .right {
        position: absolute;
        right: 0;
        top: 0;
        background: blue;
        min-height: 200px;
        width: 200px
    }
</style>
<body>
    <div class='container'>
        <div class='left'>left</div>
        <div class='center'>center</div>
        <div class='right'>right</div>
    </div>
</body>
```

## 宽度自适应 & 宽高比 16:9

之前美团面试的时候，被问到这题，我回答是，先 width：100%       

然后通过 dom 操作得到 宽度，再设置高度为 9/16         

然后面试官要求用  css 做，就答不上来了，于是搜集了一些资料，并做个总结

## vh，vw 来做

之前，自己想到了这个方法，但是事实上，这个只能在整个视口上来做，没法做到对一个块的自适应     

这个还是写出来做个参考     

```html
<style>
.parent {
        width: 100vw;
        line-height: 56vw;
        height: 56vw;
        background-color: lightseagreen;
    }
</style>
<body>
    <div class="parent"></div>
</body>
```      

## padding 方法

这个也是网上看到用的最多的用法，      

具体看别人写的时候，是没大明白为什么这样写，去看了下 MDN 相关概念，才了解。        

这里涉及了一个包含块的概念

### 包含块

对于，padding，margin ，width,  如果是 具体数值，如 30px ，很容易确定。        

但是，如果他们的值是 百分数，这个百分数是根据谁来计算的呢？       

是根据这个盒子的 **包含块 (containing block)** 来计算的。        

---

包含块为我们的元素提供了一下两种功能：      

1. 包含块的 height
    - 要计算 height top 及 bottom 中的百分值，是通过包含块的 height 的值。         

    - 如果包含块的 height 值会根据它的内容变化，而且包含块的 position 属性的值被赋予 relative 或 static ，那么，这些值的计算值为 auto       

2. 包含块的 width      

    - 要计算 width, left, right, padding, margin 这些属性由包含块的 width 属性的值来计算它的百分值。


---

通常情况下，一个元素的包含块就是它的父元素，但也不总是这样。       

确定一个元素的包含块完全依赖于其 position 属性         

1. 若 position 为 static， relative， sticky        

    - 那么包含块就是其最近的父元素       

2. 若 position 为 absolute        

    - 那么包含块就是最近的不是 position 不是 static 的父元素        

3. 若 position 为 fixed       

    - 在连续媒体的情况下(continuous media)包含块是 viewport ,在分页媒体(paged media)下的情况下包含块是分页区域(page area)

最后，要注意的是，html 的根元素就是一个初始包含块，其宽高位视口宽高             

### 宽度自适应 & 宽高比 16:9 的实现方法

有了上面的知识，我们再来看这个布局，        

宽度自适应其实很好做到，只要 width：100%， 就行了。       

关键问题在于，高度如何得到，也就是如何让 宽度和高度产生联系。      

包含块的 width 能 让子元素的 width 和 padding 都相对其 百分比，而 padding 是有 padding-top 和 padding-bottom 这样的垂直上的高度的。       

所以，虽然我们不能直接设置 height ，但是可以让 padding 充满整个 height 来实现    

来看代码      

```html
<style>
    .container {
        width: 500px;
        height: 500px;
        background-color:lightseagreen;
    }

    .parent {
        width: 100%;
        padding-top: 50%;
        background-color: lightblue;
        position: relative;
    }

    .child {
        background-color: cyan;
        position: absolute;
        top: 100px;
        left: 100px;;
    }
</style>

<body>
    <div class='container'>
        <div class='parent'>
            <div class='child'>
                hello
            </div>
        </div>
    </div>
</body>

```      

1. 首先，我们是给了一个盒子 constainer 让其 width：500px， height：500px;        

2. 然后，我们让 parent 盒子相对 contianer 盒子 宽度自适应，宽高比 16:9        

3. 宽度自适应，我们就给 width:100%, 由于这里的 container 盒子就是 parent 的包含块，因此宽度可以充满整个盒子         

4. 然后，我们让 parent 的 padding-bottom = 9/16*100%, 这样下内边距就占了想要的高度。        

5. 由于下内边距把整个高度都占了，因此 parent 里面的元素是会溢出的，所以我们要让子元素相对 parent 绝对定位       

6. 所以 child 的 position 为 absloute ，parent 的 position 为 relative，最后，就可以让子元素定位了。




