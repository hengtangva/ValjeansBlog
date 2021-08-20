# Mobx-4-mobx对何做出反应

首先，mobx 可以让 react 和 vue 一样，具有响应式的特点。        

他主要是对引用的指针进行监控。          

如果某个引用的是声明被观察的，那么一旦这个引用指针发生改变，就会 触发 set 去自动更新所有依赖该引用的数据。         

该数据我们一般成为改值的衍生。            

## mobx 的响应       

在 state 状态改变时，我们如果对其作了监控，则需要做一些响应处理（不然我们监控它有何意义？）          

- autorun： 接受一个回调函数，如果函数中有对应监控的引用指针，在该指针改变时，就会触发该回调函数，我们一般可以在这里做一些网络请求，打印日志              

- @computeed: 类似于 vue 中的 computed，如果 @computed 返回的数据是 state 的衍生(一般就是 state 的衍生) 的话，state 一旦改变，监控到后。会执行该函数，返回最新的值       

    - mobx 对它的优化是，如果 @computed 的值没有被引用，一般不需要重新执行           

    - 如果依赖的 state 没有发生变化，也不需要重新执行。          

---        

上面两者的区别，如果需要产生一个新的值，我们一般用的是 @computed， 如果不需要产生新的值，如网络请求，打印日志，就只需要用 autorun 即可。           


以下面的 message 对象为例。声明其所有属性都是被监控的。              

```ts
let message = observable({
    title: "Foo",
    author: {
        name: "Michel"
    },
    likes: [
        "John", "Sara"
    ]
})
```          

所有被监控的属性是如下图的绿色部分：         

:::tip
observable 的作用是递归的，也就是说，由于 author 也是对象，因此会对其进行递归操作，其将其属性也声明为被监控的。       
:::

![])(https://cn.mobx.js.org/images/observed-refs.png)

message 对象的所有属性都是可观察的，也就是说，像 message.title = 'bar' 这样的改变都会触发 mobx 做出反应。          

## 正确的改变      

```ts
autorun(() => {
    console.log(message.title)
})
message.title = "Bar"

```        
## 错误的改变        

- 错误改变 一 ：  改变了非 observable 的引用          

```js
autorun(() => {
    console.log(message.title)
})
message = observable({ title: "Bar" })
```       


- 这将不会作出反应。message 被改变了，但它不是 observable，它只是一个引用 observable 的变量，但是变量(引用)本身并不是可观察的。             


---       

- 错误改变 二 ： 在追踪函数外间接引用。      


```js

```       


---                   


这里仅举三个例子，具体更多的例子看[官方文档](https://cn.mobx.js.org/best/react.html)           


## 总结 

anyway， 至需要记住他是对被观察的引用指针进行监控即可，具体可以回去看前面的那张图。然后结合内存进行分析。            


