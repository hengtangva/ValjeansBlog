# set 的使用

本来只想稍微会用一下 set 就行的，奈何面试碰到了， set 里面能不能放对象，决定还是好好重学一下吧。    

其实 set 就是一个集合，不会出现重复元素。之前用的多的是数组去重，转 set 再转 arr 就 ok 了。    

要想新建一个 set 只需

**const m = new Set();**   

参数里可以传可迭代对象(一般是数组)

## set 的基本方法

1. add():  用于向集合中添加元素      

2. has()： 用啦查询集合中是否有该元素      

3. size： 获取集合元素数量       

4. delete： 删除元素      

5. clear： 也是删除元素       

来看这些方法的基本使用吧：    

```js
const m = new Set([1,2,3]);
console.log(m);  // Set { 1, 2, 3 }

// add
m.add(8);
console.log(m);  //  { 1, 2, 3, 8 }
m.add(8);
console.log(m);  //  { 1, 2, 3, 8 }

// has
console.log(m.has(8));  //  true
console.log(m.has(100));  //  false

// size
console.log(m.size);  //  4

// delete
m.delete(8);  
console.log(m);  // Set { 1, 2, 3 }

// clear
m.clear();
console.log(m)  //  Set {}
```     

## set 能放什么值

set 里面可以存任何 js 数据类型作为值，    

对于去重，基本是按照严格相等来匹配(===, 没有类型转换)    

至于说基本，是因为 NaN !== NaN, 但 set 里面只能存一个 NaN。   

## 顺序与迭代    

set 类 实现了 **\[Symbol.iterator\]** 接口 ，所以是可迭代的。     

可以用 forEach， for..of  等去迭代 set