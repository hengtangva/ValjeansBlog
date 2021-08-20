# Mobx-6-mobx响应-autorun

- autorun 比较简单，     

- 它接受一个回调函数，如果这个回调函数里有被观察的引用，并且该引用发生变化的话，就会自动执行该回调函数。      

- 注意的是，在初始编译的时候，里面的回调函数会先执行一遍。         

- 它返回一个清理函数，调用该清理函数之后，之后所有的依赖改变，该清理函数对应得 autorun 回调都不会再执行了。       

简单的例子如下;       

```js
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// 输出 '6'， 立即执行一遍

numbers.push(4);
// 输出 '10'， 引用发生改变，自动执行

// 调用清理函数
disposer();

numbers.push(5);
// 不会再输出任何值。`sum` 不会再重新计算。
```            

注意的点：     

- 一般我们使用 autorun 的话，一般是不需要产生新的值，比如网络请求，打印日志，之类的。           

- 它的第二个参数是一个对象，有如下几个属性：       

    1. delay: 可用于对效果函数进行去抖动的数字(以毫秒为单位)。如果是 0(默认值) 的话，那么不会进行去抖。       

    2. name: 字符串，用于在例如像 spy 这样事件中用作此 reaction 的名称。         

    3. onError: 用来处理 reaction 的错误，而不是传播它们。          

    4. scheduler: 设置自定义调度器以决定如何调度 autorun 函数的重新运行        
