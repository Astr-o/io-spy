<template>
  <div id="app">
    <div class="sidebar">
      <h2>IO.SPY</h2>
      <form>
        <label for="address" >Address: </label>
        <input id="address" v-model="address" type="text">


        <label for="events">Events: </label>
        <textarea name="events" id="events" cols="30" rows="10" v-model="events"></textarea>
        <button type="button" value="connect" v-on:click="connect()">connect</button>
      </form>
      <h4 v-if='connected'>connected</h4>
      <h4 v-else>not connected</h4>

    </div>
    <div class="output">
       <event v-for="(m, i) in messages" :key="i" :type="m.type" :time="m.time" :data="m.data" ></event>
    </div>


  </div>
</template>


<script>
const io = require("socket.io-client");

import saveState from "vue-save-state";
import Event from "./Event.vue";

export default {
  name: "app",

  components: {
    "event": Event
  },

  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      json: { message: "Connect to an address" },
      events: "",
      address: "",
      io: null,
      connected: false,
      messages: []
    };
  },

  mixins: [saveState],

  computed: {
    eventTypes() {
      try {
        return JSON.parse(this.events);
      } catch (error) {
        console.error(`events field ${this.events} is not valid json`);
        console.error(error);
        return [];
      }
    }
  },

  methods: {
    connect() {
      if (this.io) {
        this.io.disconnect();
        this.io = null;
      }

      console.log(`Connecting io client to ${this.address} monitoring ${this.eventTypes}`);

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

      this.eventTypes.forEach(e => {
        console.debug(`adding adding listener for event: ${e}`);
        this.io.on(e, data => {
          console.log(`socket ${this.io.id} - recieved ${e}`);
          console.log(data);
          this.messages.push({type: e, time: new Date().toString(), data})
        });
      });

    },

    getSaveStateConfig() {
      return {
        cacheKey: "app",
        saveProperties: ["address", "events"]
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
  margin: 0;
  width: 20%;
  background-color: #2c3e50;
  height: 100vh;
  color: white;
  font-weight: bold;
  padding: 10px;
  float: left;

  form {
    display: flex;
    flex-direction: column;

    button {
      margin-top: 10px;
    }

    * {
      padding: 10px;
    }
  }
}

.output {
  padding-top: 50px;
  width: 75%;
  float: right;
  text-align: left;
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
