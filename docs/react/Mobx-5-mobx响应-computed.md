
# Mobx-5-mobx响应-computed      

- computed 类似于 vue 中的计算属性。           

- 他是根据现有状态和其他对象衍生的值。 一般会返回一个新的值。             

- 当其依赖的引用(可观察) 发生改变时，就会执行其标明的函数。(所以也在响应这一类)         

- 注意的是 computed 衍生的值也是被观察的(由于他是可观察的衍生)        


- mobx 对其做了一些优化：       

    1. 如果没有其他地方使用这个 computed 值，那么就算它的引用依赖发生离开改变，它也不会去更新，因为没有必要。         

在类中我们可以使用装饰器来 @computed 来声明：        

- 一般是配合 getter     

```js
import {observable, computed} from "mobx";

class OrderLine {
    @observable price = 0;
    @observable amount = 1;

    constructor(price) {
        this.price = price;
    }

    @computed get total() {
        return this.price * this.amount;
    }
}
```       

- 或者也可以使用 decorate 语法：        

```js
import {decorate, observable, computed} from "mobx";

class OrderLine {
    price = 0;
    amount = 1;
    constructor(price) {
        this.price = price;
    }

    get total() {
        return this.price * this.amount;
    }
}
decorate(OrderLine, {
    price: observable,
    amount: observable,
    total: computed
})
```         

---       

- 如果直接使用 observable 函数来包裹对象的话，会自动把 getter 变成 computed：        

```js
const orderLine = observable.object({
    price: 0,
    amount: 1,
    get total() {
        return this.price * this.amount
    }
})
```          

----      











