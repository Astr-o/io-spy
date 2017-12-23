<template>
  <b-container fluid id="app">
    <b-row>
      <b-col cols="2"  class="sidebar">
                <h2>IO.SPY</h2>
        <b-form inline>
          <b-input id="address" v-model="address" type="text"></b-input>
          <b-button type="button" value="connect" v-on:click="connect()">connect</b-button>
        </b-form>
      <sub-list :list="events"></sub-list>

      <h4 v-if='connected'>connected</h4>
      <h4 v-else>not connected</h4>
      </b-col >
      <b-col cols="10" offset="2" class="output">
       <b-button id="clear" name="clear" v-on:click="clear()">clear</b-button>
       <event v-if="messages" v-for="(m, i) in messages" :key="i" :type="m.type" :time="m.time" :data="m.data"  ></event>
      </b-col>
    </b-row>
  </b-container>
</template>


<script>
const io = require("socket.io-client");

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import saveState from "vue-save-state";
import Event from "./Event.vue";
import EventSubscriptionList from "./EventSubscriptionList.vue";

export default {
  name: "app",

  components: {
    event: Event,
    "sub-list": EventSubscriptionList
  },

  data() {
    return {
      events: [],
      address: "",
      io: null,
      connected: false,
      messages: []
    };
  },

  mixins: [saveState],

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
        this.connected = true;
      });

      this.io.on("error", () => {
        console.log(`disconnected`);
        this.connected = false;
      });

      this.events.forEach(e => {
        console.debug(`adding adding listener for event: ${e.name}`);
        this.io.on(e.name, data => {
          console.log(`socket ${this.io.id} - recieved ${e.name}`);
          console.log(data);
          this.messages.push({
            type: e.name,
            time: new Date().toString(),
            data
          });
        });
      });
    },

    clear() {
      console.log("clearing messages");
      this.message = [];
    },

    getSaveStateConfig() {
      return {
        cacheKey: "app",
        saveProperties: ["address"]
      };
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
