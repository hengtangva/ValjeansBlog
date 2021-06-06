# text-indent 的学习

## 前言

最近碰到一个问题，是如何让一个元素的文本内容消失在视野。         

如果使用 opacity ，display:none 的话，就整个元素就都不见了。        

这时候有个比较好用的属性就是这里的 text-indent           

## Usage 

来看 MDN 上的用法解释。       

- text-indent 属性能定义一个块元素首行文本内容之前的缩进量。         

具体的值有 px， em， rem 等，也有 百分比(相对于其包含块)            

来看一下用法:        

```html
<style>
  p {
  text-indent: 120px;
  background: powderblue;
}
</style>
<body>
   <p  href="#">hello world</p>
</body>
```
<p  style="text-indent: 120px; background: powderblue;">hello world</p>        

如上图所示，我们给 text-indent 一个 120px 的正值，p 标签的内容就像右缩进了 120px           

---       

如果我们想要其内容消失于视野中，只需给它一个很小的负值即可。        

```html
<style>
  p {
  text-indent: -120px;
  background: powderblue;
}
</style>
<body>
   <p>hello world</p>
</body>
```

<p  style="text-indent: -120px; background: powderblue;" >hello world</p>



