import Vue from 'vue'
import App from './App.vue'
import createStore from './store/index'

const store = createStore()

function createApp () {
  App.store = store
  return new Vue(App)
}

// const app  = createApp()
// app.$mount('#root')
if (typeof window !== 'undefined') {
  App.el = '#root'
  createApp()
}
export default createApp 