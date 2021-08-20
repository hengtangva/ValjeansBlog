# Promise 进阶

## 前言

js 的异步编程经过了四个阶段，分别是          

1. callback 阶段         

2. promise 阶段        

3. generate 阶段        

4. async/await 阶段             

- callback 存在回调地狱问题和控制权问题，所以出现了 promise 这个解决方案          

- promise 并非是一个新事物，而是一个按照规范实现的类。           

- 这个规范有很多，比如 Promise/A, Promise/B, Promise/D, 以及 Promise/A 的升级版本 Promise/A+           

- 最终 es6 是采用了 Promise/A+ 规范， 后来出现的 Generate 函数和 Async 函数也是以 Promise 为基础进一步封装的。         

## Promise 简介

Promise/A+ 规范主要分为术语，要求，注意事项三个部分，        

其官网链接 -> [Promise/A+规范](https://promisesaplus.com/)         

比较好的一个翻译 -> [Promise/A+翻译](http://malcolmyu.github.io/malnote/2015/06/12/Promises-A-Plus/)       

这里简要做一些介绍。         

### 术语 (Terminology)

- Promise：一个拥有 then 方法的函数或者对象，其行为符合本规范。       

- thenable: 一个定义了 then 方法的对象或者函数         

- value： 指任何 javascript 的合法值 (包括 undefined，thenable 和 promise)         

- exception: 是使用 throw 语句抛出的一个值         

- reason: 表示一个 promise 拒绝的原因        

### 要求 (Requirements)  

1. 一个 promise 必须处于这三个状态的一种：pending, fulfilled, rejected        

    - 等待态 (pending): 处于 pending 的 promise 需可以迁移至执行态或者拒绝态        

    - 执行态 (fulfilled/resolved(es6的实现)): 必须拥有一个不可变的终值，不能迁移其他任何状态。        

    - 拒绝态 (rejected): 必须拥有一个不可变的拒因，不能迁移到其他任何状态          

2. then 方法，用于处理 resolved 或者 rejected 状态下的值。       

    - then 方法接收两个参数， onResolved, onRejected。这两个变量类型是函数，如果不是函数会将被忽略，且两个参数都是可选的。          

    - then 方法必须返回一个 promise2，从而保证 then 方法可以在同一个 promise 上多次调用 (es6 实现该规范时，需返回一个新的 promise)         
    
    - onResolved/onRejected，有返回值时，把返回值定义为 x， 并执行 [resolve](promise2, x)           

    - onResolved/onRejected 运行出错，则把 promise2 设置为 rejected 状态            

    - onResolve/onRejected 不是函数，则需要把 promise1 的状态传递下去            

3. 不同的 promise 实现可以交互        

    - 

## 代码实现 promise      

根据 requirements 第一条，我们可以大致实现如下：      


```js
class Promise {
    states = 'pending';
    data = '';
    // 接受一个函数做为参数
    constructor(executor) {

        // 这个函数可以接受两个函数作为参数
        function resolve(value) {
            this.status = 'resolved';
            this.data = value;
        }
        function reject(reason) {
            this.state = 'rejected';
            this.data = reason;
        }
        // 然后执行该函数
        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
}
```     

---      

ok， 我们再来实现 requirements 的第二条，then 方法         

```js
class Promise {
    // ... 省略第一步的代码
    // then 方法提供：当状态为 resolved 时，回调 onResolved， 状态为 onRejected 时，回调 onRejected
    // 所以这里先接受这两个回调。
    then(onResolved, onRejected) {
        // 先判断参数是否是函数，不是就使用默认参数，让值传递下去
        onResolved = typeof onResolved === 'function' ? onResolved : e => e;
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e };

        let promise2;

        promise2 = new Promise((resolve, reject) =>{
            if(this.state === 'resolved') {
                try {

                    // 如果 onResolved/onReject 有返回值，就把返回值定义为 x
                    const x = onResolved(this.data)；

                    // 执行 [resolve](promise2, x)
                    resolvePromise(promise2, x, resolve, reject);

                } catch(e) [
                    reject(e);
                ]
            }
            if(this.state === 'rejected') {
                try {
                    const x = onRejected(this.data);
                    resolvePromise(promise2, x, resolve, reject);
                } catch(e) {
                    reject(e);
                }
            }
        })

        // then 方法最后返回一个 promise
        // es6 是要求返回一个新的  promise2
        return promise2
    }
}
```        

---       

上面的实现存在着一些问题。          

1. resolvePromise 没有定义           

2. then 方法执行的时候，promise 仍可能处于 padding 状态          

3. onResolved/onRejected 这两个函数需要异步调用        

---       

下面来完善第二步的代码。        

```js
class myPromise {
    status = 'padding';
    data = '';
    // 保存 resolve，和 reject 后， then 方法里面的回调
    onResolveCallback = [];
    onRejectCallback = [];
    
    constructor(executor) {
        function resolve(vale) {
            this.status = 'resolved';
            this.data = value;
            for(const func of this.onResolveCallback) {
                func(this.data);
            }
        }
        function reject(reason) {
            this.status = 'rejected';
            this.data = reason;
            for(const func of this.onRejectCallback) {
                func(this.data);
            }
        }
        // 注意的是，之前我们其实是没有调用 resolve 的
        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }
    then(onResolve, onReject) {
        let promise2;
        promise2 = new MyPromise((onResolve, onReject) => {
            // 在 then 方法中，如果是 resolved 状态，我们才会调用 resolve
            if(this.status == 'resolved') {
                try {
                    // 异步调用，这里用 setTimeout 模拟
                    setTimeout(() => {
                        const x = onResolve(this.data)
                        this.resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                } catch(e) {
                    reject(e);
                }
            }

            if(this.status == 'rejected') {
                try {
                    setTimeout(() => {
                        const x = onReject(this.data);
                        this.resolvePromise(promise2, x, resolve, reject)
                    }, 0)
                } catch(e) {
                    reject(e);
                }
            }

            // 如果还是 padding 状态，则把处理函数储存
            if(this.status == 'padding') {
                this.onResolveCallback.push(() => {
                    try {
                        setTimeout(() => {
                            const x = onResolve(this.data)
                            this.resolvePromise(promise2, x, resolve, reject)
                        }, 0)
                    } catch(e) {
                        reject(e);
                    }
                })
                this.onRejectCallback.push(() => {
                     try {
                        setTimeout(() => {
                            const x = onReject(this.data)
                            this.resolvePromise(promise2, x, resolve, reject)
                        }, 0)
                    } catch(e) {
                        reject(e);
                    }
                })
            }
        })
    }

    resolvePromise(promise2, x, resolve, reject) {
        let called = false;

        if(promise2 === x) {
            return reject(new TypeError('changing circle detected for promise'));
        }

        // 如果返回的仍然是 promise，
        if(x instanceof myPromise) {
            // 如果 返回的 promise 仍然是 padding 状态
            if(x.status === 'padding') {
                x.then((val) => {
                    resolvePromise(promise2, val, resolve, reject);
                }, reject)
            }
            // 状态已经确定的话，就直接执行返回 promise 的 then 方法即可
            else {
                x.then(resolve, reject);
            }
            return;
        }
        resolve(x);
    }
}
```


