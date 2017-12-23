import Vue from 'vue'
import App from './App.vue'

import TreeView from "vue-json-tree-view"

import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);
Vue.use(TreeView)


new Vue({
    el: '#app',
    render: h => h(App)
})