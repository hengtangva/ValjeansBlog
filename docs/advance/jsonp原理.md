# jsonp

之前在前端基础中，我们只是简单介绍了 jsonp 如何能实现跨域。     

这里我们来深入了解一下 jsonp 跨域的原理，并且争取自己能手写 jsonp 服务    

---

jsonp 能实现跨域的原理其实很简答，因为 script 标签不受同源策略的影响。     

那我们具体是如何实现 jsonp 跨域服务的呢？    

## 跨域是为了干嘛     

首先，我们想一个很简单的问题，跨域是为了干嘛？    

当然是获取服务器上我们想要的数据，然后用自己的函数去处理数据。    

先不管数据怎么得来，我们先把自己的数据处理函数写好     

```html
<script>
function callback(data) {
    console.log(data);
}
</script>
```    

好了，现在我们只缺数据了。    

我们经常用 cdn 去引用别的服务器上的 js 脚本，浏览器会默认执行这些脚本代码     

也就时说一个 script 加一个 src 我们就能获得服务器上的很多脚本代码，那么如果服务器通融一下，就把数据放到脚本代码呢？    

我们也就不但拿到了脚本代码，还顺便拿到了数据。    

再来看我们的浏览器这边，我们已经声明好处理函数了，只差接受的参数(数据)。     

所以，只要请求的 js 代码能把数据当做参数执行我们这边声明好的函数，就完成我们跨域想要干的事情了。    

## jsonp 的实现

我们还是一步一步来，最后再封装一个功能比较全的 jsonp 函数。    

这是我们的浏览器这边的代码      

```html
<script src = 'b.js'></script>
<script>
function callback(data) {
    console.log(data);
}
</script>
```    

这是请求服务器那边的脚本 **b.js**       

```js
callback('hello world');
```     

ok, 我们一个简单的 jsonp 跨域请求就完成了。     

请求过来的脚本执行了我们声明的函数，连带参数一起传了进来。     

---

我们再让情况复杂点。     

多加一个 script 标签总归是不好看的，我们来稍微封装一下，动态生成 script 标签     

```html
<script>
function jsonp(src, callback) {
    let scrpt = document.createElement('script');
    script.src = src;
    document.appendChild(scrpt);
    callback();
}
function showdata(data) {
    console.log(data);
}
jsonp(src, showdata);
</script>
```
