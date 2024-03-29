# AJAX 工作原理

::: tip
个人总结 ajax 的使用
:::


## 什么是 ajax

 AJAX即“Asynchronous Javascript And XML”，是指一种创建交互式网页应用的网页开发技术

## ajax 作用
 实现网络请求的异步，因为在发送 ajax 请求数据时，浏览器是可以做其他的事的，从而提高了效率

## 如何使用 ajax

###  以get 为例
```js
 let res;
 let xhr = new XMLHttpRequest();
 xhr.open(get,'url',true);
 xhr.send();
 xhr.onreadystatechange = () => { 
	    if (xhr.readyState === 4 && xhr.status === 200)  { 
	       res = xhr.responseText;  //res 保存了请求到的数据
	      }
        } 

```

### 原理&解释
 1. MLHttpReauest 对象 即是浏览器与服务器交流的媒介，用于在后台与服务器交换数据。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。
 2. xhr.open(method,url,async)  
     - 规定请求的类型、URL 以及是否异步处理请求
     - method 为请求方法，常见有 get, post
     - url 为请求地址
     - async 表示请求是否异步，true 为异步，基本用 ajax 就是为了异步，传 true 就行了 
 3. xhr.send(string)
     - 将请求发送到服务器。
     - string 只有 post 请求才用的到，get 不需要传递参数(ps: get 发送数据在 url 里完成的)
 4. xhr.onreadystatechange
     - 当请求被发送到服务器时，执行一些基于响应的任务。每当 readyState 改变时，就会触发 onreadystatechange 事件
 5. xhr.readyState
     - 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。一般等到其状态为4 即可知道请求已经完成
     0.  请求未初始化
     1.  服务器连接已建立
     2.  请求已接收
     3.  请求处理中
     4.  请求已完成，且响应已就绪
 6. xhr.status
     - http 请求的转态码，下面仅列出一些常用的
     1. 100	请求继续
     2. 200	请求ok
     3. 301	永久重定向，302	临时重定向，304	资源未改变，读取缓存
     4. 400	客户端请求语法错误，401	要求身份认证，403 拒绝执行，404 请求资源没有找到，408 请求超时
     5. 500	服务器内部发生错误，501	服务器不支持的请求

### post 的例子
```js
let res;
let xhr = new XMLHttpRequest();
xhr.open(post,url,true);
xhr.send(string);
xhr.onreadystatechange = () => {
    if(xhr.readyState === 4 && xhr.status === 200) {
        res = xhr.responseText;
    }
}
```

## ajax 来封装 promise      

```js
let res;
new Promise((resolve, reject) => {
    let xhr = new XMlHTTPrequest();
xhr.open(get, url, true);
xhr.onreadystatechange(() => {
    if(xhr.status == 200 && xhr.readyState == 4) {
        resolve(xhr.responseText)
    } else {
        reject(xhr)
    }
})
xhr.send();
}).then((result) => {
    res = result;
}).catch(console.log)

```