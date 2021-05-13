let arr = [1,2,3,4];

for(let i = 0; i < arr.lenth ; i++) {
    Object.definePropertie(arr, i, {
        set() {
            console.log('set')
        },
        get() {
            console.log('get')
        }
    })
}
let proxy = new Proxy(arr, {
    get() {
        console.log('proxy, get')
    },
    set() {
        console.log('proxy set')
    }
});
arr[1] = 2;
proxy[1] = 1;
// proxy.pop();
console.log(proxy.__proto__, arr.__proto__)