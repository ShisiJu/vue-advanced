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


