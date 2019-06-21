import Vue from 'vue'
import App from './App.vue'

function createApp () {
  return new Vue(App)
}

if (typeof window !== 'undefined') {
  App.el = '#root'
  createApp()
}

export default createApp 