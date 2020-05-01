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
  }

  depend () {
    if (Dep.target !== null) {
      this.subscribers.add(this)
      Dep.target = null
    }
  }
}

Dep.target = null

class Watcher {
  constructor (vm, updater, oldValue) {
    this.vm = vm
    this.updater = updater
    this.oldValue = oldValue
  }

  setOldValue(oldValue){
    this.oldValue = oldValue
  }


  update (newValue) {
    if (newValue === this.oldValue) {
      return
    }
    this.updater()
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
        Dep.target = null
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
    new Observer(vm, vm.$data)
    vm.proxyData(vm, this.$data)
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
    logName () {
      console.log(this.data.name)
    },
  },
})




