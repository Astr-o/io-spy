import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const socketState = {
    DISCONNECTED: 'disconnected',
    CONNECTING: 'connecting',
    CONNECTED: 'connected',
    ERROR: 'error',
}

const store = new Vuex.Store({

    state: {
        socketState: socketState.DISCONNECTED,
        lastStateChange: Date.now(),
        address: "",
        events: [],
        messages: []
    },

    mutations: {
        connecting(state) {
            state.socketState = socketState.CONNECTING
            state.lastStateChange = Date.now()
        },

        connected(state) {
            state.socketState = socketState.CONNECTED
            state.lastStateChange = Date.now()
        },

        error(state, error) {
            state.socketState = socketState.ERROR
            state.error = error
            state.lastStateChange = Date.now()
        },

        disconnected(state) {
            state.socketState = socketState.DISCONNECTED
            state.lastStateChange = Date.now()
        },

        newMessage(state, message) {
            state.messages.push(message)
        },

        clearMessages(state) {
            state.messages = []
        },

        addEvent(state, { name }) {
            state.events.push({ name })
        },

        removeEvent(state, { name }) {
            state.events.push({ name })
        }, 

        clearEvents(state) {
            state.events = []
        },

        setAddress(state, address) {
            state.address = address 
        }
    },

})

export default store