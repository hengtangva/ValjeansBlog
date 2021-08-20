# 哈希表和 map

map 是 js 的哈希表         

用 map 的主要作用有两个         

1. 用空间换时间，map 的查找时间复杂度是 O(1)        

2. 用来存储一些数组不易存储的数据结构        


## leetcode.1-两数之和

这就是典型的用 map 来空间换时间的例子。     

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。          

你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。          
 
你可以按任意顺序返回答案。       

---        

- 思路        

实际上，由于每个元素和 target 的差是一定的，因此，我们可以把差当做 键，序列号当做值。       

在一次遍历过程中，后面的元素如果所要的元素，map 里面有，就可以把它们双双返回，作为结果。       

```js
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length; i++) {
        if(map.has(nums[i])) {
            return [map.get(nums[i]), i]
        }
        map.set(target-nums[i],i);
    }
};
```
---       

下面这题类似两数之和的进阶。        

---     


## leetcode.1711-大餐计数

大餐 是指 恰好包含两道不同餐品 的一餐，其美味程度之和等于 2 的幂。       

你可以搭配 任意 两道餐品做一顿大餐。        

给你一个整数数组 deliciousness ，其中 deliciousness[i] 是第 i​​​​​​​​​​​​​​ 道餐品的美味程度，返回你可以用数 组中的餐品做出的不同 大餐 的数量。结果需要对 109 + 7 取余。          

注意，只要餐品下标不同，就可以认为是不同的餐品，即便它们的美味程度相同。          

示例 1：         

输入：deliciousness = [1,3,5,7,9]          
输出：4         
解释：大餐的美味程度组合为 (1,3) 、(1,7) 、(3,5) 和 (7,9) 。        
它们各自的美味程度之和分别为 4 、8 、8 和 16 ，都是 2 的幂         

---         

- 思路         

一开始是是想着 双层循环，对于判断和是否是 2 的幂，可以 n & (n-1) 来判断          

这样 O(n^2) 的时间可以解决问题          

可惜的是超时了。         

我们想的是判断和是不是 2 的幂，这样我们需要在 O(n) 的时间。         

不如换个想法，我们判断一个 2 的幂的数是否在 数组中呢？           

我们只需拿到数组中最大的数，将其乘 2 就是边界了。        

这样，我么只需要 O(logC) 的时间就能完成判断，加上之前遍历的 O(N), 总时间为 O(NlogC)          

最后注意的一点是，这样可能会出现重复的元素，因此需考虑一下，做 一个判断。               

```js
var countPairs = function(deliciousness) {
    let len = deliciousness.length;
    let count = 0;
    let maxVal = 0;
    for(let val of deliciousness) {
        maxVal = Math.max(val, maxVal);
    }
    let map = new Map();
    for(let i = 0; i < len; i++) {
        if(!map.has(deliciousness[i])) {
            map.set(deliciousness[i], 1);
        } else {
            map.set(deliciousness[i], map.get(deliciousness[i]) + 1);
        }
    }
    for(let i = 0; i < len; i++) {
        let val = deliciousness[i];
        for(let sum = 1; sum <= maxVal*2; sum = sum*2) {
            if(map.has(sum-val)) {
                if(val == sum - val) {
                    count--;
                }
                count = (count + map.get(sum-val))%(1e9 + 7);
            }
        }
        map.set(val, map.get(val) - 1);
    }
    return count;
};

```

## leetcode.554-砖墙

你的面前有一堵矩形的、由 n 行砖块组成的砖墙。这些砖块高度相同（也就是一个单位高）但是宽度不同。每一行砖块的宽度之和应该相等。        

你现在要画一条 自顶向下 的、穿过 最少 砖块的垂线。如果你画的线只是从砖块的边缘经过，就不算穿过这块砖。你不能沿着墙的两个垂直边缘之一画线，这样显然是没有穿过一块砖的。       

给你一个二维数组 wall ，该数组包含这堵墙的相关信息。其中，wall[i] 是一个代表从左至右每块砖的宽度的数组。你需要找出怎样画才能使这条线 穿过的砖块数量最少 ，并且返回 穿过的砖块数量 。        
  
示例 1：         

输入：wall = [[1,2,2,1],[3,1,2],[1,3,2],[2,4],[3,1,2],[1,3,1,1]]         
输出：2          

---      

- 思路        

自己思路和官方一样，就是确定各个缝隙的位置，找到缝隙最多的位置，从此穿墙，经过的砖块肯定是最少的。         

然后就是得记录各个深度的数量，这明显就得用 hash 表了         

具有细节就不谈，代码里给一些简单的注释          

```js
var leastBricks = function(wall) {
    let map = new Map();
    for(let i = 0; i < wall.length; i++) {
        // 一行只有一块砖的，肯定得穿过，不考虑
        if(wall[i].length !== 1 ) {
            // 第一次碰到，就设置键值对
            if(!map.has(wall[i][0])) {
                map.set(wall[i][0], 1)
            }
            // 之后碰到相应的值就  + 1
             else {
                let count = map.get(wall[i][0]);
                count++;
                map.set(wall[i][0], count)
            }
        }
        // 遍历，找缝隙的位置
        for(let j = 1; j < wall[i].length-1; j++) {
             wall[i][j] = wall[i][j]+wall[i][j-1]
             if(!map.has(wall[i][j])) {
                 map.set(wall[i][j], 1)
             } else {
                 let count = map.get(wall[i][j]);
                 count++;
                 map.set(wall[i][j], count)
             }
        }
    }
    // 最后找出缝隙最多的地方
    let max = 0;
    map.forEach((value, key) => {
        if(value>=max) {
            max = value;
        }
    })
    // 返回墙的高度减去缝隙，即是穿过墙的数量
    return wall.length - max;
};

```     

- 总结       

这题还是喜欢错了去看用例，然后用用例去解决边界问题，就是很不好。以后做 acm 模式就很难受。        

以后尽量一遍过，最差也得在 vscode 上用自己想的测试用例。       


