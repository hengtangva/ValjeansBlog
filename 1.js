let readline = require('readline');
let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let inputs = [];
r1.on('line', (line) => {
    inputs.push(line); // 我么把没行的输入，都存起来。    
    // 接收两行就可以处理了
    if(inputs.length == 2) {
        let arr2 = inputs[1].split(' ');
        let arr = arr2.map((item) => item*1)
        // console.log(arr);
        let res = soulution(arr);
         console.log(res);
        // 两个数组存的就是输入的两行了
    }
})


function soulution(arr) {
    let n = arr.length;
    if(n == 1) {
        return (arr[0]>0) ? arr[0] : 0;
    }
    let dp = new Array(arr.length+1);
    dp[1] = (arr[0]>0) ? arr[0] : 0;
    for(let i = 1; i < arr.length; i++) {
        sp[i+1] = Math.max(0, Math.max(arr))
    }
    return dp[n];
}