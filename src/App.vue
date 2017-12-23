<template>
  <div id="app">
    <div class="sidebar">
      <h2>IO.SPY</h2>
      <form>
        <label for="address" >Address: </label>
        <input id="address" v-model="address" type="text">
        <button type="button" value="connect" v-on:click="connect()">connect</button>
      </form>
      <sub-list :list="events"></sub-list>

      <h4 v-if='connected'>connected</h4>
      <h4 v-else>not connected</h4>

    </div>
    <div v-show="messages" class="output">
       <button id="clear" name="clear" v-on:click="clear()">clear</button>
       <event v-for="(m, i) in messages" :key="i" :type="m.type" :time="m.time" :data="m.data"  ></event>
    </div>


  </div>
</template>


<script>
const io = require("socket.io-client");

import saveState from "vue-save-state";
import Event from "./Event.vue";
import EventSubscriptionList from "./EventSubscriptionList.vue"

export default {
  name: "app",

  components: {
    "event": Event,
    "sub-list": EventSubscriptionList,
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

      console.log(`Connecting io client to ${this.address} monitoring ${this.events}`);

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
          this.messages.push({type: e.name, time: new Date().toString(), data})
        });
      });

    },

    clear() {
      console.log('clearing messages')
      this.message = []
    },

    getSaveStateConfig() {
      return {
        cacheKey: "app",
        saveProperties: ["address"],
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

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.sidebar {
  position: fixed;
  margin: 0;
  min-width: 20%;
  max-width: 200px;
  background-color: #2c3e50;
  height: 100vh;
  color: white;
  font-weight: bold;
  padding: 10px;
  float: left;

    button {
      margin-top: 10px;
    }

    input, label, button {
      padding: 10px;
    }

  form {
    display: flex;
    flex-direction: column;


  }
}

.output {
  padding-top: 50px;
  width: 75%;
  float: right;
  text-align: left;

  button {
    float: right;
    margin-right: 40px;
  }
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
