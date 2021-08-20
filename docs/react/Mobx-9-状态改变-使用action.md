
# Mobx-9-状态改变-使用action


- redux 中，如果想改变数据，只有通过 action 对象来进行改变。通过 reduce 函数判断是什么改变，并执行相关的数据更新。                

- 不过，为了更好的组织代码，我们最好也用 action 来进行改变。         

- action 最重要的一点，是会为我们的数据更新进行暂存，再批量更新，这样就会避免没有必要的重复渲染。以达到一个性能的优化。       

- 具体原理和 react 的异步更新机制很像。       

    - 同样是先加锁，把更新全部放进队列中。     

    - tick 结束时，开锁，将队列的东西全部更新。 


## Usage   

- action 的用法很简单， 只需使用 @action 装饰器 放到 函数前面即可。       

简单的例子如下：      

```js
class Ticker {
  @observable tick = 0

  @action
  increment() {
      this.tick++ 
  }
}

const ticker = new Ticker()

autorun(() => {console.log(ticker.tick, 'autorun')});

ticker.increment();
```          

---        

不过如果就这样使用的话，那加不加 @action 其实效果都是一样的。          

我们来看看一些不一样的。           

```js
class Ticker {
  @observable name:string = 'th'
  @observable age:number = 21

  @computed get ageDetail() { 
    return this.age+'  years old' + '  5 month'
  }
  @computed get nameDetail() {
    return 'my name is ' + this.name
  }
  @action  // 这里的 action 其是由于只改一个值，因此只用做规范写法，以及让其他人知道，这里修改的是  observalbe 的对象
  grow() {
      this.age++ 
  }

  @action
  changeName(name:string) {
    this.name = name
  }
}

const ticker = new Ticker()



setTimeout(() => {
  // 这里会执行两次渲染，因为即不在组件内的钩子函数内，也不在合成事件中
  ticker.grow();
  ticker.changeName('外部函数的更新')
},1000)



setTimeout(() => {

      // runInAction(f) 是 action(f)() 的语法糖，这里的作用就是优化批量更新了。

      runInAction(() => {
        // 但这里只会执行一次渲染，因为 action 帮助了我们进行优化
        ticker.grow();
        ticker.changeName('action 包裹的更新');
      })
    },3000)



// 使组件变成响应式的
@observer
class App extends Component {

  componentDidMount() {
    // 由于时在生命周期函数内部，所以
    // 这里有两个同步更新，它会优化，进行批量更新
    ticker.grow();
    ticker.changeName('组件生命周期内的同步更新');
  }
  componentDidUpdate() {
    console.log('updated')
  }

  render() {
    return (
      <div>
        <h2>hello world</h2>
        <div>{ ticker.nameDetail }</div>
        <hr/>
        <div>{ ticker.ageDetail }</div>
      </div>
    );
  }
}

export default App;
```     

---      

- 上面列举了几种情况，旨在表明为什么要使用 action        

---       

下一节梳理一下，异步的 action。            


