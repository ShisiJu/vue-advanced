class Dep {
  constructor () {
    this.subscribers = new Set()
  }

  notify () {
    this.subscribers.forEach(sub => {
      sub.updater()
    })
  }

  addSubscriber (watcher) {
    if (!watcher) {
      return
    }
    this.subscribers.add(watcher)
    Dep.target = null
  }

}

Dep.target = null

class Watcher {
  constructor (vm, updater ){
    this.vm = vm
    this.updater = updater
    this.oldValue = null
    this.isNew = true
  }

  setOldValue(oldValue){
    if (oldValue === this.oldValue){
      this.isNew = false
      return
    }
    this.oldValue = oldValue
    this.isNew = true
  }

  update () {
    if(this.isNew){
      this.updater()
    }
  }
}

class Observer {
  constructor (vm, obj) {
    this.vm = vm
    this.observe(vm, obj)
  }

  observe (obj) {
    Object.keys(obj).forEach(key => {
      let dep = new Dep()
      let val = obj[key]
      Object.defineProperty(obj, key, {
        get () {
          Dep.target = dep
          return val
        },
        set (newVal) {
          if (newVal === obj[key]) {
            return
          }
          val = newVal
          dep.notify()
        },
      })

      if (typeof val === 'object') {
        this.observe(val)
      }
    })
  }
}

class JueExpr {
  constructor (vm, expr) {
    this.vm = vm
    this.data = vm.$data
    this.expr = expr
  }

  getValue () {
    return this.expr.split('.').reduce((acc, cur) => {
      return acc[cur]
    }, this.data)
  }

  text () {
    let value = this.getValue()
    return value.toString()
  }

}

class Compiler {

  constructor (vm) {
    this.vm = vm
    this.loadTemplate(vm.$el)
  }

  loadTemplate (el) {
    //  把节点加载到内存中
    let node = document.querySelector(el)
    let fragment = document.createDocumentFragment()
    let currentDom = node.firstChild

    while (currentDom != null) {
      this.compile(currentDom)
      fragment.appendChild(currentDom)
      currentDom = node.firstChild
    }
    node.appendChild(fragment)
  }

  compile (dom) {
    this.compiledByNodeType(dom, dom.nodeType)
  }

  compiledByNodeType (dom, nodeType) {
    if (nodeType === 3) {
      return this.compileText(dom)
    }
    if (nodeType === 1) {
      return this.compileElement(dom)
    }
  }

  compileText (dom) {
    let text = dom.textContent
    let defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
    if (!defaultTagRE.test(text)) {
      return
    }
    let vm = this.vm
    let watcher = new Watcher(vm, fn)
    fn()

    function fn () {
      dom.textContent = text.replace(defaultTagRE, (...args) => {
        let expr = args[1]
        let jueExpr = new JueExpr(vm, expr)
        // 下面的方法必然会触发 get
        let compiledResult = jueExpr.text()
        Dep.target.addSubscriber(watcher)
        watcher.setOldValue(compiledResult)
        return compiledResult
      })
      return dom.textContent
    }
  }

  updateText (dom, text) {
    let defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g
    dom.textContent = text.replace(defaultTagRE, (...args) => {
      let expr = args[1]
      let jueExpr = new JueExpr(this.vm, expr)
      return jueExpr.text()
    })
  }

  compileElement (dom) {
    dom.childNodes.forEach(node => {
      this.compile(node)
    })
  }

}

class Jue {
  constructor (options) {
    let vm = this
    vm.$el = options.el
    this.$data = options.data()
    this.$methods = options.methods
    new Observer(vm, vm.$data)
    vm.proxyData(vm, this.$data)
    vm.proxyMethods(vm, this.$methods)
    this.compileTemplate()
  }

  compileTemplate () {
    new Compiler(this)
  }

  proxyData (vm, obj) {
    Object.keys(obj).forEach(key => {
      Object.defineProperty(vm, key, {
        get () {
          return obj[key]
        },
        set (v) {
          obj[key] = v
        },
      })
    })
  }

  proxyMethods(vm, methods){
    Object.keys(methods).forEach(key => {
      Object.defineProperty(vm, key, {
        get () {
          return methods[key].bind(vm)
        }
      })
    })
  }
}

let app = new Jue({
  el: '#app',
  data () {
    return {
      name: {
        firstName: 'ju',
        lastName: 'shisi',
      },
      age: 24,
      sex: 'male'
    }
  },
  methods: {
    changeSex (sex) {
      console.log('before '+this.sex)
      this.sex = sex
      console.log('after '+this.sex)
    },
    getSex(){
      return this.sex
    }
  },
})




