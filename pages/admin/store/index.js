import Vue from 'vue'
import todo from './modules/todo'
import Vuex from 'vuex'

Vue.use(Vuex)

function createStore(){
  return new Vuex.Store({
    modules: {
      todo
    }
  })
}

export default createStore