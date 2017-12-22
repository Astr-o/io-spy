<template>
  <div id="app">
    <div class="sidebar">
      <h2>IO.SPY</h2>
      <form>
        <label for="address" >Address: </label>
        <input id="address" v-model="address" type="text">


        <label for="events">Channels:</label>
        <textarea name="events" id="events" cols="30" rows="10" v-model="channels"></textarea>
        <input type="button" value="connect" v-on:click="connect()">
      </form>

    </div>
    <div class="output">
       <tree-view :data="json" :options="{maxDepth: 3}"></tree-view>
    </div>


  </div>
</template>


<script>
import io from 'socket.io-client'

export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      json: { message: "Connect to an address"},
      events: "",
      address: "",
      io: null
    }
  },

  methods: {
    connect: function() {
      const addr = this.address
      const events = this.events.split('\n')

      console.log(`Connecting io client to ${addr} monitoring ${events}`)

      const socket = io(addr)

      events.forEach(e => {
        socket.on(e, data => this.json = data)
      })

      this.io = socket
    }
   }


}
</script>

<style lang="scss">
html, body {
  margin: 0
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}

.sidebar {
  margin: 0;
  width: 20%;
  background-color: #2c3e50;;
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

h1, h2 {
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
