# 手写 Promise

## 手写 Promise.all

先上代码再解释    

```js
Promise.myall = function() {
    if(!arguments[0]) {
        console.log('无效参数，请输入一个可迭代对象');
        return;
    }
    let result = []; // 用于存结果的数组
    let pArray = Array.from(arguments[0]); // 将参数对象变成数组，方便操作
    return new Promise((resolve, reject) => {
        pArray.forEach(e => {
            let p = Promise.resolve(e);
            p.then((res) => {
                result.push(res);
            })
            .catch((err) => {
                reject(err);
            }
            )
        })
        // 只有所有都 resolve 了，才 resolve
        if(result.length === arguments.length) {
            resolve(result);
        }
    })
}
```

回看 Promise.all 功能，我们来一一实现    

1. 返回的是一个 Promise，因此函数返回的是一个 promise    

2. 接受的是一个可迭代对象，里面存的是 promise 实例, 不接受空对象     

3. 只有所有 promise 都变成 resolved 才变成 resolved 状态，且返回的是各个promise的 resolve 结果数组    

4. 只要有一个 promise 拒绝，就 rejected， 且 reject 该 promise 抛出的拒绝理由


## 手写 promise.race

```js
Promise.myrace = function() {
    if(!arguments[0]) {
        console.log('无效参数，请输入一个可迭代对象');
        return;
    }
    let pArray = Array.from(arguments[0]); // 将参数对象变成数组，方便操作
    return new Promise((resolve, reject) => {
        pArray.forEach(e => {
            let p = Promise.resolve(e);
            p.then((res) => {
               resolve(res);
            })
            .catch((err) => {
                reject(err);
            }
            )
        })
    })
}
let p1 = new Promise((resolve, reject) => {
    setTimeout(resolve, 3000, 3000);
})

let p2 = new Promise((resolve, reject) => {
    setTimeout(resolve, 2000, 2000);
})
let p3 = new Promise((resolve, reject) => {
    setTimeout(resolve, 1000, 1000);
})

let p4 = new Promise((resolve, reject) => {
    setTimeout(reject, 500, 500);
})
let promises = [p1,p2,p3,p4];    
console.log(promises);

Promise.myrace(promises)
.then((res) => { console.log(res)} )
.catch((err) => { console.log('err: ',err) })

Promise.myrace([1,2,3,4])
.then((res) => {
    console.log(res);
});

// 1
// err: 500
```

来回顾一下，promise.race 作用    

1. 也是接收一个可迭代对象, 不接受空参数    

2. 返回一个 Promise。    

3. 哪个 promise 的状态最先变化，就变为最先变化的 promise 的状态，    

## 手写 Promise 对象

## 用 es5 写 Promise.all