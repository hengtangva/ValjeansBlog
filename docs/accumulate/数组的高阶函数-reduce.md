# 数组的高阶函数-reduce


## 用法

reduce 是非常强大的一个高阶函数了，可以做很多事情        

先介绍一下 reduce 的用法。       

Array.prototype.reduce( callback(acc, cur, index, src), init )        

它接受一个回调函数，这个函数的参数是下面四个     

1. acc： 累计值       

2. cur： 当前值       

3. index： 当前值索引  (可选)        

4. arr： 使用该方法的数组  (可选)          

还接受一个可选的初始值，作为第一个元素的 acc       

- 然后注意的是，空数组上不能使用该方法。       

reduce 函数会按照顺序，为每个数组的元素执行 callback 函数。        

以累加来作为例子。       

:::tip
```js
[0, 1, 2, 3, 4].reduce((accumulator, currentValue, currentIndex, array) => {
    return accumulator + currentValue
}, 10)
```
:::        

![](./assets/reduce.jpg)         

## reduce 的应用

1. 上面例子提到的，经常用到的是，数组的求和。       

2. reduce 实现 flat         

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
           // 其实，这里也可以用 concat 一步实现。      
           // return acc.concat(cur);
        },[])
        arr = res;
    }
    return res
}
let arr = [1,2,3,[3,4],[4,[5,6]]]
console.log(flat(arr,2));
```      

3. reduce 实现 map      

```js
Array.prototype.mymap = function(callback) {
    let res = [];
    let arr = this;
    res =  arr.reduce((acc, cur, index, arr) => {
        acc.push(callback(cur, index, arr));
        return acc;
    },[])
    return res;
}
let arr = [1,2,3,4];
let res = arr.mymap((item) => {
    return item + 1; 
})
console.log(res)
```    

这里 map 接受的回调函数后面还有一个参数，用的太少，懒得考虑了。      

... 待续。。。


