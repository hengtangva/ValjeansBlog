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
        {text: 'lifeRain',link: '/life/'},
        {text: 'vue 知识', link: '/vue/'},
        {text: '前端基础', link: '/accumulate/' },
        {text: '算法题库', link: '/algorithm/'},
        {text: 'github', link: 'https://github.com/hengtangva'}      
      ],
      // 侧边栏配置
      sidebar: {
        '/accumulate/': [
          '/',
          '21',
          '20','19','18','17','16','15','14','13','12','11',
          '10','9','8','7','6','5','4', '3','2', '1'   
        ],
  
        '/algorithm/': [
          '/',  
          '1', 
          '2'   
        ],

        '/vue/':[
          '/',
          '5','4','3','2','1'
        ],
        '/life/':[
          '/',
          '1',
          '2',
        ]
      },
      sidebarDepth: 2, // 侧边栏显示2级
    }
  };
