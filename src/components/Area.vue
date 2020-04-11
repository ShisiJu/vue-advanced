<template>

</template>

<script>
export default {
  name: 'Area',
  data () {
    level:'1'
  },
  render (h) {

    h('div', 'some text')
    h('div', {
      class: 'foo',
    }, 'some text')

    h('div',
      {
        class: 'foo',
      },
      [
        'some text',
        h('span', 'hello'),
      ],
    )
    return (
      <div level={this.level}>
        <span>Hello</span> world!
      </div>
    )
  },
}
</script>

<style scoped>

</style>
