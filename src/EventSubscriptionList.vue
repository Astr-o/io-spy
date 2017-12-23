<template>
  <div class="list-container">
    <b-list-group>
      <b-list-group-item v-for="(item, index) in list" :key="index" v-on:click="remove(index)" button>{{item.name}}</b-list-group-item>
    </b-list-group>
    <b-form inline>
      <b-input id="newEvent" v-model="newEvent" type="text"></b-input>
      <b-button type="button" value="connect" v-on:click="add()">add event</b-button>
    </b-form>
  </div>
</template>

<script>

import _ from 'lodash'

export default {
  name: "event-subscription-list",
  props: ["list"],

  data() {
    return {
      newEvent: ""
    }
  },

  methods: {

    add() {
      this.list.push({ name: this.newEvent })
    },

    remove(index) {
      console.log(`list-container - ${index}` )
      this.list.splice(index, 1)
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

