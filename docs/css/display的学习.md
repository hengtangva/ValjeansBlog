# 探究 display 属性    

## block 元素

block 元素有以下特性：    

1. 独占一行，在补设置自己的宽度情况下，会默认填满父级元素的宽度。    

2. width ，height 修改值均有效。     

3. margin，padding 四个方向值均有效。     

常见的块级元素有，    

p, div, ul, form, h。    

可以发现都是很大概念的元素。    

## inline 元素

inline 元素有以下特性：    

1. 与其他行内元素共享一行。直到该行满了才换行。        

2. width ，height 的设置均无效，值为本身元素内容撑开。    

3. margin ，只有左右方向有效。padding 四个方向都有效，因为 padding 是自己内部的值      

常见的行内元素有：     

 a, span, br, label, q, em, i, strong    

 可以发现都是一些概念很小的元素。    

## inline-block

行内块级元素，结合了上述两种元素的特点，有：    

1. 与其他行内元素共享一行。    

2. 可以修改 width，height。     

3. margin，padding，四个方向都有效。    

可见，见主要是解决，行内元素无法设置宽度和高度的问题    

或者块级元素总是换行的问题。    

常见的行内块级元素有：    

img , input    

## css 更改元素的类型

由于一个元素天生就带有一个类型的，一定是上述三者之一。     

当然我们也是可以通过 css 来修改它的类型。    

css 的 diplay 属性有三个值，     

1. block    

2. inline    

3. inline-block    

刚好就可以将其改为自己想要的类型。    

