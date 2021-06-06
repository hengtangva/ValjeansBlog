# BFC

## 前言

BFC 全称是 block formatting context 即格式化上下文        

BFC 它是页面渲染的一个区域，可以看成是一个盒子，里面有着自己的布局规则，不会到影响外面，         

至于这个布局规则是什么？       

如果说 html 根元素 就是一个 BFC 你应该就懂了吧？      

是的，我们的普通文档流就是一个 BFC 。里面的布局就是先后上下布局，块元素独占一行，行内元素占满整行后才换行等等。        

还有就是常用到的 display:flex 的元素也会创建一个 BFC      

里面的规则是 jusity-content，align-items 等一系列属性定义的。      

我们默认 html 标签内的元素就是在这个大 BFC 的。        

当然，你也可以自己再创建 BFC。        

## 创建 BFC 的方式

这里仅根据 MDN 文档举例几个常见的。      

1. 根元素 (html)        

2. 浮动元素 (float 不是 none)       

3. 绝对定位元素 (position 为 absolute 或者 fixed)       

4. 行内块元素 (inline-block)         

5. overflow 不为默认的 visible 的元素       

6. display 为 flow-root ， flex， grid， table 的元素       

看到上面的各种创建 BFC 的方式，其实自己也用过很多。      

只不过用的时候，自己就没有深挖而已。       

## BFC 的作用

BFC 的作用有很多，比如 flex 创建的 BFC 就可以在里面用 flex 进行弹性布局。      

这里举例几个常用的

### 清除浮动。       

我们知道，浮动可能会带来父元素塌陷，或者说，浮动元素超出了父元素。        

这时候，我们就可以在父元素上创建一个新的 BFC 让里面的布局不会影响到外面，这样，父元素就能始终包裹浮动元素了。      

这里我们仅是想创建一个 BFC 不去包含浮动块，但是，可能你的 BFC 会带来一些副作用，因为里面的布局规则可能不一样。      

所幸的是，css 给了我们一个创建没有副作用的 BFC 即 flow-root，它创建的 BFC 里面的规则就是我们的普通文档流的规则。     

代码如下：    

```html
<style>
.parent {
        width: 300px;
        background: lightcoral;
        display: flow-root;
    }

.blue {
    background: blue;
    float:left;
    width: 50px;
    height: 90px;
}
.red {
    background: red;
    float: right;
    width: 50px;
    height: 50px;
}
.green {
    background: green;
    width: 50px;
    height: 50px;
}
</style>
<body>
    <div class="parent">
        <div class='blue'>123</div>
        <div class='red'>123</div>
        <span class='green'>123</span>
    </div>
</body>
```     

我们的 blue 元素由于浮动的缘故，脱离了原来的文档流 (normal flow)       

所以，它的高度又高于其他的非浮动元素，因此会超出其父元素。       

我们创建了一个新的 BFC 后，就能包裹这个浮动元素了。     


### 阻止元素被浮动元素覆盖

之前碰到一个场景，即浮动元素是 float: left 的。       

这样造成的结果是，其后紧跟的 div 会移动到原来浮动元素的位置。但是浮动元素会覆盖掉它。      

当然，你可以给这个元素添加 clear:left 属性，让它到浮动元素下面。        

你也可以为这个元素重新创建一个 BFC ，这样就能在浮动元素右边了。      

```html
<style>
.parent {
        width: 300px;
        background: lightcoral;
        ;
    }

.blue {
    background: blue;
    float:left;
    width: 50px;
    height: 90px;
}
.red {
    background: red;
    float: right;
    width: 50px;
    height: 50px;
}
.green {
    background: green;
    width: 50px;
    height: 50px;
    /* 这里为 green 元素重新创建了一个 BFC */
    display: flow-root;
}
</style>
<body>
    <div class="parent">
        <div class='blue'>123</div>
        <div class='red'>123</div>
        <div class='green'>123</div>
    </div>
</body>
```     

### 让外边距不折叠

默认情况下， BFC 里面的元素外边距是会折叠的。       

比如，你给上面的 div 一个 margin-bottm: 100px      

给下面的 div 一个 margin-top: 200px      

结果就是，两个 div 上下的间距是 200px ， 而不是 100 + 200 = 300px      

如果不想折叠的话，你可以为它们都创建一个 BFC        

不过觉得这个功能没啥用，你直接给元素 margin-top: 300px 不就 ok 了嘛。。。。。      



