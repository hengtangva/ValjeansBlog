# 登陆的流程

## 前言

最近自己做的小项目有登陆功能，于是，得去学一下具体登陆流程该是啥样的        

不可能就像自己以前写的那样，服务器判断下账户和密码就 ok 了

## token 的使用-请求携带 token 

首先是用到了 token， 第一次登陆的时候，后端返回的 data 里面有一个 token 和 userId       

在登陆成功的时候，可以用 vuex 将他们保存起来。      

再登陆之后的网络请求中，用 axios 的请求拦截器，拦截下来请求，并且在 header 上加上之前保存的 token     

如此，之后的请求就能正常请求到数据了。代码如下：    

login 页：      

```js
// loginRequest 是我之前封装好的请求函数
 loginRequest(reuqestData)
        .then((res) => {
          if (res.data.status == 0) {

            // 将 token 存取至 vuex 的 store

            this.$store.commit('setToken', res.data.token)

            // 将 userID存取至 vuex 中的  store

            this.$store.commit('setUserId', res.data.id);

            this.$router.push("/layout");      

          } else {
            console.log(res.message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
```             


在我们的 store/index.js 中，保存着 token         

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
      token:'',
      userId:'',
    },
    mutations: {
      setToken(state, token) {
         state.token = token;
         localStorage.token = token; // 同步更新到 localStorage
      },
      setUserId(state, id) {
        state.userId =id;
      }
    }, 
}
```      

最后，在我们 封装的 axios 的配置中拦截请求。      

```js
let instance = axios.create({
    baseURL: '/api',
    timeout: 3000
})

//  请求拦截。加上 token
instance.interceptors.request.use((config) => {
    let token = store.state.token;
    // 针对 post
    if(config.method==='post'){
        config.headers.common['token'] = token
    }
    // 针对 get
    else if(config.method==='get'){
        config.headers = {'token':token }
    }
    return config;
},err => {
    console.log(err)
})
```      
## token 过期的处理

如果 token 过期的话，是要给用户重新导航到登陆页的。       

我这边后端的接口发返回的 data 的 status 属性有三种，      

0: 表示请求成功       

1： 表示请求失败        

2： 表示 token 过期         

因此，如果 token 过期的话，这边接着发请求，是可以得到这个 status == 2 的。      

在 axios 配置里对响应做一层拦截，如果 response.data.status == 2 就确定 token 过期了，就导航至登陆页，并给提醒。          

实现如下：       

```js

import router from 'router/index'

instance.intercept.response.use((res) => {
  if(res.data.status == 2) {
      router.replace({
        path: '/login'
      });
      alert('登陆已经过期啦，请重新登陆')
  }
  return res;
}(err) => {
  console.log(err);
})
```       

## 关于页面刷新 token 失效的问题

上面用的是，vuex 保存 token 的，但是，一旦页面刷新，vuex 里保存的数据就会丢失。       

随之带来的是保存的 token 也没有了，然后就得重新登陆。       

这里有一个解决方案是，把 token 存到 localStorage 上。       

但是，localStorage 会一直保存，在下一次登陆的时候还在。       

所以比较好的解决的方案是用 sessionStorage 进行保存. 这样，页面刷新之后，token 不会立即丢失，只要关闭页面重新进入，才会删除 sessionStorage 里面的内容。       

localStorage 的写法如下：     

```js
// login
localStorage.setItem('token', res.data.token)
```

```js
//axios/index.js
instance.interceptors.request.use((config) => {
  let token = sessionStorage.getItem('token');
  if(config.method === 'post') {
    config.headers.common['token'] = token
  } 
  if(config.method === 'get') {
    config.headers = { 'token' : token}
  }
  return config
})
```