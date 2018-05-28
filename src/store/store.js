import Vue from 'vue'
import Vuex from 'vuex'
import  axios from './axios-auth'
import globalAxios from 'axios'

import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

export default store = new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null
  },
  getters,
  mutations,
  actions
})

