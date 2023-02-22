/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)


const user = {
  state:{
    user: {}
  },
  actions: {
    saveUser({commit},data){
      commit('user',data)
    }
  },
  mutations: {
    user: (state, user) =>{
      state.user = user
    }
  },
  getters: {
    user: (state)=>state.user
  }
}
export default user