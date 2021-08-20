module.exports = {
    title: "Valjeanth's blog",
    description: '我亦飘零久，十年来，深恩负尽',
    head: [ // 注入到当前页面的 HTML <head> 中的标签
      ['link', { rel: 'icon', href: '/logo.jpg' }], // 增加一个自定义的 favicon(网页标签的图标)
    ],
    base: '/', // 这是部署到github相关的配置
    markdown: {
      lineNumbers: true // 代码块显示行号
    },
    themeConfig: {
      logo: 'assets/logo.jpg',
      nav:[ // 导航栏配置
        {text: '网络方面',link: '/net/'},
        {text: '前端进阶',link: '/advance/'},
        {text: 'lifeRain',link: '/life/'},
        {text: 'vue 知识', link: '/vue/'},
        {text: 'react 知识', link: '/react/'},
        {text: '碰到的问题', link: '/computerBase/'},
        {text: 'css基础', link: '/css/'},
        {text: 'js基础', link: '/accumulate/' },
        {text: '算法基础', link: '/algorithm/'},
      ],
      // 侧边栏配置
      sidebar: {
        '/react/': [
          '/',
          '关于react更新机制的了解',
          'Mobx-1-创建typescript项目','Mobx-2-版本相关的问题','Mobx-3-可观测状态','Mobx-4-mobx对何做出反应',
          'Mobx-5-mobx响应-computed','Mobx-6-mobx响应-autorun','Mobx-7-mobx响应-reaction','Mobx-8-mobx响应-when',
          'Mobx-9-状态改变-使用action','Mobx-10-异步action改变状态',
          '路由懒加载',
          'redux-redux-devtools','redux-项目中使用redux','redux-react-redux的hooks',"redux-ImmutableJS优化reducer",
          'Router-Dynamic-routing','Router-Pass-parameter','Router-router-file'
        ],
        '/net/': [
          '/',
          'TCP简介','TCP的报文','TCP的连接管理','TCP的窗口滑动','TCP的超时时间','TCP的拥塞机制',
          'http状态码','http首部','http的get和post的区别','http和https','http的版本',
          'CDN原理','DNS原理','cookie的作用',
          'SSL加密'
        ],
        '/accumulate/': [
          '/',
          'setTimeout和interval和rqanimation',
          '变量提升','代理和反射','迭代器','生成器','异步的最终解决方案','获取dom的返回元素','模板字符串',
          '判断数据类型','强制类型转换','箭头函数',
          '事件代理','promise基础','手写promise','promise用es5实现','new操作符','meta的用法',
          'js继承','class的使用','js的number','fetch','set','map','weakmap和weakset','symbol','defer和ascyc',
          '原型和原型链','有关this','运算符优先级','指数操作符','call和apply和bind',
          '页面的生命周期',
          '数组的高阶函数-splice','数组的高阶函数-reduce'
        ],
        '/css/': [
          '/',
          '毛玻璃的制作',
          'text-indent的学习',
          'position的学习','display的学习','让一个div消失视野','z-index的使用',
          '盒子模型','盒子的阴影',
          'a标签的伪类','伪类和伪元素','选择器匹配规则','css的选择器',
          'css的布局','盒子垂直水平居中','元素内容居中',
          '浏览器的字体','css的长度单位','css文件的引入','精灵图','精灵图进阶',
          'BFC','清除浮动',
          'inline-block的间隙','line-height','min-height和max-height'
          
        ],
        '/advance/' : [
          '/',
          '函数柯里化',
          '性能优化','正则表达式',
          'Promise进阶','闭包','打包文件的hash名','客户端和服务端渲染','垃圾回收','浏览器缓存机制','内存泄漏','前端路由',
          '使用token','事件循环','手写题目','手写flat','输入url到生成页面','图片懒加载','网络攻击','重绘和回流',
          'axios的基本使用','axios高级','jsonp原理','offset的高度','防抖和节流','跨域','浏览器存储','ajax工作原理'
        ],
        '/computerBase/':[
          '/',
          '自动测试工具playwright使用','windows切换node版本-nvs',
          'git学习-生成ssh-key以及git的初始配置','git学习-git-stash','git学习-合并分支','git学习-合并冲突','git学习-合并原理',
          '数组的push的返回值','sass版本不兼容vue的问题',
          '9','8','7','6','5','4','3'
        ],

      
        '/algorithm/': [
          '/',  
          '摩尔投票',
          '背包问题','动态规划','动态规划-无后效性','动态规划-子序列问题',
          '深度优先搜索','广度优先搜索','回溯法','贪心',
          '二叉树的遍历','二叉树的构建','二叉树的其他操作','搜索二叉树',
          '二分查找','二分查找寻找最优解','双指针', '矩阵的搜索',
          '链表','数组','排序','数学建模','栈','前缀和','哈希和map','原地hash',
          '位运算-异或',
          '面试碰到的题目'   
        ],

        '/vue/':[
          '/',
          'vue生命周期',
          '为什么用proxy重构','响应式原理','响应式对数组的处理',
          '事件总线','深度选择器使用','子组件data为什么不是对象','diff算法','keep-alive原理',
          'nextTick原理','v-if和v-show','v-model原理','vue的vue-router',
          
        ],
        '/life/':[
          '/',
          '4','3','2','1'
        ]
      },
      sidebarDepth: 2, // 侧边栏显示2级
    }
  };
