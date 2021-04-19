# css 文件的引入

引入 css 文件感觉很少用了啊，都是用框架了。。。      

不过还是总结一下吧。     

一般是两种方式 link 和 @import       

## link 标签     

link 引入方式是这样的。     

```html
<head>
<link href='url' rel='stylesheet' type='text/css'/>
</head>
````      

其中的 type 和我们的 content-type 头部的 MINE 类型很像。      

然后注意的是，它会按顺序加载，也就是说引入多个文件的话，如果有作用相同属性，后面是会覆盖前面的。        


## import 引入

具体用法如下：     

```html
<style type="text/csss">
@import"url";
</style>
```     

导入式的主要问题是，等待 html 文档装载完之后，才会装载该 css 文件，就导致可能会先闪出没有 css 的页面。      

