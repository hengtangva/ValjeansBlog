# position 属性小结

## 常见的属性值


### static

- 默认属性，元素处于文档流，设置为 static 的元素，它始终会处于页面流给予的位置        

- static 元素会忽略任何 top, bottom, left, right 和 z-index 声明。          

### relative

- 位置被设置为 relative 的元素，可将其移至相对于其原来位置的地方，       

- 如果设置了 relative 值，那么，它偏移的 top，right，bottom，left 的值都以它原来的位置为基准偏移；       

- 并且它不会影响其他元素的布局，你移动的话，之前的位置会空出来；     

- 此时如果不加 z-index 属性的话，它会默认覆盖占同样位置的其他元素，也就是说，在重叠元素的上面

- 设置后，它创建了一个 stacking context (层叠上下文)，可以通过 z-index 来决定和其他元素层叠的关系。      



### Absolute

- 位置设置为 absolute 的元素，可定位于相对于包含它的元素的指定坐标。  

- 如果它的父容器设置了 position 属性，并且 position 的属性值为 absolute 或者 relative，那么就会依据父容器进行偏移。      

- 如果其父容器(包括父容器的父容器，往上层查找) 没有设置 position 属性，那么偏移是以 body 为依据。    

- 设置 absolute 的元素脱离了文档流，也就是说，设置该值后，之前元素的位置就不存在了。可能会导致其他元素移动来补全空出位置         

- 同样，设置 z-index 后，它也会创建一个 stacking context，可以用 z-inedx 去设置如何覆盖。        

- 最后要提的一点是，absolute 的 margin。它的 margin 是相对于处于标准流的元素进行定位的。但是 left，top 这些属性如果大于的话，会对 margin 进行覆盖。且其 margin 与其他 margin 不折叠。       


### fixed
 
- 位置被设置为 fixed 的元素，定位于相对于浏览器窗口的指定坐标。    

- 不论窗口滚动与否，元素都会留在那个位置。   

- 设置 fixed 属性的元素同样也脱离了文档流。       

- 同样，也可以用 z-index 去创建 stacking context 去设置覆盖的层级关系      

### sticky

- 粘性定位，该定位基于最近的滚动祖先。      

- 也就是时候，你可以在一个滚动组件中加一个始终相对滚动窗口定位的 fixed

- 如果它的父滚动组件就 是body 的话，就像 fixed 一样       

- 同样，也可以用 z-index 去创建 stacking context 去设置覆盖的层级关系      

- 注意: Internet Explorer, Edge 15 及更早 IE 版本不支持 sticky 定位。 Safari 需要使用 -webkit- prefix 。

## 关于 子绝父相

之前，看视频，总是听到一句，子绝父相，即子元素绝对定位的话，父元素就要相对定位    
之前没有深究其中的原理，今天深入了解一下，为什么有 子绝父相    

1. 当子元素绝对定位时，即 position: absolute 时，它是相对于谁定位时不清楚的，
- 如果它的父元素(或者父元素的父元素)设置了 position 属性，且为 relative 或者 absolute(当然我们很少用absolute，因为不想父元素脱离文档流)，那么，子元素就会相对最近它的设置 position 的元素进行定位
- 如果没有，那么它就会相对 body 属性进行定位。   

这也是为什么，我们的子元素为绝对定位时，父元素要采用相对定位了。