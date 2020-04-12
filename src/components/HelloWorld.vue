<template>
  <div class="hello">
    子组件
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  created () {
    console.log('son created')
  },
  mounted () {
    console.log('son mounted')
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
