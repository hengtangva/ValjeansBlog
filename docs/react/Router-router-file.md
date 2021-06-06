
# Router-router-file

## Introduction

In vue ,we can use a file to manage our router.          

And in react we can also do like that.         

## Usage

1. create a folder in folder "src" called router    

2. in folder "router", we create file "index.js"           

By analyzing an example index.js file, we can learn how to use  

```js
import { React } from 'react'

import THDiscover from "@/pages/discover";
import THMine from "@/pages/mine";
import THFriend from "@/pages/friend";

import THRecommend from '@/pages/discover/c-pages/recommend'
import THRanking from '@/pages/discover/c-pages/ranking'

import { Redirect } from "react-router";

const routes = [
    {
        path: "/",
        exact: true,
        // 路由里面可以写 render 函数，里面做重定向
        // 本质 component 也是渲染相应的组件。
        render: () => (
            <Redirect to="/discover" />
        )
    },
    {
        path: "/discover",
        component: THDiscover,
        // 这里是配置子路由
        routes: [
            {
                path: "/discover",
                exact: true,
                render: () => (
                    <Redirect to="/discover/recommend" />
                )
            }, 
            {
                path: "/discover/recommend",
                component: THRecommend,
            },
            {
                path: "/discover/ranking",
                component: THRanking,
            },
        ]
    },
   {
        path: "/mine",
        component: THMine
    },
    {
        path: "/friend",
        component: THFriend 
    }
]
// 最后导出相应的 routes
export default routes;

```          

After the configure of router, we can use it in our react component.        

Normally, we will face to 2 scene          

## Scene 1  in our root router component          

in this scene, usage like this:      

```js
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import routes from './router'

export default memo(function App() {
    return (
        <div>
            <NavLink to="/path1">页面1</NavLink>
            <NavLink to="/path2">页面1</NavLink>
            <NavLink to="/path3">页面1</NavLink>
            { renderRoute(routes) }
        </div>
    )
})
```        

- We use NavLink as a nav          

- and to show our component when path changed, we need a function called **renderRoutes**         

- to get this function we should **yarn add react-router-config** and import it         

- finally, import our routes which is an array ,and execute **renderRoute(routes)**        

that's all.           

## Scene 2 in child router

In order to use our **renderRoute()**, we need a routes array.        

However, it's not a good choice to get it from the file /router/index.js         

So, we can do like this :       

```js
import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

export default memo(function App(props) {
    const { route } = props;
    return (
        <div>
            <NavLink to="/path1/c1">页面1</NavLink>
            <NavLink to="/path1/c2">页面1</NavLink>
            <NavLink to="/path1/c3">页面1</NavLink>
            { renderRoute(route.routes) }
        </div>
    )
})
```      

Once a component has child router, it can get a Object **route**  from **props**          

and we can get the routes Array by get **route.routes**         







