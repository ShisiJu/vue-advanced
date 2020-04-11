class Dep {
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeUpdate) {
      // register the current active update
      // as a subscriber
      this.subscribers.add(activeUpdate);

    }
  }

  notify() {
    // run all subscribers function
    this.subscribers.forEach(sub => {
      sub();
    });
  }

}

let dep = new Dep();

// global variable
let activeUpdate = null;

// 因为js是单线程的; 所以我们可以认为
// activeUpdate 是当前执行的update函数

function autorun(update) {

  function wrappedUpdate() {
    activeUpdate = wrappedUpdate;
    update();
    activeUpdate = null;
  }

  wrappedUpdate();

}

autorun(() => {
  dep.depend();
  console.log('updated');
});

// autorun 中加入的箭头函数会被包裹住
// 而且,执行的函数被 activeUpdate 记录了下来

const state = {
  count: 0,
};

observe(state);

autorun(() => {
  // state. will use the getter
  console.log(state.count);
});

// it will call the setter
state.count++;

function observe(obj) {
  Object.keys(obj).forEach(key => {
    // 利用closure来记录值
    let internalVal = obj[key];
    Object.defineProperty(obj, key, {
      get() {
        return internalVal;
      },
      set(newVal) {
        internalVal = newVal;
      },
    });
  });
}
