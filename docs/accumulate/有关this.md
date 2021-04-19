# 有关 this

1. 谁调用函数，函数中的 this 就指向谁。    

2. class 中的 this 指向该类。    

3. 构造函数中中的 this 指向其实例，因为 new 有一个操作是将 this 指针指向其实例。    

4. call ，bind， apply 可以改变 this 指向，让其指向其第一个参数对象。    

5. 函数在全局上时，this 指向 window。此时 this === globalThis (全局上的this指针)    
    
6. 箭头函数的 this 指向其外层上下文。    
