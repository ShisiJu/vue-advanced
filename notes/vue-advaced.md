https://www.bilibili.com/video/BV1d4411v7UX

frontend master


Reactive

非响应式的

```js
let a = 3;
let b = a * 2;
// 6
console.log(b)
a = 6;
// 6
console.log(b)
```

如果变成响应式的

使用 来实现响应式


[MDN-Object-defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
[MDN-Object-defineProperties](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)


数据描述符和存取描述符。

```js
Object.defineProperty(obj,'key',{

})
```

dependence

依赖追踪

我们为什么要使用 wrapped update ?

when our dependcency changes 
adn the update function is called again


```js
function wrappedUpdate() {
    activeUpdate = wrappedUpdate
    update()
    activeUpdate = null
  }
```

这样 `activeUpdate` 获取了当前的执行方法 

添加新的依赖
删除多余的依赖


观察者,观察数据变化


plugin

Vue.use
<!-- -->

```js
// mixin 对每一个vue对象都会有影响; 慎重使用
Vue.mixin()
```


## render

in a vue context

we first render a vue app
first compile the template into Render function



scaffold

virtual dom


render function 

A function that returns Virtual DOM

- returns new virtual dom
- diffed against old virtual dom  dom updates
- applied to actual dom



initial render

Template
- compiled into Render function
- returns virtual dom
- generates actual dom

To apply the minimal amount of changes to the actual dom


Virtual Dom

```js
// a heavy object 
document.createElement('div')
// just a object in js
vm.$createElement('div')
```

actual dom 
it's internals are in fact implementing C++
by browser engine

if you touch the dom . things get slower


```js
// virtual dom
const vm  = {
  tag:'div',
  data: {
    attrs:{
    
}
  }
}
```

a lightweight js data format to represent what the 
actual dom should look at a given point in time


if we use inner HTML to update out app,
we are essentially throwing away all
the previous DOM nodes 
real DOM nodes regenerating all the real DOM 
nodes again

Virtual dom is just a way to get around
the limitation of the original DOM 
so that it enable this paradigm of declaratively 
composing what you want the DOM to look like

Template - Compiler - Render Function


it declares the relationship between 
the dom adn our state

it is just a more static and more constraining form
of expression, and that static property has its advantages

template is more static
jsx or render function is more dynamic

[render-function](https://cn.vuejs.org/v2/guide/render-function.html)

[vuejs/jsx](https://github.com/vuejs/jsx#installation)

我们把这样的节点描述为“虚拟节点 (virtual node)”，也常简写它为“VNode”。


[higher-order-components](https://medium.com/@soorajchandran/introduction-to-higher-order-components-hoc-in-react-383c9343a3aa)

higher order component 
这是React中的一个概念; 

advance 
is that you don't really pollute the inner
avatar component



## state management

当app 越来越大,越来越复杂

it is difficult to track down where you store
the state and where you're changing the state

`Flux` patterns are like glasses
You know when you need it 

if you're seeing everything perfectly
fine, then you probably don't need it
 


## router

