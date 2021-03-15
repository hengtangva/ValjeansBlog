# nextTick 原理

## 什么时候用 nextTick

在说原理之前，我们还是先来熟悉一下，什么时候我们需要使用 Vue.$nextTick。     

当知道什么时候用它时，想必也就对它的要实现的功能有所理解了。    

想象我们在开发时碰到一个场景，当更新了状态(数据)后，我们需要对 dom 进行一些操作。你会怎么操作呢？     

来看一下最开始的想法：    

```html
<body>
    <div class="app">
        <div ref='title'>{{msg}}</div>
        <div ref="msgDiv" id='msg'>{{msg2}}</div>
        <button @click="changeMsg">
          Change the Message
        </button>
      </div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg2: ''
  },
  methods: {
    changeMsg() {
      // 我们更新了数据
      this.msg = 'hello world';
      // 但是新的数据是从 dom 上得来
      this.msg2 = this.$refs.title.innerHTML;
    }
  },
  updated: function() {
      console.log('update')
  }
})
</script>
```    

我们来看效果：    

点击一下按钮    

![](./assets/nexttick1.jpg)     

是不是很奇怪？我们明明更新了数据啊，msg2 展示的数据应该和 msg 一样啊。    

然而事实却不是这样。    

再点击一下：    

![](./assets/nexttick2.jpg)    

现在两边是一样的。     

先带着这个疑问，我们来用 nexttick 解决问题     

```html
<body>
    <div class="app">
        <div ref='title'>{{msg}}</div>
        <div ref="msgDiv" id='msg'>{{msg2}}</div>
        <button @click="changeMsg">
          Change the Message
        </button>
      </div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg2: ''
  },
  methods: {
    changeMsg() {
      this.msg = 'hello world'
      // 改动部分，用 nexttick 包装一下
      this.$nextTick(() => {
        this.msg2 = this.$refs.title.innerHTML;
      })
    }
  },
  updated: function() {
      console.log('update')
  }
})
</script>
```    

我们点击一次按钮，两边展示数据就是一样了。    

好了，为什么会出现第一次那种情形呢？ 以及 nextTick 是如何解决问题的呢？    

我们在下面来说一下。    

## vue 的异步更新

先一个一个问题来，来看看为什么会出现上述问题。    

我们知道，vue 的数据是响应式的。    

vue 实例初始化时，已经为每个组件创建了一个 watcher，用来监听并更新。    

并且为每个属性创建了一个 dep 对象，里面存着一个 dep 数组，用于存放这些 watcher。     

一旦数据改变，set 被触发，dep 里的 watcher 就会被遍历，去更新各自对应的组件。      

```js
export function defineReactive (
) {
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get: function reactiveGetter () {
       //...省略..
      return value
    },
    set: function reactiveSetter (newVal) {
       //...省略。。。
       // set 劫持了数据变化，调用 dep.notify 函数
      dep.notify()
    }
  })
}
```

```js
// dep 对象通知 deps 数组中 watcher 执行 upadte 进行更新
  notify () {
    //...省略...
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
```     

```js
// wather 对象中执行渲染
  update () {
      //...省略...
      queueWatcher(this)
  }
```
所以关键问题就到我们这里的 **queueWatcher** 函数了     

知道了它在干嘛，我们就知道了数据更新后，vue 的渲染流程了。      

来看该函数,该函数是在 schedulers.js ，这里省略了部分代码      

```js
// 该文件中维护了一个队列，队列的元素是 watcher
const queue: Array<Watcher> = []

const activatedChildren: Array<Component> = []
let has: { [key: number]: ?true } = {}
let circular: { [key: number]: number } = {}
let waiting = false
let flushing = false
let index = 0   

// 可以先看后面，再来回看这个函数
// 这个函数主要是循环遍历 queue 中的 watcher 进行渲染更新
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow()
  //  将 flush 设置为 true，表明正在更新了。
  flushing = true
  let watcher, id

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  // 对队列排序的作用如上，如果有心的话，可以先记住这个 sort()
  queue.sort((a, b) => a.id - b.id)

  // see? 这个函数主要作用就是对该文件中维护的 queue 进行一次循环
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index]
    if (watcher.before) {
      watcher.before()
    }
    id = watcher.id
    has[id] = null  // 将该 watcher 的 id 去掉
    watcher.run()   // 然后执行 watcher.run() 进行更新

    // 后面省略一些适配的代码
  }

// 接受一个 watcher 对象为参数
export function queueWatcher (watcher: Watcher) {
  const id = watcher.id
  
  // 如果已经存在相同 id 的watcher(即同一个 watcher )， 不会执行下面代码
  if (has[id] == null) {
    // 不存在的话，就加入
    has[id] = true
    // flush  是用来判断队列是否在更新
    if (!flushing) {
      queue.push(watcher)   // 还没更新，我们就把 watcher 加入队列,
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      let i = queue.length - 1
      // 注意，我们上面的函数已经对 queue 中 watcher 按照 id 进行排序了
      while (i > index && queue[i].id > watcher.id) {
        i--
      }
      queue.splice(i + 1, 0, watcher)
    }
    // waiting 一开始设置为 fasle 的，    
    // 这里的代码在第一次会执行
    // queue the flush
    if (!waiting) {
      // 但是，执行该代码，立马就将 wait 设置为 true，也就是所，多次调用该函数的话只执行一次该代码
      waiting = true  

      // 然后就是调用 nextTick 方法了，并传了一个 flushSchedulerQueue
      // 关于这个 flushSchedulerQueue 请看上面
      nextTick(flushSchedulerQueue)
    }
  }
}
```
---     

好了，我们按照上面的分析来总结一下 

首先，我们需要明白一点，watcher 会执行 update 函数，去更新虚拟 dom。    

而这个触发渲染的操作是异步的，不是同步的。     

vue 中会维护一个队列，每当数据更新时，会将 watcher 推送到这个队列中，     

在下一次事件循环中再让其触发渲染流程。并且清空队列的所有 watcher       

然后还有一个好玩的点，不知道有没有注意到，最后，我们调用的是 nextTick 方法，可以带着这个疑惑继续往后看

---     
:::tip

这样带来什么好处呢？    

首先你可以想象一下，如果有很多数据改变，是每个 watcher 都去调用 run 方法渲染一遍好？     

还是先把它们存起来，在下一个事件循环中，虚拟 dom 进行 diff 后 一起渲染好？    

当然是后者，减少了不必要的重复  dom 操作，可以大大提高性能。     
:::
---

回到我们之前出现的问题，     

我们更新数据后，立即就去取 dom 上的元素，实际上，watcher 还没有去渲染之前更新的 dom 呢。    

所以，我们取得的 dom 也就是没有更新的 dom 。    

而渲染时在下一轮事件循环才开始的。     

所以，我们想解决问题的话，就得把 dom 的操作放到下一轮事件循环后(除非你就是想取得老的 dom)    

于是我们的 nextTick 就发挥作用了，且看它是如何起作用的。    

## nextTick 的作用    

我们的 nextTick 接受一个回调函数，并把这个回调函数放到微任务队列。    

于是，就可以等到渲染完成后再操作新的 dom。    

我们先来看不使用 nextTick 如何解决问题。    

```html
<body>
    <div class="app">
        <div ref='title'>{{msg}}</div>
        <div ref="msgDiv" id='msg'>{{msg2}}</div>
        <button @click="changeMsg">
          Change the Message
        </button>
      </div>
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
<script>
    new Vue({
  el: '.app',
  data: {
    msg: 'Hello Vue.',
    msg2: ''
  },
  methods: {
    changeMsg() {
      this.msg = 'hello world'
      // 改动部分，用 promise 包装一下
      new Promise((resolve, reject) => {
          resolve();
      }).then(() => {
          this.msg2 = this.$refs.title.innerHTML;
      })
    }
  },
  updated: function() {
      console.log('update')
  }
})
</script>
</body>
```   

其实也很简单，既然它需要在下一个事件循环才能得到新的 dom 我们直接用一个 promise 封装一下，把它放到微任务队列不就行了吗？    

实际上，nextTick 也是这样做的， 不过它还有一些其他内容。    

我们来看看 nextTick 源码，来进一步了解 nextTick 做了些什么。   

## nextTick 原理

好了，终于到了讲 nextTick 原理的部分了。    

其实感觉一来就说原理很没意思，出现问题，再解决问题，再顺着问题去看问题本质实际是上还是蛮有趣的。    

首先，我们知道 vm.nextTick 和 Vue.nextTick 是相同的，所以 nextTick 的具体实现不是在 Vue 的原型上。    

而是抽象成了一个 nextTick 方法供两个方法使用。(我们上面的异步更新的时候也用到了 nextTick 方法)    

```js
import { nextTick } from '../util/index'

// 把这个方法添加到 vue 的原型上，以供使用
Vue.prototype.$nextTick = function(fn) {
    return nextTick(fn, this)
}
```     

我们回到之前的分析的 vue 的异步渲染过程     

来看看，那里调用 nextTick 是为了干嘛？之前留了个疑问在那里呢。     

很明显呀，它接受一个回调函数，那个函数叫 **flushSchedulerQueue()**   

它是干嘛的呢？      

循环遍历文件中的 queue 中的 watcher 一起渲染。     

所以，nextTick 其实就是把这个渲染函数当做回调函数放到 微任务队列呢，等待下一轮事件循环执行。     

---

好了，这个问题解决了，我们就可以安心去看看 nextTick 源码了，看看它到底是如何把回调放到下一轮事件循环的。   

(当然不是封装一个 promise 那么简单)


next-tick.js 源码：    

```js
/* @flow */
/* globals MutationObserver */

import { noop } from 'shared/util'
import { handleError } from './error'
import { isIE, isIOS, isNative } from './env'

export let isUsingMicroTask = false;  // 是否把回调放到微任务队列

const callbacks = [];  // 存储回调函数
let pending = false

//  执行 callback 中的所有回调函数，并清空该数组
function flushCallbacks () {
  pending = false  // 执行回调 清空 callback 队列的时候，又把 pedding 置为 fasle 为下一轮事件循环做准备
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}

let timerFunc

// 下面是各个环境的是适配

// 如果支持 promise 的话，我们当然首选 promise 封装，放入 微任务队列
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true  //  因为 promsie 是放入微任务队列的
} 

// 不支持的 promise 的话，就用 MutationObserver, 它也是放入微任务队列的

else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} 

// 还不支持的话， 就用 setImmediate, 它是放入宏任务队列的

else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} 

// 都不支持的话，就用 setTimeout 兜底了，它是放入宏任务队列的

else {
  // Fallback to setTimeout.
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

// 导出我们的 nextTick 方法
// 接受两个参数，回调函数和上下文对象
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // pedding 来判断是否已经向任务队列中添加了一个任务
  if (!pending) {
    pending = true
    timerFunc()  // timerFunc 就是我们之前不断适配最终得到的延迟执行回调的函数
  }
  // 如果没有传递回调函数，默认返回一个 promise (如果支持 promise 的话)
  // 也就是说你可以这样调用 
  // this.$nextTick().then(() => { console.log('dom updated') })
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```     

最后再来总结一下，    

nextTicck 会把接受的回调放到 callback 队列中。     

如果还没有向任务队列中添加任务，就将 pedding 设为 true， 并将 callback 的任务推放入任务队列，清空 callback    

这个算一轮的事件循环，也就是说，在 pedding = true 时(即任务队列中还有推进的任务时)，新传入的回调，要等待下一轮事件循环了。    

就说这么多吧。    

主要学习了 vue 的异步渲染过程， 以及如何用 nectTick 解决异步渲染中要操作 dom 的问题