# call apply bind    

首先，这三个函数，作用是一样的。只不过用法有所不同    

它们是函数 prototype 上定义的函数    

通过 function.apply(this, arguments), 来调用函数 function    

## 作用

**改变调用函数内 this 的指向**    

什么意思呢？    

我们来看一个例子，再来理解它     

```js
let color = 'red';
let o = {
    color: 'blue';
};
function sayColor() {
    console.log(this.color);
}

sayColor();            // red
sayColor.call(this);   //red;
sayColor.call(o);      // blue;
sayColor.call(window); //red
```   
我们来分析一下，我们定义了 sayColor 函数，且里面用到了 this    

一般来说，this 的指向是，谁调用它，this 就指向谁    

sayColor() 是在全局上调用的，于是，this 指向 window 对象，    
let color = 'red' ,也是在全局上定义的，所以这里的 color 是 window 上的属性    
this.color = 'red'        

再来看 通过 call 调用 sayColor, 我们传递的第一个参数就是 this 的指向    
所以，传 o 的时候，this.color = 'blue'  

---

再回到作用上，改变函数内部的 this 指向是很强大的    

比如，我们可以调用一个对象的方法，在 apply 的时候传入另一个对象    

这样，就好些另一个对象，也拥有了该方法   

讲了这么多，我们来看一些有用的例子    

判断对象的类型：    
```js
let array = [1,3,5,2,6,4,8];
let res = Object.prototype.toString.call(array);
console.log(res);  // [object Array]

let res2 = array.toString();
console.log(res2); // 1,3,5,2,6,4,8
```    
- toString() 是Object 原型上的一个方法    

- 每个对象都会从 Object 上继承到该方法    

- 调用 obj.toString() 返回 "[object type]"，其中 type 是对象的类型。    

那为什么 array 调用不是返回上述结果呢？    

因为 array 对象重写了该方法，让它返回数组内的值罢了    

所以，我们想判断具体某个对象的类型，就可以借用 Object 原型上的 toString 来达到效果  

---

当然，你想的话，也可以借用只要没重写该方法对象的 toString ，只不过会让代码可读性下降。    

```js
let array = [1,3,5,2,6,4,8];

let res = array.toString();
console.log(res); // 1,3,5,2,6,4,8

let obj = {
  name: 'hellen'
};
console.log(obj.toString.call(array)); // [object Array]
```    

## 三者区别

谈完了作用，我们再来谈三者的区别，区别主要是用法上的区别    

它们的第一个参数数都是对象，this 指向该对象    
第二个参数是 调用函数的参数    

| 方法 | 具体用法 |
|---|---|
|apply| 第二个参数是类数组， 立即执行|
|call| 第二个参数是参数列表， 立即执行|
|bind| 第二个参数也是参数列表，但它不会立即执行，而是返回一个新函数

```js
function sum(num1,num2) {
    return num1 + num2;
};

// apply
function applySum(num1, num2) {
    return sum.apply(this, [num1, num2]) //传的是数组
}

// call
function callSum(num1, num2) {
    return sum.apply(this, num1, num2) //传的是参数列表
}

//bind
function bindSum(num1, num2) {
    return sum.bind(this, num1, num2)() //传的是参数列表，返回函数，这里让它立即执行
}
```

## 手写三个函数    
了解了它们的作用，我们来自己实现它们，    

一方面是加深印象，另一方面也是为了应付面试    

### apply
```js
Function.prototype.myApply = function(contex = globalThis, arr) {
  // 初始值 this = window， 如果不传对象的话
  contex.fn = this; //this 为 Fuction 即我们要调用的函数，将其挂载到 contex 对象上
  let result;
  if(arr) {
    result = contex.fn(...arr);
  } else {
    result = contex.fn();
  }
  delete contex.fn;
  return result;
}

function sum(num1, num2) {
  return num1 + num2;
}
let res = sum.myApply(this,[3,5]);
console.log(res);  // 8
```

### call
```js
Function.prototype.myCall = function(contex = globalThis) {
  // 初始值 this = window， 如果不传对象的话
  contex.fn = this; //this 为 Fuction 即我们要调用的函数，将其挂载到 contex 对象上
  let result = contex.fn(...Array.from(arguments).slice(1)); // 截掉第一个对象，剩余参数传参
  delete contex.fn;
  return result;
}

function sum(num1, num2) {
  return num1 + num2;
}
let res = sum.myCall(this,3,5);
console.log(res);  // 8
```

### bind
```js
Function.prototype.myBind = function() {
    let args = Array.from(arguments);
    let t = args.shift();
    let self = this;
    return function() {
      return self.apply(t,args);
      }
  }

function sum(num1, num2) {
  return num1 + num2;
}

let res = sum.myBind(this,3,5)();
console.log(res);  // 8
```
### 总结

apply ，call 就就改变 this 指向，考虑函数传参，返回执行结果即可    

bind，返回一个函数，函数的返回值是执行结果    




