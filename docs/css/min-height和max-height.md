# min-height 和 max-height 和 height 的优先级

## 前言

之前碰到笔试题，height， min-height， max-height 同时出现了，做题的时候以为会报错。       

因为 min-height > max-height        

后来自己试验了一下，发现并不会报错，它们是有优先级关系的。         

## 高度最终取决于谁 

1. height > max-height > min-height : 此时高度是 max-height       

2. height > min-height > max-height : 此时高度是 min-height

总之，就是，min-height 和 max-height 谁大，谁就对限制 height 起主导作用。     