class myPromise {
    status = 'pending';
    data = '';
    onResolveCallback = [];
    onRejectCallback = [];
    constructor(executor) {
        const resolve = val => {
            if(this.status === 'pending') {
                this.status = 'resolved';
                this.data = val;
                this.onResolveCallback.forEach(func => {
                    func(val);
                })
            }        
        }
        const reject = reason => {
            if(this.status === 'pending') {
                this.status = 'rejected';
                this.data = reason;
                this.onRejectCallback.forEach(func => {
                    func(reason);
                })
            }
        }
        try {
            executor(resolve, reject);
        } catch(e) {
            reject(e);
        }
    }

    then(onResolve, onReject) {

        onResolve = typeof onResolve === 'function' ? onResolve : val => val;
        onReject = typeof onReject === 'function' ? onReject : e => e;

        let self = this;

        if(this.status === 'pending') {
            console.log('存储回调')
            return new myPromise((resolve, reject) => {
                this.onResolveCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const thenReturn = onResolve(self.data);
                            console.log('123')
                            resolvePromise(thenReturn, this, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0)
                })
    
                this.onRejectCallback.push(() => {
                    setTimeout(() => {
                        try {
                            const thenReturn = onReject(self.data);
                            resolvePromise(thenReturn, this, resolve, reject);
                        } catch(e) {
                            reject(e);
                        }
                    }, 0)
                })
            })
            
        } else if(this.status === 'resolved') {
            return new myPromise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const thenReturn = onResolve(self.data);
                        resolvePromise(thenReturn, this, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                })
            })
            
        } else {
            return new myPromise((resolve, reject) =>{
                setTimeout(() => {
                    try {
                        const thenReturn = onReject(self.data);
                        resolvePromise(thenReturn, this, resolve, reject);
                    } catch(e) {
                        reject(e);
                    }
                }, 0)
            })
            
        }
    }
    resolvePromise(thenReturn, promiseReturn, resolve, reject) {
        console.log('resolve, then')
        if(thenReturn === promiseReturn) {
            new Error('circle use');
        }
        if(thenReturn instanceof myPromise) {
            thenReturn.then(resolve, reject);
        } else {
            console.log('resolve, then')
            resolve(thenReturn);
        }
    }
}

new myPromise((resolve, reject) => {
    console.log('初始化 promise')
    setTimeout(() => {
        console.log('第一次异步拿到值')
        resolve(123)
    }, 1000)
}).then((val) => {
    console.log('first val', val)
    return val + 100;
}).then((val) => {
    console.log('second val', val)
})

console.log('main');