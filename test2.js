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
        let numarr = arr.map(item => item*1);
        // console.log(numarr);
        while(numarr.length > 0) {
            let res = [];
            let head = numarr.shift()
            res.push(head);
            for(let i = 0; i < numarr.length; i++) {
                if(numarr[i] < res[res.length-1]) {
                    res.push(numarr[i]);
                    /// console.log(numarr,'before')
                    numarr.splice(i,1);
                    i--;
                    // console.log(numarr,'after')
                }
            }
            console.log(...res);
        }
    }
})
// 99 67 5 0 43 56 33 5 7 2 1 8
// let arr = [1,2,3];
// arr.splice(1,1);
// console.log(arr);
// for(let i = 0; i < arr.length; i++) {
//     arr.splice(i,1);
//     console.log(arr);
// }
