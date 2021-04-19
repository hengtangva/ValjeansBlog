# http 的首部

## 前言

http 报文分为 4 部分,请求(响应)行， 首部， 实体。    

请求行 很简单，就三部分: 请求方法，url，http版本。如：GET /example.html HTTP/1.1    

响应行也比较简单，三部分: http版本，响应状态码，说明信息。如：HTTP/1.1 200 OK     

实体就更简单了，就是服务度浏览器要互传的信息。     

所以，唯一复杂的就是我们的首部，它给浏览器和服务器提供了报文主体大小，所使用的语言，认证信息等内容。    

---

一般，首部的字段有四种类型     

- 通用首部字段：请求报文和响应报文都会使用的首部。    

- 请求首部字段：从客户端向服务器发送请求报文时使用的首部，补充了请求的附加内容，客户端信息，响应内容相关优先级等。     

- 响应首部字段：从服务器向客户端返回响应报文时所用的首部，补充了响应的附加内容，也会要求客户端附加额外的内容信息。    

- 实体首部字段：针对请求报文和响应报文的实体部分所用的首部，补充了资源内容更新等与实体有关的信息。    


## 通用首部字段

|首部字段名|说明|
|---|---|
| Cache-Control | 控制缓存的行为 |
| Connection | 管理连接，为 close 表明要请求关闭连接了 |
| Date | 创建报文的日期时间 |
| Via | 经过的代理服务器信息 |
| Transfer-Encoding | 指定报文主体的传输编码方式 |
| Warning | 错误通知 |

---

### Catch-Control

这个字段是重头戏，通过该字段的指令，就能操作缓存的工作机制。    

先来看看请求和响应时各自的属性值    

**缓存请求指令**    

|指令|参数|说明|
|---|---|---|
|no-cache| 无 |强制向源服务器再次验证|
|no-store|无|不缓存请求或响应的任何内容|
|max-age=[秒]|必须|响应最大的 Age 值|
|max-stale=[秒]|可省略|接受已经过期的响应|
|min-fresh=[秒]|必须|期望在指定时间内的响应仍然有效|
|no-transform|无|代理不可更改媒体类型|
|only-if-cached|无|从缓存中获取资源|
|cache-extension|-|新指令标记(token)|

**缓存响应指令**    
|指令|参数|说明|
|---|---|---|
|public|无|可以任意方向提供缓存|
|private|可省略|仅向特定用户返回响应|
|no-cache|可省略|缓存前必须确认其有效性|
|no-store|无|不缓存请求或者响应的任何内容|
|no-transform|无|代理不可更改媒体类型|
|max-age=[秒]|必须|响应最大的 Age 值|
|must-revalidate|无|可缓存但必须再向源服务器进行确认|
|proxy-revalidate|无|要求中间缓存服务器对缓存的响应有效性再进行确认|
|cache-extension|-|新指令标记{token}|

---

下面来对一些常用的进行值进行介绍

1. public 和 private 是一对，    
    - 当服务器的 Cache-Control:public,表示其他用户可以利用缓存，    
    - 当服务器的 Cache-Control:private, 表示只有特定对象可以让缓存服务器提供缓存资源，其他用户发来请求不会提供。    

2. no-cache.    
    - 当客户端包含该值时，表示客户端不会接受缓存过的响应，于是，缓存服务器必须把请求转给源服务器。    
    - 当服务器的响应中包含该指令时，那么缓存服务器就不能对该资源进行缓存    

3. no-store ,当使用该指令时，表明请求或者响应有机密信息，不能缓存。    


### Connection

Connection 字段用来表明是否连接，有两个值：    
- close： 请求关闭连接     
- Keep-Alive: 默认，保持持久连接。    


### Date

该字段表明 HTTP 报文创建的日期和时间    


## 请求首部字段

|首部字段名|说明|
|---|---|
| Accept | 用户代理可处理的媒体类型 |
| Accept-Charset | 优先字符集 |
| Accept-Encoding | 优先的内容编码 |
| Accept-Language | 优先的语言(自然语言) |
| Host | 请求资源所在服务器 |
| From | 用户电子邮件地址 |
| Range | 实体的字节范围请求 |
| User-Agent | HTTP 客户端程序信息，一般指浏览器的信息|

仅对一些常用的字段详细介绍。    

---     

### Accept
Accept 用来告诉服务器，用户代理能够处理的媒体类型及媒体类型的相对优先级。    

媒体类型（MIME） 后面的 Content-Type 会详细解说

### Host

服务器上，可以通过虚拟机，来实现一个 ip 对应多个域名。    

所以，虽然根据 url 已经可以找到服务器了，但是如果服务器上有多个虚拟机，你就不知道是找谁了。    

所以 Host 字段可以帮我们找到，是请求哪个虚拟机

### User-Agent

该字段主要是将创建请求的浏览器和用户代理名称等信息传达个服务器。    

```js
User-Agent: Mozilla/5.0 (Windows NT 6.1; WOW64; rv:13.0) Gecko/20100101 Firefox/13.0.1
```
## 响应首部字段

| 首部字段 | 说明 |
|---|---|
| Age | 推算资源创建经过时间 |
| Accept-Ranges | 是否接受字节范围请求 |
| Location | 令客户端重定向的地址 |
| Server | 服务器的信息 |

我们在这里同样，也只挑一些比较常用的来讲解。     

---    

### Accept-Ranges

该字段用来告诉客户端是否支持 范围请求，与客户端的 Range 相对应。    

该字段的值有两种，    

- bytes， 允许，
- none， 不允许     

```js
Accept-Ranges: bytes
```    

### Age

该字段告知，源服务器在多久前创建了响应，字段值单位为 秒    

若创建该响应的服务器是缓存服务器，Age 值是指缓存向服务器重新确认，到发送给客户端的时间，代理创建响应时，必须加上首部字段 Age

### Location

这个字段一般是配合重定向使用的，Location 中保存的就是重定向的地址。几乎所有浏览器在接受到该响应后，都会强制去访问 Location 中的 url。

### Server

用于告知客户端当前服务器上安装的 HTTP 服务器应用程序信息，    

比如，我用的是 apache， 那该字段可能就是这样的。    

```js
Server: Apache/2.2.6 (Unix) PHP/5.2.5
```

## 实体首部字段

| 首部字段名 | 说明 |
|---|---|
| Allow | 资源科支持的 HTTP 方法 |
| Content-Encoding | 实体主体适用的编码方式 |
| Content-Type | 实体主体的媒体类型 |
| Content-Length | 实体主体的大小(单位字节)|
| Content-Language | 实体主体的自然语言 |
| Content-Range | 实体主体的位置范围 |
| Expires | 实体主体的过期时间 | 
| Last-Modified | 资源的最后修改日期时间 |    

---    

下面是介绍一些常用的，    

### Content-Type

先说这个是因为，面试问到了，而当时我回答是 只知道 text/html    

这次认真来学，就从它开刀。    

Content-Type 主要用于指定实体主体内的 对象的媒体类型（通常称为 Multipurpose Internet Mail Extensions 或 MIME 类型 ）    

它主要的作用是表示，文档，文件，或者字节流的性质和格式。    

:::tip
浏览器通常用 MIME 来确定如何处理 url    
因此 web 服务器在响应头中添加正确的 MIME 类型非常重要。    
如何配置不正确，浏览器可能会曲解文件内容，网站将无法正常工作。
:::    

再看看 MIME 类型有哪些    

|类型|描述|典型示例|
|---|---|---|
|text| 表明文件是普通文本，理论人类可读|text/plain,text/html.text/css|
|image|表明是某种图形或者gif|image/png,image/gif,image/jpeg|
|audio|表明是某种音频文件|audio/ogg,audio/midi|
|video|表明是某种视频文件|video/ogg|
|application|表明是某种二进制文件|application/pdf,application/xhtml+xml|     

每一个 MIME 类型由 类型和子类型中间用'/'分隔而成。     

其第二个属性是 charset，即编码形式，一般 utf-8    

```js
Content-Type: text/html, charset=utf-8
```
### Allow

Allow 字段指定了服务器支持的 HTTP 方法    

比如：    

```js
Allow: GET,HEAD
```    

当用不支持的方法时，服务器会返回 405 Method Not Allowed    

同时会返回 服务器所支持的方法。    

### Content-Language

该字段会告诉客户端，实体主体所使用的自然语言。如：    

```js
Content-Language: zh-CN
```

## 其他字段

实际上，还有一些其他字段如

- Cookie

- Set-Cookie

- Content-Disposition     

等。    

### Set-Cookie 字段
Set-Cookie 字段是响应报文的字段，当客户d端第一次访问时，向客户端发送 cookie 来唯一标识客户端(http 是无状态协议)    

在该字段中，除了可以设置 cookie 的 名称和值，还可以设置一些描述 cookie 的信息。先来看看该字段的各个属性。    

- NAME = VALUE ,用来赋予 Cookie 的名称和值(必须)    

- expirs = DATE, 用来设置 Cookie 的有效期，若不指明，默认为浏览器关闭前为止。    
    * 且一旦服务器发送 cookie 到客户端，就不存在可以显示删除 cookie 的方法。    
    * 但可以通过覆盖已经过期的 cookie 来实现对客户端 cookie 的实质性删除。    

- path = PATH, 将服务器上的文件目录作为 cookie 适用对象(若不指定，则默认文档当前所在目录)。    

- domain = 域名， 用于指定访问哪个 域名 时会发送 cookie ，默认创建 cookie 的域名。    

- Secure， 只有在 HTTPS 安全通信时，才会发送 cookie。    

如下面例子     

```js
Set-Cookie: status=enable; expires=Tue,05 Jul 2021 06:32:32 GMT; path=/; domain=.ahu.com;
```
### Cookie 字段    

Cookie 字段在请求首部中，一般就是 服务端发过来的 cookie，自己一般不需要做更改    

当客户端想获得 HTTP 状态管理的支持时，就会在请求头部中包含 Cookie 。    

接受到多个 Cookie 时，同样可以以多个 Cookie 形式发送。     

