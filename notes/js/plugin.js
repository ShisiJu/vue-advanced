import Vue from './vue';

const myMixin = {
  created() {
    if (this.$options.rules) {
      //  we can do somethings
    }
  },
};

const myPlugin = {
  install(Vue) {
    Vue.mixin({
      created() {
        const rules = this.$options.rules;
        if (rules) {
          //  we can do somethings
          Object.keys(rules).forEach(key => {
            let r = rules[key];
            this.$watch(key, newValue => {
              if (!r.validate(newValue)) {
                console.log(r.message);
              }
            });
          });
        }
      },
    });
  },

};

let vm = new Vue({
  data() {
    return {
      foo: 10,
    };
  },
  created() {
    this.$options.rules;
  },
  rules: {
    foo: {
      validate: value => value > 1,
      message: 'foo must be greater than 1',
    },
  },
});






