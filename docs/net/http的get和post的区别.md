# get 和 post 区别

其实 get 和 post 本质是没有区别的，它们都是基于 TCP 传输，传输上没有差别。   

只要服务器支持，你完全可以在 get 里传 body，post 啥都不传。    

但是，考虑一般情况，我们还是挑一些，很明显的区别。    

## 安全性

get 在 url 中传参，post 在 request body 中传参。    

貌似是 post 更安全，但是实际上是，    

只要用 HTTP ，那大家都是明文传输，抓包工具都能抓到，都不安全。    

如果都用 HTTPS 那么大家都经过 SSL 加密了，大家都是安全的。    

## 报文的区别

**get**     

根据规范，GET 是要在 url 中传参的，形式如下：    

```js
GET /index.php?name=qiming.c&age=22 HTTP/1.1
Host: localhost
```    

一般传参是 ? 接参数，参数之间用 & 分隔，你也可以这样做。用 / 分隔参数和值    

```js
http://www.example.com/user/name/chengqm/age/22
```    
不过 服务器接收到 TCP 报文后，是用正则解析的，所以，最好用第一种，因为大部分服务器都是用第一种正则解析的(你自己的服务器随便)    

**post**   

post 是在请求报文实体主体中传递值的，即 request body。如下面例子:    

```js
POST /index.php HTTP/1.1

Host: localhost
Content-Type: application/x-www-form-urlencoded

name=qiming.c&age=22
```    

想额外说一点是，首部的 Content-Type 字段，application 表示 二进制，后面是表单形式。     

不过，你完全也可以不按照规范来，还是那句话，只要你的服务器能够支持。    


