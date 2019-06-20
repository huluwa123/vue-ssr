import Vue from 'vue'
import App from './App.vue'


function createApp () {
  return new Vue({
    render: h => h(App)
  })
}

const app  = createApp()
app.$mount('#root')

export default createApp 