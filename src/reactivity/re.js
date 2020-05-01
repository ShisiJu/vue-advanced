let activeUpdate = null

function observe (obj) {
  Object.keys(obj).forEach(key => {
    // 为每一个key创建一个对应的dep 用于管理依赖
    let dep = new Dep()
    let value = obj[key]
    // 通过ES6中的 Object.defineProperty 对定义的数据进行数据劫持
    Object.defineProperty(obj, key, {
      get () {
        // 通过autoRun 使得 activeUpdate 是 logDoubleB
        dep.depend()
        return value
      },
      set (v) {
        value = v
        dep.notify()
      },
    })
  })
}

class Watcher {
  constructor (obj,key) {
    Object.defineProperty(obj, key, {
      get () {
        return obj[key]
      },
      set (newVal) {
        if(newVal === obj[key] ){
          return
        }
        obj[key] = newVal
      },
    })
  }
}

class Observer {
  constructor (obj) {
    observe(obj)
  }

  observe(obj){
    Object.keys(obj).forEach(key => {
      if(typeof key === 'object'){
        observe(key)
      }
      new Watcher(obj,key)
    })
  }
}

class Dep {
  constructor () {
    this.subscribers = new Set()
  }

  notify () {
    this.subscribers.forEach(sub => {
      sub()
    })
  }

  depend () {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate)
    }
  }
}

class Compiler {

  constructor (vm) {
    this.loadTemplate(vm.$el)
  }

  loadTemplate(el){
  //  把节点加载到内存中
    let docs = document.querySelector(el)
    docs.nodeType === 1

    let fragment = document.createDocumentFragment();

    docs.firstChild

    fragment.appendChild()



  //  如果是文本节点
  //  遇到{{}} 进行替换
  //  如果读取元素
  //  重复执行上两步
  //  处理完成后,再从内存放入html中


  }


}

class Jue {
  constructor (options) {
    let vm = this
    vm.$el = options.el
    new Compiler(vm)
    this.$data = options.data()
    new Observer(vm.$data)
    vm.proxyData(vm,this.$data)
  }


  proxyData(vm,obj){
    Object.keys(obj).forEach(key => {
      Object.defineProperty(vm, key, {
        get () {
          return obj[key]
        }
      })
    })
  }
}

let app = new Jue({
  el:'#app',
  data () {
    return {
      name: {
        firstName:'ju',
        lastName:'shisi'
      },
      age: 24,
    }
  },
  methods: {
    logName () {
      console.log(this.data.name)
    },
  },
})
