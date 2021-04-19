var canCompleteCircuit = function(gas, cost) {
    let len = gas.length;
    for(let i = 0; i < len; i++) {
        let hasgas = gas[i],
            j = i,
            step = 0;
            console.log('从' , i , ' 出发');
            while(step < len && hasgas >= cost[j]) {
                hasgas = hasgas - cost[j]; // 消费汽油去下一站
                j = (j+1)%len;
                hasgas = hasgas + gas[j]; // 在下一站拿到的汽油
                step++; 
                console.log(' 第'  , step, ' 步 ', 'gas: ',hasgas,' needtocost: ', cost[j])
            }
            if(step === len) {
                return i;
            }
    }
    return -1;
};
canCompleteCircuit([4,5,2,6,5,3],
                   [3,2,7,3,2,9])