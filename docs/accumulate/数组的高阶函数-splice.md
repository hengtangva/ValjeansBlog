# 数组高阶函数-splice

处理数组是常碰到的情况，其实数组中定义了好多特别强大的函数，学习使用这些函数可以让处理数组变得轻松很多。     

## splice

array.splice(start, deleteCount, item1, item2，...)      

第一个参数是开始删除元素的位置，注意的是，包含那个位置的元素      

第二个参数是要删除元素的个数。（可选）      

后面的一系列参数，是删除操作完成后，加入删除地方的元素。       

来看例子解释吧。      

```js
let arr = [1,2,3,4];
arr.splice(1,2); // 从第一个位置开始，删除两个元素
console.log(arr);  // [ 1, 4 ]
```      

我们注意到，index = 1 是 元素 2 的位置(从 0 开始)，我们从它开始删除，删除两个元素，即 arr[1] = 2, arr[2] = 3      

最后，arr 就变成了 arr = [1, 4]       

当然我们也可以把 count 设为 0 ， 这样就变成了纯加入插入元素。     

```js
let arr = [1,2,5,6];
arr.splice(2, 0, 3, 4);
console.log(arr);  //  [ 1, 2, 3, 4, 5, 6 ]
```      

如果 第二个参数 count 不指定的话，就删除后面所有的元素      

```js
let arr = [1,2,3,4];
arr.splice(1);
console.log(arr);  // [ 1 ]
```       
### 剑指offer 2
来看剑指offer的第二题：     

请实现一个函数，将一个字符串中的每个空格替换成 “%20”。例如，当字符串为 We Are Happy. 则经过替换之后的字符串为 We%20Are%20Happy。    

示例1     
输入: "We Are Happy"     
返回值: "We%20Are%20Happy"     

**思路**      
真没啥思路，就是，转为数组，碰到空格就变成 %20       

这里我们用 splice 就很方便      

代码如下：    

```js
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param s string字符串 
 * @return string字符串
 */
function replaceSpace( s ) {
    // write code here
    let arr = Array.from(s);
    for(let i = 0; i < arr.length; i++) {
        if(arr[i]== ' ') {
            arr.splice(i,1,'%',20);
            i = i + 1;
        }
    }
        return arr.join('');
}
module.exports = {
    replaceSpace : replaceSpace
};
```