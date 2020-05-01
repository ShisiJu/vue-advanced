<template>
  <div>
    <button @click="changeHash('foo')">foo</button>
    <button @click="changeHash('bar')">bar</button>
    <component :is="currentHash"></component>
  </div>
</template>
<script>
import Foo from '@/components/Foo'
import Bar from '@/components/Bar'
export default {
  name: 'App',
  render(h){

  },
  data () {
    return {
      currentHash: 'foo',
    }
  },
  methods: {
    changeHash (component) {
      this.currentHash = component
    },
  },
  components: {
    foo:Foo,
    bar:Bar
  },
}
</script>

<style>

</style>
