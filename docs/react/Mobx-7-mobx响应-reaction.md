# Mobx-7-mobx响应-reaction

- reaction  接受两个函数参数         

    - 第一个称为 **数据函数**，用来追踪并返回数据，作为第二个函数的输入          

    - 第二个称为 **效果函数**，接受第一个函数返回的数据为参数，执行相应的响应逻辑        

- 和 autorun 比较：    
    
    1. autorun 接受的也是一个效果函数，一旦依赖改变，效果函数就自动执行。reaction 的效果函数是依赖于第一个函数所追踪(所访问的)数据改变         

    2. autorun 的效果函数，编译时会自动执行一遍，但 reaction 的效果函数默认执行一次，只有依赖改变才执行。      

- 返回一个清理函数 disposor， 调用该清理函数，则停止监控      

- 第三个参数是一个参数对象，可以增加更细粒度的控制。      

    1. fireImmediately: 布尔值，用来标识效果函数是否在数据函数第一次运行后立即触发。默认值是 false 。       

    2. delay: 可用于对效果函数进行去抖动的数字(以毫秒为单位)。如果是 0(默认值) 的话，那么不会进行去抖。         

    3. equals: 默认值是 comparer.default 。如果指定的话，这个比较器函数被用来比较由 数据 函数产生的前一个值和后一个值。只有比较器函数返回 false 效果 函数才会被调用。此选项如果指定的话，会覆盖 compareStructural 选项。        

    4. name: 字符串，用于在例如像 spy 这样事件中用作此 reaction 的名称。         

    5. onError: 用来处理 reaction 的错误，而不是传播它们。           

    6. scheduler: 设置自定义调度器以决定如何调度 autorun 函数的重新运行        

例子：       

```js
import { observable, reaction } from "mobx";

const demo = observable({
  time: 0
});

setInterval(() => {
  demo.time++;
}, 2000);

reaction(
  () => {
    return demo.time;
  },
  (time, reaction) => {
    if (time > 5) {
      reaction.dispose();
      return;
    }
    console.log(time);
    setTimeout(() => {
      console.log(time + "定时器");
    }, 1000);
  }
);

```     

- 注意的是，效果函数还可以接受第二个参数，为 reaction 本身。可以调用 reaction.dispose(), 在效果函数内部停止监听(如果需要的话)         

