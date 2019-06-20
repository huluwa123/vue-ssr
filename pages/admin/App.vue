<template>
  <div id="root">I'm skelton {{ a }}</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  data(){
    return {
    }
  },

  computed: {
    ...mapState('todo', ['a'])
  },

  created(){
    if(typeof __INITIAL_STATE__ !== 'undefined'){
      Object.assign(this, window.__INITIAL_STATE__)
      console.log("aaaa:", this)
    }
  },

  methods: {
    async asyncData(store){
      const result = await this.getA()
      store.dispatch('todo/setA', result)
    },
    
    async getA(){
      await new Promise(function(resolve){
        setTimeout(() => {
          resolve()
        }, 1000)
      })
      return '123'
    }
  }
}
</script>

<style lang="scss">
  div{
    color: red;
  }
</style>

