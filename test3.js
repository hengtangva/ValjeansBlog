
// let readline = require('readline');
// let r1 = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// })
// let inputs = [];
// let n;
// r1.on('line', (line) => {
//     inputs.push(line);
//     n = inputs[0].split('')[0]*1;   
//     // console.log(n, typeof n)
//     if(inputs.length == n+1) {
//         for(let m = 0; m < n; m++) {
//             // console.log(inputs[m+1].split(' ')[0]);
//             let num = inputs[m+1].split(' ')[0]*1;
//             let k = inputs[m+1].split(' ')[1]*1;
//             // console.log(num, k)
//             solute(num, k);
//         }
//     }
// })
function solute(n, k) {
    if(n<10 || k < 1) {
        console.log(n);
        return;
    }
    let str = n+'';
    let arr = Array.from(str);
    let len = arr.length;
    if(k >= (len*len-len)/2) {
        arr.sort();
        console.log(arr.join('')*1);
        return;
    }
    console.log(arr);
    for(let i = 0; i < k; i++) {
        let j = 0;
        while(j < arr.length - 1) {
            if(arr[j] > arr[j+1]) {
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                console.log(arr);
                break;
            }
            j++;
        }
    }
    console.log(arr.join('')*1);
}
solute(4321,5)

// 3
// 2113 1
// 2113 2
// 3214 3