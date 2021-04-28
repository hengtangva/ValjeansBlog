var numDecodings = function(s) {
    // 最优解，可以考虑动态规划
    let arr = Array.from(s),
        len = arr.length,
        dp = new Array(len+1);
    arr = arr.map(item => item*1);
    
    dp[0] = 1;
    for(let i = 0; i < len; i++) {
        // 初始化
        if(i == 0) {
            // 只有 0的串也咩有解码方法
            if(arr[i] == 0) {
                dp[i+1] = 0
            } else {
                dp[i+1] = 1;
            }
        }
        else if(arr[i] == 0) {
            if(arr[i-1] > 2 || arr[i-1] == 0) {
                return 0
            }
            dp[i+1] = dp[i-1]
        }
        else if(arr[i-1]>2 || arr[i-1]>=2 && arr[i]>6 || arr[i-1] == 0) {
            dp[i+1] = dp[i];
        }
        
        else {
            dp[i+1] = dp[i] + dp[i-1];
        }
    }
    console.log(dp)
    return dp[len]
};

console.log(numDecodings("230"));