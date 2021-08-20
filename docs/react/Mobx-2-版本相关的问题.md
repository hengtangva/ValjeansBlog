# Mobx-2-版本相关的问题

## 配置环境遇到的问题

- mobx 从 6 开始就不支持装饰器语法了。自己还傻乎乎卡好久。        

- 因此要想使用 mobx 的装饰器语法需要将版本降到 6 以下， npm install mobx@4.15.5 --save (读书项目的版本)            

- 同样的  mobx-react 的版本也要降下来。 npm install mobx-react@6.3.0                

---        

然而再这之后，还是报错了        

- Attempted import error: 'makeObservable' is not exported from 'mobx'          

google 之后才知道 mobx-react-lite 的版本也要降下来，要降到 2，         

- npm uninstall mobx-react-lite, 接着 npm install mobx-react-lite@2.2.0 --save            

然后就能使用装饰器语法了。           


## mobx-react-lite 

借此机会，就顺便了解一下，mobx-react-lite            

:::tip
mobx-react-lite是mobx-react的轻量化版本，在mobx-react@6版本中已经包含了mobx-react-lite，但是如果只在函数式组件中使用，推荐使用轻量化的mobx-react-lite
:::