# axios 的使用    

## 前言

首先，安装 axios，      

**npm install axios --save-dev**      

或者：       

**yarn add axios --save-dev**        


## 直接当做函数调用

### get 方法

get 传参有两种传法。      

1. 在 url 后面拼接。      

2. 在 params 中传入一个对象，不过最后都会拼接到 url 后面         

---      

method 默认不写发送的就是 get 请求，不过你也可以写。            

```js
axios({
    url: "https://httpbin.org/get",
    params: {
        name:'th',
        agr:18
    },
    method: "get"
}).then((res) => {
    console.log(res)
}).catche(err => {
    console.log(err)
})
```          

### post 方法

post 请求和  get 差不多      

只不过传参数的话，是在 data 里传，并且 method 必须指明是 post        


```js
axios({
    url: 'http://httpbin.org/post',
    data: {
        name: 'valjean',
        age: 18
    },
    method: 'post'
})
```      

## 调用 axios 上面的方法

get 请求 

- 调用其上面的 get 方法          

- 该方法接收两个参数，第一个是  url ，第二个是 配置参数

```js
axios.get('http://httpbin.org/get', {
    name: 'valjean'
})
```         

---     

post 请求       

- 调用其上的 post 方法       

- 该方法接收两个参数，第一个是 url ， 第二个是 data 对象     

```js
axios.post('http://httpbin.org/post', {
    name: 'valjean',
    age: 18
})
```

---       

其他方法，包括 put， delete ，都是调用 axios.request         

具体参照 axios 源码        

## axios.all      

类似 promise.all       

可以接受多个请求，只有所有请求都有结果才返回结果      

```js
const request1 = axios.get('http://httpbin.org/get', {
    name: 'valjean'
})

const request2 = axios.post('http://httpbin.org/post', {
    name: 'valjean',
    age: 18
})

axios.all([request1, request2]).then(console.log)
```






