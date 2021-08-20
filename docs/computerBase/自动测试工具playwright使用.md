# 自动测试工具playwright使用

最近测试的实验要自己学着使用一个测试工具。        

最终决定使用这个是因为这个测试工具还提供了 node 库，太友好了。     

## introduction

Playwright由Microsoft创建，是一个开放源代码浏览器自动化框架        

使JavaScript工程师可以在Chromium，W​​ebkit和Firefox浏览器上测试其Web应用程序        

与其他许多自动测试工具一样，关于Playwright，它旨在自动执行浏览器交互，但是必须使用断言工具进行验证。直接引入  assert 工具即可               

测试文件也可以使用框架，这里使用的测试框架是 Mocha。         

关于 mocha ，阮一峰老师有一个比较详细的教程  ['mocha教程'](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)            

## Usage

1. 首先，需要声明针对哪个浏览器引擎进行测试        

例如，针对 Chrome， 我们可以这样做

```js
const { chromium } = require('playwright')
```          

2. 然后就需要拿到浏览器和页面对象       

注意的是，关于Playwright的重要注意事项是它们的所有API都是异步的，因此需要async / await来调用它们         

- 通过 **chromium.launch()** 方法，我们可以拿到浏览器对象 browser      

- 通过 **browser.new Page()** 方法，可以拿到页面对象 page         

- 接着为 page 指定 url，即我们要测试的应用程序       

```js
let browser,
    page;
(async () => {
    browser = await chromium.launch()
    page = await browser.newPage()
    await page.goto('https://automationbookstore.dev/')
})()
```         

3. 拿到元素       

为了对 html 元素进行验证，我们首先需要的是拿到元素。        

上面一步拿到的 page 对象上有很多 访问元素和事件的方法 ['playwright访问元素'](https://playwright.dev/docs/selectors/#null)         

一个简答的例子：    

```js
// 拿到 id 为 demo 的元素的内容
page.innerText('#demo')
```         

4. 添加断言        

最后一步就是添加断言了进行验证了，这里需要引入 assert 库。        

干脆直接把测试的小示例代码放上吧。          

我们使用了 mocha 框架，测试代码用 describe 函数       

- 第一个参数是字符串，为测试的名称       

- 第二个参数是测试的回调函数         

- 回调函数上，提供了很多钩子函数。    

- it 是一个测试用例，一个测试上，至少有一个 it        

    - 第一个参数是用例方法

    - 第二个参数就是我们的断言了。       


```js
const { chromium } = require('playwright')
const assert = require('assert')

describe('测试名称', function () {
    let browser,  page

    before(async () => {
        browser = await chromium.launch()
    })
    after(async () => {
        await browser.close()
    })

    beforeEach(async () => {
        page = await browser.newPage()
        await page.goto('http://127.0.0.1:5500/test.html')
    })
    afterEach(async () => {
        await page.close()
    })

    it('断言名称', async () => {
        assert.equal(await page.innerText('#demo'), 'value')
    })
})

```



