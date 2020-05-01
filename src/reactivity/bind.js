function hello () {
  console.log(this.name)
}


hello.bind({name:'juss'})()

let obj = {
  name:'juss',
  sex:'male'
}

let p = new Proxy(obj, {
  set (target, p, value, receiver) {
    target[p] = value
    return true
  },
  get (target, p, receiver) {

  }
})
Reflect.defineProperty(data, 'text', {
  get () {
    console.log('get: ' + val);
    return val;
  },
  set (newVal) {
    console.log('set: ' + newVal);
    val = newVal;
  }
});
console.log(p.name)



