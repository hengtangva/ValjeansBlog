let obj = {
    arr : [1,2,3,4],
    name: 'valjean'
}

let proxy = new Proxy(obj, {
    set(target, key, prop, rev) {
        console.log('被改变了',target, key, prop, rev);
        return Reflect.set(...arguments);
    },
    get(target, key, prop, rev) {
        console.log('被访问了',target, key, prop, rev);
        return Reflect.get(...arguments);
    }
})

proxy.age=18;
proxy.name = 'coder';
proxy.arr[1] = 9;