# vue 的生命周期

## 官方图例
![vue 生命周期图例](https://cn.vuejs.org/images/lifecycle.png)       

## 解释

### beforeCreate - created

这个阶段是初始化阶段       

主要是在 vue 的实例上初始化一些属性，事件以及响应式数据。      

比如： props， methods， computed， peovide， data， inject 等        

也就是说，等到 created 时，vue 的实例的属性以及初始化好了，data 已近可以拿到。      

如果是服务端渲染的话，这时候就可以发送网络请求去拿到数据了。      

所以，我们的 created 钩子函数是可以发送请求的。        

### created - beforeMount

这个阶段是模板编译阶段。       

主要做的是将模板编译为渲染函数，如果在运行时的构建版本中执行 new Vue(), 则不会出现这个阶段。      

运行时阶段，打包时，vue 文件已经编译成了 js， 模板已经编译成了渲染函数，因此会直接跳过这个阶段。       

### beforeMount - mounted

这个阶段是挂载阶段。      

这个阶段，vue 的实例会挂载到 dom 元素上 (el：指定了挂载到哪个 dom 元素)       

也就是说，之前的虚拟 dom (js 对象)，要被渲染成真实 dom 对象。      

这是时候，我们可以操作相应的 dom 元素。

挂载过程中，Watcher 会持续跟踪依赖的变化。       

如果是客户端渲染的话，可以在这个阶段去发送网络请求。

### beforeUpdate - updated

这个阶段是更新阶段      

挂载完成后， Watcher 会实时监控数据的变化，一旦数据变化，就会通知相关的依赖去更新       

虚拟 dom 会重新渲染视图。         

在渲染视图之前会触发 beforeUpdate。      

渲染完成之后会触发 updated        

### beforeDestroy - destroyed

这个阶段是卸载 vue 的阶段        

这个阶段，vue 会将自身从父组件中删除，取消实例上所有的追踪并且移除所有事件监听。       

destroyed 貌似没啥作用。       

beforeDestroy 可以在组件卸载之前保留一些状态，比如之前停留的位置。

