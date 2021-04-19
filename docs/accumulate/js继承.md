# js 的几种继承方式

## 原型链继承

采用原型链继承是我们能最先想到的方法。    

只需要让子类的原型是父类的实例，我们就实现了继承了。     

因为，父类所有东西都放到了子类的原型上。      

子类(构造函数)创建实例时，实例也就会从它的原型上获取这些继承的属性(只要它不重写的话)。     

我们来看一看简单的实现

```js
function SuperType() {
    this.color = ['red', 'blue', 'green'];
}
function SubType() {

}
SubType.prototype = new SuperType();

let instance1 = new SubType();
instance.color.push('black');
console.log(instance1.color);  // [ 'red', 'blue', 'green', 'black' ]

let instance2 = new SubType();
console.log(instance2.color);  // [ 'red', 'blue', 'green', 'black' ]
```     

我们可以看到的是，由于子构造函数的原型是父构造函数的一个实例，     

一旦父构造函数中有函数，对象等引用类型时，子构造函数原型上也是有引用类型的。    

而这就造成了，子构造函数创建实例时，所有实例都会共享这个实例    

正如上面的 修改 instance1 的 color，会影响 instance2 的 color。     

ps：其实一种 hack 的解决办法是，把引用类型包装成一个函数，在函数中把该引用类型 return 出去。    

这样，每次调用该函数都会重新生成一个引用。    

---

为了解决上述问题，我们可以用一种叫做盗用构造函数的方法。    

## 盗用构造函数

我们可以在子构造函数中，把父构造函数都执行一遍(只需改变 this 的指向，指向自己)，就可以获得父构造函数所有属性了     

而且还是每个实例拥有自己一份引用类型。    

实现如下：    

```js
function SuperType() {
    this.color = ['red','blue','green'];
}

function SubType() {
    SuperType.call(this);  // 只需改变一下 this 的指向。
}
let instance1 = new SubType();
instance1.color.push('black');
console.log(instance1.color);  // [ 'red', 'blue', 'green', 'black' ]

let instance2 = new SubType();
console.log(instance2.color);  // [ 'red', 'blue', 'green' ]
```     

如上，解决了我们的引用类型共用的问题。     

除此之外，由于使用了 call ，我们还有第二个参数可以用，也就说我们还可以向父构造函数传参。    

```js
function SuperType(name) {
    this.name = name
}

function SubType() {
    SuperType.call(this,'sofia');
    this.age = 29;
}
let instance = new SubType();
console.log(instance.name);  // sofia
console.log(instance.age);   // 29
```    

采用盗用构造函数的方法，我们放弃了原型，也就是说，我们不能子类是不能访问父类原型上的方法的。    

带来的后果是，我们每个实例都是有一个自己的方法的，而这些方法本可以只存一个的(原型上)。     

另一个弊端是，无法用 instanceof 判断继承关系了，因为它是基于原型链的。     

---

相信也发现了， 原型链继承和盗用构造函数继承优缺点互补，所以我们可以想到将他们组合起来使用。也就是我们的组合继承。      

## 组合继承

组合继承是组合了 原型链继承 和 盗用构造函数继承    

思路是，我们用盗用构造函数来继承属性(保证引用类型属性的唯一性)     

并且用哪个原型链来继承方法(避免方法的重复存储)     

实现如下：     

```js
function SuperType(name) {
    // 属性定义在构造函数上
    this.name = name;
    this.color = ['blue', 'green', 'red'];
}
// 方法定义在原型上
SuperType.prototype.sayName = function() {
    console.log(this.name);
}
function SubType(name, age) {
    // 继承属性
    SuperType.call(this, name);
    this.age = age;
}

// 继承方法
SubType.prototype = new SuperType();

SubType.prototype.sayAge = function() {
    console.log(this.age);
}

let instance1 = new SubType('sofia', 29);
instance1.sayName();  // sofia
instance1.sayAge();  // 29
instance1.color.push('black');
console.log(instance1.color);  // [ 'red', 'blue', 'green', 'black' ]

let instance2 = new SubType('nick', 18);
instance2.sayName();  // nick
instance2.sayAge();  // 18
console.log(instance2.color);  // [ 'red', 'blue', 'green' ]

```      

--- 
前面讲的基本是构造函数如何继承。     
下面会谈一谈，仅有一个对象，不知道构造函数的额情况如何继承。     

## 原型式继承

原型式继承适合这种情况：      

你有一个对象，想在它的基础上再创建一个新对象，你可以把这个对象传给 Object.create() 函数。     

它返回给你这个对象的浅拷贝，你再对这个对象做你想要实现的事。    

Object.create() 函数是 Object 对象上的一个方法，可以直接 调用。     

它的实现基本思想如下：    

```js
Object.create = function(o) {
    function F();
    F.prototype = o;
    return new F();
}
```    
临时生成一个构造函数，让其原型为传入的对象 o 。    

再返回这个构造函数生成的实例。这个实例时有一个 _proto_  指针指向 o 的。    

来看使用它的例子。    

```js
let person = {
    name: 'nicholas',
    friends: ['sofia','cuury','james'],
     }
let anotherPerson = Object.create(person);
anotherPerson.name = 'shark';
anotherPerson.friends.push('bob');

let thirdPerson = Object.create(person);
thirdPerson.name = 'nono';
thirdPerson.friends.push('lies');

console.log(person.frieds);  // [ 'sofia', 'cuury', 'james', 'bob', 'lies' ]

```    

由于是基于原型，所以只是浅拷贝，对于引用类型实例还是会共有。     

## 寄生式继承

寄生式继承感觉和原型式继承没多大区别，只不过是在返回的浅拷贝上在增加一些其他功能并封装罢了。    

**主要思想是实现一个继承功能的工厂函数。**    

例子如下：    

```js
// 实现继承功能的工厂函数
function createAnother(obj) {
    let clone = Object.create(obj);
    clone.sayHi = function() {
        console.log('hi');
    }
    return clone;
}
let person = {
    name: 'sofia',
    friend: ['a','b','c']
}

let anotherPerson = createAnother(person);
anotherPerson.sayHi();

```    

## 寄生式组合继承

前面将了那么多，基本都是为了引出最后这个继承方法，它引用了前面的继承方法的优点，在 es6 class 出现前，是最为推荐的继承方法。    

首先回顾一下，寄生式继承是实现一个有继承功能的工厂函数，内部主要是做了层浅拷贝，再新增内容      

组合继承是 原型链继承(子构造函数的原型是父构造函数的一个实例) + 盗用构造函数继承(子构造函数 call 父构造函数，改 this)     

组合继承主要的问题是，他会调用两次父构造函数。    

- 一次是盗用构造函数实现属性继承的时候。    

- 一次是在创建子类原型时会调用。    

带来了一些不必要的消耗。    

寄生式组合继承就是通过寄生工厂函数来避免两次调用。    

实现如下：    

```js
function inheritPrototype(subtype, supertype) { // 工厂函数用于处理原型链的方法继承
    let proto = Object.create(supertype);
    proto.constructor = subtype;
    subtype.prototype = proto;
}
function SuperType(name) {
    this.name = name;
    this.color = ['blue','black','green']
}
function SubType(name, age) {
    SuperType.call(this, name);  // 盗用构造函数继承属性
    this.age = age;
}

inheritPrototype(SubType, SuperType)  // 通过寄生工厂函数继承方法。    

SubType.prototype.sayAge = function() {
    console.log(this.age);
}

```

