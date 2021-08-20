
# Mobx-1-创建typescript项目


1. create-react-app my-app --template typescript        

2. npm i mobx mobx-react --save          

---        

## 添加装饰器语法

mobx 中的装饰器语法特别好用，但是需要在 tsconfig.json 中配置一下。           

```json

"experimentalDecorators": true
 
```    

## 创建typescipot项目时找不到react         

之后就发现引用的 react 报错了。        
        

这是因为，jsx-runtime 配置丢失了，因此可以在 package.json 里面配置：       


```json
"babel": {
    "presets": [
      [
        "react-app",
        {
          "runtime": "automatic"
        }
      ]
    ]
  }
```         

之后 npm install 就好了。           

