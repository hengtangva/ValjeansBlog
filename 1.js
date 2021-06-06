function* bar() {
    const result = yield new Promise((resolve, reject) => {
        // 模拟网络请求
        setTimeout(() => {
            resolve('hello generater')
        },1000)
    })
    console.log(result)
}

const it = bar();
it.next().value.then((res) => {
    it.next(res);
})