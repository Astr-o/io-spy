import Vue from 'vue'
import App from './App.vue'

import TreeView from "vue-json-tree-view"
Vue.use(TreeView)

new Vue({
    el: '#app',
    render: h => h(App)
})