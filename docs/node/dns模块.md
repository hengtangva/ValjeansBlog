# dns 模块

dns 模块主要是来解析 域名 为 ip 地址的，用法如下：      

```js
var dns = require('dns');

dns.lookup('hengtangva.github.io', (err, address, family) => {
   console.log('ip 地址:', address);
   console.log('family', family) 
});

// 输出结果
ip 地址: 185.199.109.153
family 4
```