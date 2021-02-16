# 子组件中的 data 为什么不是一个对象
  
## 前言

我们先不谈 vue 我们来谈一谈 js 的对象    

```js
class Com {}
Com.prototype.data = {
  a: 1,
  b: 2
};
let com1 = new Com();
let com2 = new Com();

console.log(com1.data.a, com2.data.a); //1 1

com1.data.a = 3;

// 改变 com1 的 data.a,  com2.data.a 也跟着改变了
// 因为它们两个共用一个 data 对象

console.log(com2.data.a); // 3
```

正如上面的代码所展示的，

我们在 Com 类的原型上定义了一个 data 对象    

结果就是，凡是用 Com 创建出来的实例，都会共享这个 data 对象    

---

再来看下面的例子

```js
class Com {
  data = this.data();
}
Com.prototype.data = function() {
  return {
    a: 1,
    b: 2
  }
};
let com1 = new Com();
let com2 = new Com();

console.log(com1.data, com2.data); //  { a: 1, b: 2 } { a: 1, b: 2 }

com1.data.a = 3;

// 改变 com1.data.a,  com2.data.a 没有改变
// 因为它们各自通过 data 函数返回了一个新的对象，这只属于它们自己

console.log(com1.data, com2.data); //  { a: 3, b: 2 } { a: 1, b: 2 }
```    

解释一下：    

我们在 Com 类中给他定义了一个 data 属性，并让他等于它原型上的 data() 函数    

之后，我们 new 的对象都会各自得到一个 data() 返回的对象的副本    

## vue 组件中的 data

好了，再回到我们的 vue 上    

其实，组件也类似一个个类，我们在复用组件的时候，其实也是在 new 一个副本    

在根组件中，我们的 data 可以直接使用对象，因为根组件只有一个，不会复用    

但子组件是很大概率被复用的，为了避免各个复用组件共享 data，互相干扰，我们就采用 data 作为一个函数，来 return 一个对象，如此，每当复用该组件的时候，就会新创建一个 data 副本。    

来看一下例子，加深理解：    

考虑到，子组件 data 用对象的话，vue 会直接报错，因此这里我们仅实现 data 用函数

```html
<body>
    <div id="app">
        <input type='text' v-model='msg'>
        <span>{{msg}}</span>
        <Com></Com>
        <Com></Com>
    </div>
</body>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>

    let Com = {
        template:`
        <div>
            <input type='text' v-model='msg'>
            <span>{{msg}}</span>
        </div>
        `,
        data() {
            return {
                msg: ''
            }
        }
    }
    let app = new Vue({
        el: '#app',
        components: {
            Com
        },
        data: {
            msg:''
        },
        
    })
</script>
```
效果如下：    

![](./assets/vuedata.jpg)
