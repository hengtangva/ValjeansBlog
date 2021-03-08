# 手写 flat

## 前言

一方面是熟悉 Array.flat 的用法，一方面也是锻炼手写代码的能力，还有细节分析的能力

## flat 作用

首先了解数组拍平的作用，它接受一个深度，安照该深度递归遍历数组，将遍历过的元素返回一个新数组     

并且碰到空位它会跳过

例子：    

```js
let a =  [1,2,3,[4,5],[6,[7,8]],9];
console.log(a.flat());  // [1,2,3,4,5,6,[7,8],9] 默认只拍平一层
console.log(a.flat(2)); // [1,2,3,4,5,6,7,8,9]  可以指定拍平层数
```

## 实现

先实现最基本的功能，     

很容易想到的是，可以遍历一下数组，如果不是数组，就直接返回该元素，如果是数组就按照指定层数进行递归。   

```js
Array.prototype.myFlat = function(arr, n = 1) {
    let res = [];
    arr.forEach((item) => {
        // 注意的是 forEach 会自动跳过空位
        // if(!item) {
        //     continue; // 跳过空位
        // }
        if(item instanceof Array && n > 0) {
            res.push(...arguments.callee(item, n-1));
        } else {
            res.push(item);
        }
    })
    return res;
}

let a = [1,[[3,4,5],6,],3];
console.log(a.flat(1));   // [1,[3,4,5],6,3]
console.log(a.flat(2));   // [1,2,3,4,5,3]
```    

由此，我们基本实现了 flat 的功能.    

除此之外，还学习了一个新的知识   

:::tip
arguments.callee()  可以递归调用函数本身，如果函数自身名字不好写，可以用这种方法递归
:::    

---

其实实现的方法还有很多种，后期有时间就都实现一遍，     

但这里想先用 reduce 实现一遍    

一方面是 熟悉 reduce 函数，一方面也是看到好多面试官指明要用 reduce    

还是先复习一下 reduce 函数吧， 之前只是用它来给数组求和。    

[1,2,3,4].reduce((acc, curval, curindex, array) => {

})   

reduce 接受一个 回调函数。    

这个回调函数接受 4 个参数，其中 acc(累计值)， curval(当前值) 是必选参数。    

我们要实现一个数组的累加就很简单    

```js
let res =[1,2,3,4].reduce((acc, cur) => {
    return acc + cur;
})
console.log(res)  // 10
```    

现在我们来用它实现我们的 flat 函数    

```js
Array.prototype.myFlat = function(arr, n = 1) {
    let res = [];
    while(n > 1) {
        res = arr.reduce(acc, cur) => {
            return acc.push(...cur);
        } )
    }
}
```

