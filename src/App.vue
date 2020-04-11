<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import Vuex from 'vuex'

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    increment (state) {
      state.count++
    },
  },
})
export default {
  name: 'App',
  store,
  components: {
    HelloWorld,
  },
}
</script>

<style>
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
