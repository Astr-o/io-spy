<template>
  <div>
        <b-card :title="type"
          tag="article"
          class="mb-2">
      <tree-view :data="data" :options="{maxDepth: 5}"></tree-view>
  </b-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
    name: "event",
    props: ['type', 'data', 'time'],

    computed: {
      title() {
        return `${this.type} - ${moment(time).toString()}`
      }
    }
}
</script>

<style lang="scss">

</style>

