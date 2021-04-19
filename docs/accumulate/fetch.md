# fetch API

## 关于 fetch

1. fetch 是 ajax 的替代方案，基于 promise 设计        

2. 但是它是一个底层 API ，没有帮助我们封装好各种各样的功能和实现        

3. 发送网络请求需要自己配置 Header ， Content-Type, 不会默认携带 cookie 等。        

4. 处理错误相对麻烦，只有网络错误才会 reject， HTTP 状态码 404 ，500 不会被标记为 reject       

5. 不支持取消一个网络请求，不能查看一个请求的进度。    