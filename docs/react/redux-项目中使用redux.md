# 在项目中使用 redux

## Introduction

- 数据可以由所属它的组件管理，也可以由全局来管理。总之管理的方法很多。        

- 这里就参照王元红老师的 设计思路。         

## Step1-组织目录结构  

- 首先，在 src 下，新建一个 store 文件夹。         

### 1. index.js

- 这里主要是创建我们全局的 store，以及把需要应用的中间件应用上去。        

- 这里采用 redux-thunk 来做异步更新        

- 通过 composeEnhancer 应用我们的 redux-dev-tools 以及 我们的 redux-thunk 中间件        

大致代码如下：      

```js
// 使用 redux react-redux redux-thunk

import { createStore, applyMiddleware, compose } from 'redux';

import thunk from 'redux-thunk';

import reducer from './reducer';

// 应用多个中间件
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//  第一个参数是 reducer， 第二个参数是中间件
const store = createStore(reducer,composeEnhancers(
    applyMiddleware(thunk)
))

export default store;
```          

### 2. reducer.js

这里是把各个组件的 reducer 组织起来，合并成一个 reducer， 供 index.js 里的 createStore 使用。       

- 需要从 redux 中导入 combineReducer 函数来合成      

- 对于从其他组件导入的 reducer， 我们起有标志性意义的别名。方便区分和使用

```js
import { combineReducers } from 'redux'

// 由于多个页面的 reducer 不同，因此我们要在这里合成 reducer

import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store'

const cReducer = combineReducers({
    recommend: recommendReducer
})

export default cReducer;
```       

---     

以上是在 store 文件夹上起全局管理的文件。         

接下来要在 App.js 把它们应用上去。让各个组件都能共享我们的  store          

```js

import React, { memo } from 'react';

import { Provider } from 'react-redux';
import store from './store';

import Component from '@/pages/component'
export default memo(function App() {
    return (
        <Provider store={ store }>
            <Component/>
        </Provider>
    )
})

```      

---       

ok, 大致骨架就已经搭建好了，接下来我们只需要在对应的组件中拿到数据，导出 reducer 即可放到全局 state 上。         

## Step2-为对应组件保存数据  

- 对于每个需要要保存的组件，我们可以单独为它设置一个 reducer。        

- 在该组件的目录下，我们可以也新建一个 store 文件夹。          

- 以我这里的 recommend 组件为例，大致组织结构如下；     

- recommend        
    - index.js
    - style.js
    - store
        - actionCreators.js
        - index.js
        - reducer.js
        - constants.js         

### constants.js

- 在该文件中我们还是来定义一些常量，作为 action 的 type 方便我们之后使用         

```js
// 定义常量
export const CHANGE_TOP_BANNERS = '/recommend/CHANGE_TOP_BANNERS'
```        

### actionCreators.js        

- 该文件中，我们定义一些 action 用于 reducer 的 dispatch       

- action 的 type 从我们的 constants.js 引入。       

- 注意一下这里的 getTopBanners 是我们的网络请求，异步请求我们可以放在 actionCreators 这里      

- action 只能是对象，但我们这里是一个返回对象的函数，使用的时候，只需执行该函数即可拿到对象。       


```js

import * as actionType from './constants';

import { getTopBanners  } from '../../../../../service/recommend';


export const changeTopBannerAction = (res) => ({
    type: actionType.CHANGE_TOP_BANNERS,
    topBanners: res.banners
})

export const getTopBannerAction = () => {
    return dispatch => {
        getTopBanners().then((res) => {
            dispatch(changeTopBannerAction(res))
        })
    }
}
```

### reducer.js      

- 该文件我们定义该组件的 reducer， 并判断应 action 执行对应什么操作。       

```js
import  * as actionType from './constants'

// 定义默认的 reducer 的 state
const defaultState = {
    topBanners: []
}

// reducer 函数 接受两个参数，第一个是 state， 第二个是 action
// 且它是一个纯函数
function reducer(state = defaultState, action) {
    switch(action.type) {
        case actionType.CHANGE_TOP_BANNERS:
            return {...state, topBanners: action.topBanners }
        default:
            return state;
    }
}

export default reducer;
```       

### index.js

- 这里的  index.js 没有什么重要作用，主要是用于 reducer 的导出。       

- 即引入该目录下的 reducer，然后导出它，供全局合并 reducer 使用。      

```js
import reducer  from './reducer';

export {
    reducer
}
```       

## Step3-在组件中使用         

以上工作做好以后，就可以在我们的组件中去使用了。          

下面是我们在 recommend 组件中使用之前定义好的 redux        

- 我们首先需要的是 react-redux 上面的 connect 函数       

- 其作用即返回一个高阶组件，把我们当前组件作为参数传进去之后，可以得到 props 和 state 以及 props 和 dispatch 的映射。
         
- 这样一来，我们就可以在 props 中拿到 state 以及 dispatch         

- 想要拿到 state 的话，直接可以在 props 中解构得到。      

- 想要改变 state 的话，可以先从 store 中拿到对应的 action，接着在 props 中拿到 dispatch 的函数供分发。       


```js

import React, { memo, useEffect } from 'react'
import { connect } from 'react-redux'

import { getTopBannerAction } from './store/actionCreators'

function THRecommend(props) {
    const { getBanners, topBanners } = props;
    useEffect(() => {
        getBanners();
    },[getBanners])
    // 依赖 getBanners 避免二次渲染
    return (
        <div>
            <h2>推荐</h2>
            { topBanners.length }
        </div>
    )
}
// 从 state 拿到 topBanners 供组件使用
const mapStateToProps = state => ({
    topBanners: state.recommend.topBanners
});

// 组件调用请求函数，触发 dispatch 派发更新
const mapDispatchToProps = dispatch => ({
    getBanners: () => {
        dispatch(getTopBannerAction())
    }
})
export default connect(mapStateToProps, mapDispatchToProps)(memo(THRecommend));

```     

:::tip
这里最后一步的使用，有些繁琐，不推荐使用。事实上，react-redux 提供了对应的 hooks，详见下一节。
:::



