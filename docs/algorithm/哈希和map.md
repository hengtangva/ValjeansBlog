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
    // 返回墙的高度减去缝隙，即使穿过墙的数量
    return wall.length - max;
};

```     

- 总结       

这题还是喜欢错了去看用例，然后用用例去解决边界问题，就是很不好。以后做 acm 模式就很难受。        

以后尽量一遍过，最差也得在 vscode 上用自己想的测试用例。       


