# new 操作符到底干了什么

js 高级教程第四版 p221    

使用 new 操作符调用构造函数，会执行如下操作：    

1. 在内存中创建一个新对象。    

2. 将这个对象的 __proto__ 指针指向构造函数的 原型(prototype)。    

3. 构造函数内部的 this 被赋值给这个对象 （即，this 指向新对象）。    

4. 执行构造函数里面的代码。（给新对象增添属性）。    

5. 如果构造函数返回空对象，则返回该对象，否则返回返回新创建的对象。    

---

要理解上述操作，我们必须了解原型和原型链，还有构造函数。这些在下一讲中会讲到。    

建议先看下一讲，再回来理解上述过程。    


自己实现 new 操作符的功能    

```js
function myNew(constructors) {

    // 1, 创建一个空对象
    let obj = {};

    // 2, 将其 __proto__ 属性指向构造函数原型
    obj.__proto__ = constructors.prototype;

    // 3, 改变 this 指针，执行构造函数
    let args = Array.prototype.slice.call(arguments, 1)// 获取构造参数,由于是类数组，所以调用 Array 上的slice方法
    let res = constructors.apply(obj, args);

    // 4, 若构造函数没有返回值，则返回实例，否则返回返回值
    if(res) {
        return obj;
    }
    return res;
}
```
---

其实，手写还是比较简单的，只要知道 new 干了什么一一实现就 ok 了。