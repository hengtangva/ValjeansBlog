# 获取 dom 返回的是什么？    

dom 操作有很多，其中一部分是获取 dom 元素。     

此类方法有 getElemenetById , getElementByTag  等等，今天来整理一下，避免之后只会 byId     

## getElementById

这是最常用的了。      

用法如下：    

```html
<body>
    <div id='contain'>123</div>
    <script>
        let cont = document.getElementById('contain');
        alert (cont.innerHTML);
    </script>
</body>
```    
可以看到的是 getElemntById 接受一个字符串为参数，这个字符串就是要获取元素的 id     

当有多个元素有相同 id 的时候，它只返回第一个元素(一般我们不会这门干，选择了用 id 就是一个元素一个 id)     

如果没有找到的话会返回一个 null     

---

后面的方法都是获取多个元素，注意函数里包含的 elements (复数)      

## getElementsByName

还是先看用法吧：    

```html
<body>
    <div name='contain'>123</div>
    <div name='contain'>456</div>
    <div name='contain'>789</div>
    <script>
        let contains = document.getElementsByName('contain');
        contains.forEach((ele) => {
            alert(ele.innerText);
        })
    </script>
</body>
```     
可以看到的是，getElementsByName 返回的是一个类数组     

这个类数组是 NodeList      

它查询的是 name 属性值的所有元素。     

没有找到的话，返回的是一个空类数组 NodeList(0)     

## getElementsByTagName

还是先看用法      

```html
<body>
    <div name='con'>
        <p>hello</p>
    </div>
    <p>world</p>
    <script>
        let ps = document.getElementsByTagName('p');
        console.log(ps);
        ps = Array.from(ps);
        console.log(ps);
        ps.forEach((ele) => {
            console.log(ele);
        })

    </script>
```    
它是按照标签名来查询，    

返回的是一个类数组，HTMLCollection     

这个类数组上面没有 forEach 方法，就很迷，都是类数组，为啥不给它的原型上加一个这个方法。    

没有找到的话，就返回一个空的 HTMLCollection(0)     

## getElementsByClassName

用法如下：    

```html
<body>
    <div class='con'>
        <p>hello</p>
    </div>
    <p class="con">world</p>
    <script>
        let cons = document.getElementsByClassName('con');
        console.log(cons);
    </script>
</body>
```     
它是按照 class 的值来查询的，    

返回的是类数组 HTMLCollection      

没找到的话，就返回空的类数组 HTMLCollection(0)     

## document.documentElement    

该方法返回的是 html 标签     

## document.body 

该方法返回的是 body 标签    



