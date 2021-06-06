
# React Router pass parameter

## Introduction

We have known that  Dynamic Router can be used to pass parameter.         

But, it can only do some easy jobs like pass one variable.         

And react-router recommend us to use the method which is:

give API **Link** 's property **to** a object as a parameter        

according to react-router document, it said:     

- to: object
- An object that can have any of the following properties:      
    1. pathname: A string representing the path to link to.
    2. search: A string representation of query parameters.
    3. hash: A hash to put in the URL, e.g. #a-hash.
    4. state: State to persist to the location.         

usage may like this:      

```js
<Link
  to={{
    pathname: "/courses",
    search: "?sort=name",
    hash: "#the-hash",
    state: { fromDashboard: true }
  }}
/>
```           

the state is the data we want to pass         

## Usage       

As usual, our App component:        

```js
import React, { PureComponent } from 'react'
import {
  BrowserRouter, // using history mode
  NavLink,
  Route
} from 'react-router-dom'

import Detail2 from './pages/detail2'

export default class App extends PureComponent {
    const info = { name: 'valjean', age: 18}
    render() {
        return (
            <div>
                <BrowserRouter>

                    <NavLink to={{
                        pathname:"/detail2",
                        search: "?name=abc",
                        state: info
                    }}>详情2</NavLink>

                    <Route path="/detail/:id" component={ Detail2 }/>
                </BrowserRouter>
            </div>
        )
    }
}
```       

<h4>And the component Detail2 is below:</h4>        


```js


import React, { PureComponent } from 'react'

export default class Detail2 extends PureComponent {
    render() {
        const location = this.props.location;
        return (
            <div>
                <h2>detail2</h2>
                <div>name: { location.state.name }</div>
                <div>age: { location.state.age }</div>
            </div>
        )
    }
}     
```       

as a matter of fact, the state is pass to the location.         

and in the child component , we just use props to get the location.          

as a result, we can get data of state in child component     

