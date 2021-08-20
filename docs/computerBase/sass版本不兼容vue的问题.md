# sass版本不兼容vue的问题

## 安装
最近开始学着使用 sass 来写样式了。       

于是安装 sass 的 loader      

```shell
npm install sass-loader --save-dev
npm install node-sass --save-dev
```   

--- 
## 问题 & 解决办法

自己在写 sass 的时候，就直接报错了     

去 stack-overflow 查了一下，发现原来默认安装的是版本 sass 11       

但是，该版本是不支持  vue 2.6 以及一下 的，于是卸掉之前的 sass-loader，安装低一级的版本      

```shell
npm uninstall sass-loader
npm install sass-loader@10.1.1 --save-dev
```   

就可以正常编译 sass 文件了