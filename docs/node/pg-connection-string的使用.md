## pg-connection-string 的使用

pg-connection-string 上面有一个 parse 方法      

可以把 PostgresSQL 连接参数由字符串解析为对象       

用法如下：      

```js
var parse = require('pg-connection-string').parse;

var config = parse('postgres://someuser:somepassword@somehost:381/somedatabase')

console.log(config);

// 打印如下
// [Object: null prototype] {
//   user: 'someuser',
//   password: 'somepassword',
//   port: '381',
//   host: 'somehost',
//   database: 'somedatabase'
// }
```