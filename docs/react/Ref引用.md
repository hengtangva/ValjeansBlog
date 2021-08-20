# Ref 引用

react 中的 ref 引用比较方便的是直接使用 hook **useRef**           

下面展示其用法：         

```js
import { memo, useRef } React from 'react'

function App() {
    const demoRef = useRef();
    return (
        <div>
            <p ref={ demoRef }><p>
        </div>
    )
}

export default App;
```