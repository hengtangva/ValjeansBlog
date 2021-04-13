let readline = require('readline');
let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let inputs = [];
let n;
r1.on('line', (line) => {
    inputs.push(line);
    n = inputs[0].split('')[0]*1;   
    if(inputs.length == 2) {
        let arr = inputs[1].split(' ')
        // console.log(arr)
        let numarr = arr.map(item => item*1);
        let count = 1;
        numarr.sort((a,b) => a-b);
        // console.log(numarr);
        let len = numarr.length;
        for(let i = 0; i < len-1; i++) {
            let max = numarr.pop();
            let sum = numarr.reduce((pre,cur) => pre + cur);
            if(max <= sum) {
                count++;
            } else {
                break;
            }
        }
        console.log(count);
    }
})