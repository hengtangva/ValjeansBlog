
# Mobx-10-异步action改变状态  


- 先来说明一下，为什么需要编写异步的 action          

- action 只对它当前包裹的函数其作用。      

- 对包裹函数中的异步函数操作是没法起效果的。         

- 原理也很简单，异步的操作在下一个 tick，所以错过了 当前 tick 的批量跟新         

## Usage

- 所以我们需要编写异步的 action 来解决这个问题      

- 用法也很简单，对于异步操作的回调，只需要将改回调也包裹一层  action 即可。         

- 所起到的效果就是，回调函数的那个 tick 如果也有多个更新的话，那么它也会处理批量更新      

方法有这这几种。        

1. 直接 action 包裹：        

```js
class Store {
  @observable a = 123;

  @action
  changeA() {
    this.a = 0;
    setTimeout(this.changeB, 1000);
  }
  @action.bound
  changeB() {
    this.a = 1000;
  }
}
var s = new Store();
autorun(() => console.log(s.a));
s.changeA();
```     

---   

- 注意这里的 @action.bound 是绑定 this 使用。          

- 注意到的是，setTimeout 是直接把函数传进去的，此时函数内部的 this 已经指向了全局(浏览器中的 window， node 中的 Timer)          

- 不过 setTimeout 也可以直接传箭头函数，就没必要手动绑定 this 了。      

- 箭头函数是 哪里声明的它，它的 this 就指哪，我们再 changeA 中声明的，this 自然自动绑定到 store 的实例上了。      


```js
class Store {

  @observable a = 123;

  @action
  changeA() {
    this.a = 0;
    setTimeout(action('changeB',()=>{
      this.a = 1000;
    }), 1000);
  }
}
```      

2. 如果不想用 action 直接包裹的话，也可以使用 语法糖   runInAction(f) 他是 action(f)() 的语法糖        

- 这个是比较推荐的方法。         

```js
class Store {

class Store {
    @observable a = 123;
  
    @action
    changeA() {
      this.a = 0;
      setTimeout(() => {
          runInAction(() => {
            this.a = 1000;
          })
        }, 1000);
    }
  }

const store = new Store();

reaction(() => {
    return store.a
},(val, reaction) => {
    console.log('a 已经改变',val);
    // reaction.dispose();
})

store.changeA();

```         

3. async/await     

- 以一个网络请求例子为例。        

```js
class Store {
    @observable githubProjects = []
    @observable state = "pending" // "pending" / "done" / "error"

    @action
    async fetchProjects() {
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = await fetchGithubProjectsSomehow()
            const filteredProjects = somePreprocessing(projects)
            // await 之后，再次修改状态需要动作:
            runInAction(() => {
                this.state = "done"
                this.githubProjects = filteredProjects
            })
        } catch (error) {
            runInAction(() => {
                this.state = "error"
            })
        }
    }
}
```    

4. flow 方法      

- flow 方法用的是生成器，和 async/await 大同小异，。因为后者就是前者基础上封装的。          

- flow 只能是一个函数，用函数将其包裹，具体使用方法如下：       

```js
class Store {
    @observable githubProjects = []
    @observable state = "pending"

    fetchProjects = flow(function * () { // <- 注意*号，这是生成器函数！
        this.githubProjects = []
        this.state = "pending"
        try {
            const projects = yield fetchGithubProjectsSomehow() // 用 yield 代替 await
            const filteredProjects = somePreprocessing(projects)
            // 异步代码块会被自动包装成动作并修改状态
            this.state = "done"
            this.githubProjects = filteredProjects
        } catch (error) {
            this.state = "error"
        }
    })
}

```     

## 总结       

- 基本大同小异。        

- 推荐是 runInAction + async/await      

- 具体使用方法，碰到再补充细节。         





