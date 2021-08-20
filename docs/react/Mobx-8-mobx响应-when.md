# Mobx-8-mobx响应-when 

- when 函数接受两个函数参数，        

    1. 第一个函数是 predictor 函数，返回 true 或者  fasle， when 会一直监听这个 predictor 函数          
    
    2. 第二个函数是 effect 函数 (即效果函数)， 只有 predictor 函数返回 true 时， 才会执行效果函数      

- 一个简单的例子：       

```js
import { observable, when } from "mobx";

const demo = observable({
  time: 0
});

setInterval(() => {
  demo.time++;
}, 1000);

when(
  () => demo.time === 3,
  () => {
    console.log(demo.time, "exit");
  }
);

```      

- 注意的是，后面的效果函数执行过后，就会自动给清理。        

- 如果想提前清理的话，when 函数返回一个清理函数 dispose ，调用它即可          

- 如果没有传入效果函数，他会返回一个 Promise，  比如上面的例子可以如下改写。       

```js
import { observable, when } from "mobx";

const demo = observable({
  time: 0
});

setInterval(() => {
  demo.time++;
}, 1000);

async function a() {
  await when(() => demo.time === 3);
  console.log(demo.time);
}

a();

```    

- 配合， async 和 await ，我们就可以在 await 后面，去处理 predictor 为 true 的逻辑了。    

