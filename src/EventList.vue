<template>
  <div class="list-container">
    <b-list-group>
      <b-list-group-item v-for="(item, index) in events" :key="index" v-on:click="remove(item)" button>{{item.name}}</b-list-group-item>
    </b-list-group>
    <b-form inline>
      <b-input id="newEvent" v-model="newEvent" type="text"></b-input>
      <b-button type="button" v-on:click="add()">add event</b-button>
    </b-form>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import _ from 'lodash'

export default {
  name: "event-list",

  data() {
    return {
      newEvent: ""
    }
  },

  computed: {
    ...mapState(['events'])
  },

  methods: {

    add() {
      this.$state.commit('addEvent', ({ name: this.newEvent }))
    },

    remove(event) {
      this.$state.commit('removeEvent', event)
    }
  }
};
</script>

<style lang="scss">
  .list-container {
    display: flex;
    flex-direction:column;

    text-align: left;

    button: {
      float: right;
    }


  }
</style>

