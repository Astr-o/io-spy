<template>
  <div class="list-container">
    <ul>
      <li v-for="(item, index) in list" :key="index"> {{item.name}} <button class="btn-remove" v-on:click="remove(index)">X</button></li>
    </ul>
    <label for="newEvent">Add Event</label>
    <input type="text" name="newEvent" id="newEvent" v-model="newEvent"/>
    <button v-on:click="add()">+</button>
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

