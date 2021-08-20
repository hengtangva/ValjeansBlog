# Mobx-3-可观测状态

## 一个简单的案例

先来一个简单的案例。说明一下响应式的流程           

```js
// 用 observerable 函数拿到一个可观测的对象
var obj = observable({
  id: 1
})

// 对可观测对象进行监听，一旦引用发生改变，则执行传入的回调函数
autorun(() => {console.log('观察obj',obj.id)});

// 定时改变属性
setInterval(() => {
  obj.id++;
},100000)

```            

大致流程就如上了。        

---         

下面来过一个个点。        

## 如何将一个对象变为可观察对象        

注意的是，可观察所观察的是堆中属性的引用， 可以想象成一条线，一个指针       

- 一般是两种方法

1. observable(value) ： 对 value 进行观察，返回一个新的被观察的 value。            

- 注意的是，该函数的操作是递归的，即如果对象的属性也是一个对象的话，就会继续为它的属性添加观察         

- 还有一点注意的是，这里的引用没有包括对象本身的引用，因此，直接改变对象本身是没有效果的，它只是观察了堆中的属性的引用指针           

- 关于 value 的类型所做的操作如下：       

    1. 如果 value 是ES6的 Map : 会返回一个新的 Observable Map。如果你不只关注某个特定entry的更改，而且对添加或删除其他entry时也做出反应的话，那么 Observable maps 会非常有用        
     
    2. 如果 value 是数组，会返回一个 Observable Array。        

    3. 如果 value 是没有原型的对象，那么对象会被克隆并且所有的属性都会被转换成可观察的。参见 Observable Object。             

    4. 如果 value 是有原型的对象，JavaSript 原始数据类型或者函数，会返回一个 Boxed Observable。MobX 不会将一个有原型的对象自动转换成可观察的，因为这是它构造函数的职责。在构造函数中使用 extendObservable 或者在类定义中使用 @observable。          

    5. 如果 value 是有原型的对象，JavaSript 原始数据类型或者函数，observable 会抛出。如果想要为这样的值创建一个独立的可观察引用，请使用 Boxed Observable observable 代替。MobX 不会将一个有原型的对象自动转换成可观察的，因为这是它构造函数的职责。在构造函数中使用 extendObservable 或在类定义上使用 @observable / decorat          
  


2. @observable classProperty = value ： 装饰器语法，添加装饰器的属性添加监控         

    - 该方法提供了更加细粒度的控制       
         

    - 由于 装饰器语法在 mobx 6 以上是不支持的，因此还有更普遍的写法       

```js
class Person {
    name = "John"
    age = 42
    showAge = false

    get labelText() {
        return this.showAge ? `${this.name} (age: ${this.age})` : this.name;
    }

    setAge(age) {
        this.age = age;
    }
}
// 使用 decorate 时，所有字段都应该指定 (毕竟，类里的非 observable 字段可能会更多)
decorate(Person, {
    name: observable,
    age: observable,
    showAge: observable,
    labelText: computed,
    setAge: action
})
```       


## 可观察对象的类型     

上面的方法 1，用 observable 函数中，对于不同的 value 有不同的操作，这里详细了解一下。          

### 普通的 js 对象

普通 js 对象指的是，不使用构造函数创建出来的，原型是 Object (或者没有原型) 的对象。            

如果把一个普通的 JavaScript 对象传递给 observable 方法，对象的所有属性都将被拷贝至一个克隆对象并将克隆对象转变成可观察的。             

默认情况下，observable 是递归应用的，所以如果对象的某个值是一个对象或数组，那么该值也将通过 observable 传递。        

简单的例子：       

```js
const obj = observalbe({
    name: 'valjeanth',
    age: 18,
    get getAge() {
        return this.age + 'years old';
    }
    setAge(age) {
        this.age = age;
    }
})

// 这样得到的 obj 的所有属性都是可观察的了。 、

```      

注意的几个点：     

- get 会直接转变为衍生属性 @computed        

- observable 之后，新加的属性是不被观察的，因为错过了添加观察的函数。           

- observable({}) 就等价于 observable.object({})

### 数组

如将数组传入 observable 函数的 value 的话，         

返回的是一个可观察的数组。        

一个简单的例子如下：       

```js
import {observable, autorun} from "mobx";

var todos = observable([
    { title: "Spoil tea", completed: true },
    { title: "Make coffee", completed: false }
]);

autorun(() => {
    console.log("Remaining:", todos
        .filter(todo => !todo.completed)
        .map(todo => todo.title)
        .join(", ")
    );
});
// 输出: 'Remaining: Make coffee'

todos[0].completed = false;
// 输出: 'Remaining: Spoil tea, Make coffee'

todos[2] = { title: 'Take a nap', completed: false };
// 输出: 'Remaining: Spoil tea, Make coffee, Take a nap'

todos.shift();
// 输出: 'Remaining: Make coffee, Take a nap'
```      

注意的一些点：     

1. observable(array) 等价于 observable.array(array)        

2. 同样，这里也是递归的，可以看到数组中的元素为对象，该对象的属性也被观察了。          

3. 如更不想要递归，只想浅层观察的话，可以使用第二个参数 observable.array(array, { deep: false})       

4. 它也不会改变数组本身，返回的是一个新的数组。        

5. 对数组的增删改都能被检测到。比如 shift， pop 等。     

### map      

observable.map(values?) - 创建一个动态键的 observable 映射。           

如果你不但想对一个特定项的更改做出反应，而且对添加或删除该项也做出反应的话，那么 observable 映射会非常有用。          

这里感觉和 数组作用差不多。 先放着，用到再总结。     

### 其他剩下的类型

js 的所有原始类型值都是不可变的，他们一般是存储在栈中的，没有相应的引用指针，因此它们都是不可观察的。      

如更我们想让他们变为可观察，是做不到的，但是可以转换一下思路。         

observable.box(value) 接收任何值并把值存储到箱子中。 使用 .get() 可以获取当前值，使用 .set(newValue) 可以更新值。       

类似于自己封装了一个对象，并把值存到堆中去，这样我们就可以得到引用，并观察引用了。      

例子：     

```js
import {observable} from "mobx";

const cityName = observable.box("Vienna");

console.log(cityName.get());
// 输出 'Vienna'


// 1. 可以注册上面的回调函数去监听变化
cityName.observe(function(change) {
    console.log(change.oldValue, "->", change.newValue);
});

// 2. 不过，最好还是使用 autorun 去监听     

autorun(() => {
    console.log(cityName.get());
})
cityName.set("Amsterdam");
// 输出 'Vienna -> Amsterdam
```
 

