# map 的使用

虽然 object 也可以实现键值对，但 object 毕竟出现的作用不是仅存键值对的。    

所以，碰到仅需操作键值对的时候，无疑优先选择 map    

想比于 object ，map 有以下优势。    

1. 能存储更多的键值对    

2. 插入，查找，删除速度快。      

要创建一个 map 可以如下操作    

**const map = new Map()**     

里面的参数可以传递一个可迭代对象。用来对其初始化

## map 的操作 api

1. set： 用于添加键值对。     

2. has： 用于查询键是否存在(返回 true or false)    

3. get： 用于取得键对应的值(不存在该键的话，返回 undefined)     

4. delete： 删除指定键值对     

5. clear： 删除所有键值对    

来看一下具体用的例子：    

```js
let map = new Map([["name",'sofia'],['age', 19]]);
console.log(map);  // Map { 'name' => 'sofia', 'age' => 19 }

map.set('hobby','cs');
console.log(map);  //  Map { 'name' => 'sofia', 'age' => 19, 'hobby' => 'cs' }

console.log(map.has('name'));  // true
console.log(map.has('school'));  // false

console.log(map.get('name'));  // sofia
console.log(map.get('school'));  // undefined

map.delete('hobby');
console.log(map);  //  Map { 'name' => 'sofia', 'age' => 19 }

map.clear();
console.log(map);  // Map {}
```    

---

## map 其他注意点

1. 与 Object 的键只能是 字符串，数字(会强制转换为字符串)，symbol 不同，     

map 的键可以是 js 的任何数据类型，这里的键去重，采取的是全等判断，注意 NaN 只会出现一次。     

2. 由于实现了 \[symbol.interator\] 所以，map 也是可以迭代的。     

## map 的使用

我们一般用 map 来实现 hash 表。     

来看一个使用的例子。   

### LeetCode1.两数之和 

给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。     
 
你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。    

你可以按任意顺序返回答案。    

示例 1：    

输入：nums = [2,7,11,15], target = 9     
输出：[0,1]      
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1]     

**思路**    

如果暴力解的话，我们要用 O(n2) 的时间复杂度。    

但是创建一个 hash 表的话，我们对于查找就是 O(1) 的时间复杂度，只需 O(n) 用来遍历。     

```js
var twoSum = function(nums, target) {
    let map = new Map();
    for(let i = 0; i < nums.length; i++) {
        sub = target - nums[i]
        if(map.has(sub)) {
            return [i, map.get(sub)]
        } else {
            map.set(nums[i], i)
        }
    }
    return false;
};
```

