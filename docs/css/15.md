# a 标签的伪类

## 前言

有些时候，我们想基于文档结构以外的的情形来为页面添加样式，比如基于超链接或者表单元素的状态，        

这时候，就可以用伪类选择符，伪类选择符的语法是以一个冒号开头，用于选择元素的特定状态或者关系。      

这里以 a 标签为例子。      

## a 标签的伪类

a 标签的伪类有 4 个，分别是        

```html
<style>
    a:link {
        color: red
    } 
    a:visited {
        color: blue
    }
    a:hover {
        color: yellow
    }
    a:active {
        color: purple
    }
</style>
<body>
    <a href='www.baidu.com'>百度一下</a>
    <a href=''>百度一下</a>
</body>
```     
1. link : 当 a 标签有 href 属性时，且 href 值为 不空，正常连接，# 号时， 显示 link 样式

2. visited： 当 a 标签有 href 属性，且 href 值 为上述三种时，显示 visited 样式，因为这三种肯定被人访问过，可以联想名字(visited)        

---

当 没有 href 属性时， 上述两样式都不显示       

3. hover： 当鼠标放到 a 标签上面时， 触发 hover 样式       

4. active：当 a 标签被点击时，触发 active 样式 (注意是点击鼠标的那个时候)       

## a 伪类的顺序

a 标签伪类的书写顺序很重要，因为可能会造成覆盖。      

具体顺序是 link -> visited -> hover -> active       

