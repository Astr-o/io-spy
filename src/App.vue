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
       <tree-view :data="json" :options="{maxDepth: 3}"></tree-view>
    </div>


  </div>
</template>


<script>
const io = require("socket.io-client");

import saveState from "vue-save-state";

export default {
  name: "app",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      json: { message: "Connect to an address" },
      events: "",
      address: "",
      io: null,
      connected: false
    };
  },

  mixins: [saveState],

  methods: {
    connect() {
      if (this.io) {
        this.io.disconnect();
        this.io = null;
      }

      const addr = this.address;

      let events = [];
      try {
        events = JSON.parse(this.events);
      } catch (error) {
        console.error(`events field ${this.events} is not valid json`);
        console.error(error);
      }

      console.log(`Connecting io client to ${addr} monitoring ${events}`);

      const socket = io(addr);

      socket.on("connect", () => {
        console.log(`socket connected`);
        console.log(socket);
        this.connected = true;
      });

      socket.on("error", () => {
        console.log(`disconnected`);
        this.connected = false;
      });

      events.forEach(e => {
        console.debug(`adding event: ${e}`);
        socket.on(e, data => {
          console.log(`socket ${socket.id} - recieved ${e}`);
          console.log(data);
          this.json = data;
        });
      });

      this.io = socket;
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
