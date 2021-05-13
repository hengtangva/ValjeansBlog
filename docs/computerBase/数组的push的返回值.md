# 数组的 push 的返回值

今天想着复习一下 reduce 函数。       

于是，用 reduce 实现了一下，flat 函数。       

```js
function flat(arr, n = 1) {
    let res = [];
    for(let i = 0; i < n; i++) {
        res = arr.reduce((acc, cur) => {
           if(cur instanceof Array) {
               return acc.push(...cur)
           } else {
               return acc.push(cur)
           }
        },[])
        arr = res;
    }
    return res
}
```     

结果一直在报 acc.push is not a function        

于是，我打印 Object.prototype.toString.call(acc) ,结果是 object array        

没问题啊， 是数组啊， 为什么不能 push 呢。。。     

原来，我把 push 操作的结果返回了出去，push 可以改变当前数组，但返回的是新的数组的长度。      

所以后面的 acc 就变成了 number   ，  所以就没有  push 方法了。      

改一下:      

```js
function flat(arr, n = 1) {
    let res = [];
    for(let i = 0; i < n; i++) {
        res = arr.reduce((acc, cur) => {
           if(cur instanceof Array) {
              acc.push(...cur)
           } else {
               acc.push(cur)
           }
           return acc;
        },[])
        arr = res;
    }
    return res
}
let arr = [1,2,3,[3,4],[4,[5,6]]]
console.log(flat(arr,2)); // [1, 2, 3, 3, 4, 4, 5, 6]
```      

ok了。其实，哪些会改变原数组的，很多都是返回长度，比如 pop， shift ，unshift ，等等        

以后使用的时候，要注意一下。     