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
        {text: '碰到的问题', link: '/computerBase/'},
        {text: 'css基础', link: '/css/'},
        {text: 'js基础', link: '/accumulate/' },
        {text: '算法基础', link: '/algorithm/'},
      ],
      // 侧边栏配置
      sidebar: {
        '/net/': [
          '/',
          'http状态码','http首部','http的get和post的区别','http和https','CDN原理','DNS原理','cookie的作用',
          'SSL加密'
        ],
        '/accumulate/': [
          '/',
          '变量提升','代理和反射','迭代器','生成器','异步的最终解决方案','获取dom的返回元素','模板字符串',
          '判断数据类型','强制类型转换',
          '事件代理','promise基础','手写promise','promise用es5实现','new操作符','meta的用法',
          'js继承','class的使用','js的number','fetch','set','map','weakmap','symbol','defer和ascyc',
          '原型和原型链','有关this','运算符优先级','指数操作符','call和apply和bind','强制类型转换','判断数据类型',
          '页面的生命周期'
        ],
        '/css/': [
          '/',
          '24','23','22','21',
          '20','19','18','17','16','15','14','13','12','11',
          '10','9','8','7','6','5','4','3','2','1'
        ],
        '/advance/' : [
          '/',
          '闭包','打包文件的hash名','客户端和服务端渲染','垃圾回收','浏览器缓存机制','内存泄漏','前端路由',
          '使用token','事件循环','手写题目','手写flat','输入url到生成页面','图片懒加载','网络攻击','重绘和回流',
          'axios的使用','jsonp原理','offset的高度','防抖和节流','跨域','浏览器存储','ajax工作原理'
        ],
        '/computerBase/':[
          '/',
          '9','8','7','6','5','4','3','2','1'
        ],

      
        '/algorithm/': [
          '/',  
          '11','10','9','8','7','6','5','4','3','2','1'   
        ],

        '/vue/':[
          '/',
          '9','8','7','6','5','4','3','2','1'
        ],
        '/life/':[
          '/',
          '4','3','2','1'
        ]
      },
      sidebarDepth: 2, // 侧边栏显示2级
    }
  };
