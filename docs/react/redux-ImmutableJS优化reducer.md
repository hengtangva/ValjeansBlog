# redux-ImmutableJS优化reducer

## 前言

- 在 redux 中，我们的 reducer 是一个纯函数，而不是纯函数就会产生很多的问题。       

- 比如引用了某个对象后，又修改了它堆里的内容。从而导致其他地方的引用也跟着改变了。       

- 因此，我们通常的方法是对所需要用的对象进行一层浅拷贝。         

    1. Object.assign(), let newObj = Object.assign(obj);           

    2. 扩展运算符, let newObj = { ...obj }          

- 但是，随之带来的问题是，每次数据变动都需要进行一次浅拷贝，比较消耗性能。        

- 一个比较好的解决方案是 **ImmutableJS**       

## Introduction

- Immutable 对象的特点是只要修改了对象，就会返回一个新的对象，旧的对象不会发生改变          

- 为了节约内存，出现了 Persistent Data Structure (持久化数据结构)        

    1. 首先，它是一种数据结构          

    2. 其次，当数据修改时，返回一个新的对象，新对象会尽可能的利用之前的数据结构而不会对内存造成浪费。       

    3. 具体实现方式，是把对象用树来进行存储，当有部分数据改变时，该数据对应的节点会再新生成一个节点。从而让新树复用一些没有改变的数据。        

## Usage

为了演示方便，这里直接在 html 文件里引入了 cdn      

对于普通的对象，我们可以通过 Immutable 上面的 Map 方法

```html
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.2/immutable.min.js" integrity="sha512-myCdDiGJRYrvRb/VuJ67ljifYTJdc1jdEvL4c4ftX9o3N6EAnmD83c/7l2/91RCINZ7c8w21tiXDT7RDFjdc3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <script>
        // 1，首先要拿到 Immutable 对象
        const im = Immutable;

        const info = {
            name: 'th',
            age:21
        }

        // 接着调用 其上面的 Map 方法，把我们的对象转为  Immutable 对象
        // 之后的操作都在该对象上进行，类似于 proxy 的代理
        const infoIM = im.Map(info);

        const obj = infoIM;

        // 改变数据通过 set 完成， 注意由于是 map 结果，因此，属性的 key 要用字符串
        const infoIM2 = infoIM.set("name",'valjean');

        // 获取数据通过 get 得到
        console.log(obj.get("name"));  // th
        console.log(infoIM2.get("name"));  // valjean
    </script>
</body>

```         

- 如果是数组的话， 我们可以用其上面的 List 方法        

```html
<body>
<script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.2/immutable.min.js" integrity="sha512-myCdDiGJRYrvRb/VuJ67ljifYTJdc1jdEvL4c4ftX9o3N6EAnmD83c/7l2/91RCINZ7c8w21tiXDT7RDFjdc3g==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
<script>
    // 1，首先要拿到 Immutable 对象
    const im = Immutable;

    const names = ['abc','123','hello'];

    // 2， 调用其上面的  List 方法，将数组改成 Immutable 对象
    const nameIM = im.List(names);

    // 同样通过 get 数组改变内容
    const arrIM = nameIM.set(0, 'kobe');

    // 对于数组，我们还可以调用其上面的 push pop 之类的方法

    // 通过 get 拿到数组的内容
    console.log(nameIM.get(0));
    console.log(arrIM.get(0));

</script>
</body> 
```     

## Attention        

1. 对于这里的拷贝复用，仅做的是浅层拷贝，因为更深层的拷贝，由于递归层数过多，反而更消耗性能，有些得不偿失。        

## reducer 中使用 ImmutableJS 进行优化

- 为了避免我们的 reducer 函数中进行多次没有必要的拷贝，我们可以将 defaultState 变为 Immutable 对象。      

- 安装： yarn add immutable          

大致使用方法如下：      

reducer.js       

```js
import { Map } from 'immutable';

import  * as actionType from './constants'

// 转为 immutable 对象，避免重复拷贝
const defaultState = Map({
    topBanners: []
})

function reducer(state = defaultState, action) {
    switch(action.type) {
        case actionType.CHANGE_TOP_BANNERS:
            //  调用 set 方法进行更新
            return state.set('topBanners', action.topBanners);
        default:
            return state;
    }
}

export default reducer;

```         

由于 state 已经转为 immutable 对象，所以，我们在取上面的数据的时候，也需要用 get 来取。         

这是组件中取 state 的 index.js 文件

```js
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector, shallowEqual} from 'react-redux'

import { getTopBannerAction } from './store/actionCreators'

function THRecommend(props) {

    const recommend = useSelector(state => ({
        //  这里我们改用 get 去取数据
        topBanners: state.recommend.get('topBanners')
    }),shallowEqual)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTopBannerAction());
    },[dispatch])

    return (
        <div>
            <h2>推荐</h2>
            { recommend.topBanners.length } 
        </div>
    )
}
export default memo(THRecommend);
```         

## 合并 reducer 时使用 redux-immutable

我们上面使用的 immutable 仅是单个组件的 reducer。        

在 src 下的 store 中的主 reducer 文件中，我们是要合并众多 reducer 的。          

如果也想对这里合并的 reducer 进行优化，可以直接使用 immutable 结合了 redux 的库， redux-immutable        

- 安装： yarn add redux-immutable          

- 应用： redux-immutable 其实也为我们提供了 combineReducers 函数，所以我们直接用它的即可完成。       

我们的主 reducer 文件如下       

```js
import { combineReducers } from 'redux-immutable'

import { reducer as recommendReducer } from '../pages/discover/c-pages/recommend/store'

const cReducer = combineReducers({
    recommend: recommendReducer
})

export default cReducer;
```         

----       

现在，我们的 state 也变成了 immutable 对象了，因此从上面去取子 state 我们也需要 get 方法       

组件中使用如下：       

```js
//  省略文件的引入
function THRecommend(props) {

    const recommend = useSelector(state => ({
        //  这里我们改用 两次 get 去取数据
        //  topBanners: state.get('recommend').get('topBanners')

        // 对于两次 get 的使用有些繁琐，因此，它提供了对应的语法糖
        // 使用 getIn 方法，传递一个可迭代对象(数组)，即可完成多层的 get
        topBanners: state.getIn(['recommend','topBanners'])

    }),shallowEqual)

    //  省略部分无关代码

    return (
        <div>
            <h2>推荐</h2>
            { recommend.topBanners.length } 
        </div>
    )
}
export default memo(THRecommend);
```









