# react-redux 中的 hooks 的使用

## Introduction

之前在项目中的最后一步，我们的是使用了 react-redux 的 connect 函数来做映射的。          

但是这样做很繁琐，每次都得写 mapPropsToState 和  mapPropsToDispatch          

事实上，react-redux 也给我们提供了相应的 hooks ，供我们简化写法。         

## Usage

需要使用的是这两个 hooks       

1. useDispatch      

    - 我们只需执行该 hook，拿到返回的一个函数 dispatch。        

    - 接着把 对应的 action 作为参数传给这个 dispatch 函数，即可完成分发的效果。          

2. useSelector        

    - 该 hook 接受一个回调，该回调的参数是 state。       

    - 所以我们可以在该回调中返回一个对象，把 state 中想要的数据放里面即可。     

    - 最后结构该对象，拿到我们想要的数据 


```js
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual} from 'react-redux'

import { getTopBannerAction } from './store/actionCreators'

function THRecommend(props) {

    const { topBanners } = useSelector(state => ({
        topBanners: state.recommend.topBanners
    }),shallowEqual)

    // 用 useDispatch hook 去分发 action，从而改变 state
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopBannerAction());
    },[dispatch])
    return (
        <div>
            <h2>推荐</h2>
            { topBanners.length } 
        </div>
    )
}

export default memo(THRecommend);
```

**Attention**        

对于 useSelector 这个 hook， 它默认是没有做优化的。       

- 实际上，它会把前后使用的数据对象进行引用比较。不等就重新渲染。        

- 而我们知道的是，只要 state 改变，引用就会改变。渲染就必定发生( 尽管state中对应的数据没有改变 )          

所以我们可以给 该 hooks 传递第二个参数，**shallowEqual**， 即让前后做一个浅层比较。        

从而避免多次没有必要的重复渲染。         

