<template>
  <b-container fluid id="app">
    <b-row>
      <b-col cols="2"  class="sidebar">
        <h2>IO.SPY</h2>
        <b-form inline>
          <b-input id="address" v-model="address" type="text"></b-input>
          <b-button type="button" value="connect" v-on:click="connect()">connect</b-button>
        </b-form>
      <event-list></event-list>
      <h4>{{ status }}</h4>
      </b-col >
      <b-col cols="10" offset="2" class="output">
       <b-button id="clear" name="clear" v-on:click="clear()">clear</b-button>
       <message v-if="messages" v-for="(m, i) in messages" :key="i" :type="m.type" :time="m.time" :data="m.data"  ></message>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
const io = require("socket.io-client");

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import saveState from "vue-save-state";
import Message from "./Message.vue";
import EventList from "./EventList.vue";

import { mapState } from "vuex";

export default {
  name: "app",

  components: {
    message: Message,
    "event-list": EventList
  },

  computed: {
    ...mapState(['messages'])
  },

  data() {
    return {
      address: "",
      io: null
    };
  },

  methods: {
    connect() {
      if (this.io) {
        this.io.disconnect();
        this.io = null;
      }

      console.log(
        `Connecting io client to ${this.address} monitoring ${this.events}`
      );

      this.io = io(this.address);

      this.io.on("connect", () => {
        console.log(`socket connected`);
        console.log(this.io);
        this.$state.commit("connected");
      });

      this.io.on("error", err => {
        console.log(`disconnected`);
        this.connected = false;
        this.$state.commit("error", err);
      });

      this.events.forEach(e => {
        console.debug(`adding adding listener for event: ${e.name}`);
        this.io.on(e.name, data => {
          console.log(`socket ${this.io.id} - recieved ${e.name}`);
          console.log(data);
          this.$state.commit("newMessage", {
            type: e.name,
            time: new Date().toString(),
            data
          });
        });
      });
    },

    clear() {
      console.log("clearing messages");
      this.$state.commit("clearMessages");
    }
  }
};
</script>

<style lang="scss">
html,
body {
  margin: 0;
}

.output {
  #clear {
    float: right;
  }
}

.sidebar {
  position: fixed;
  background-color: #2c3e50;
  height: 100vh;
  color: white;
  font-weight: bold;
  padding: 10px;
  text-align: center;
}

h1,
h2 {
  font-weight: normal;
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
