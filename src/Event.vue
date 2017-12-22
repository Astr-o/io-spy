<template>
  <div>
      <h3>{{ type }}</h3>
      <h4>{{ time }}</h4>
      <tree-view :data="data" :options="{maxDepth: 3}"></tree-view>
  </div>
</template>

<script>
export default {
    name: "event",
    props: ['type', 'data', 'time'],
}
</script>

<style lang="scss">

</style>

