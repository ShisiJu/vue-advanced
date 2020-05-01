<template>
  <div id="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <div>count : {{count}}</div>
    <div>power count : {{powerCount}}</div>
    <div>info : {{info}}</div>
    <button @click="add">increment</button>
    <button @click="stub">decrement</button>
    <button @click="asyncRefreshName">asyncRefreshName</button>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import { mapGetters , mapState} from 'vuex'

export default {
  components: {
    HelloWorld,
  },

  methods:{
    add(){
      this.$store.commit('increment')
    },
    stub(){
      this.$store.commit('decrement')
    },
    asyncRefreshName(){
      this.$store.dispatch('refreshName')
    }
  },
  computed:{
    ...mapState(['count','info']),
    ...mapGetters([
      'powerCount'
    ])
  },
  created () {
    console.log('father created')
  },
  mounted () {
    console.log('father mounted')
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
