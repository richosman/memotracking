// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store'
import VueMoment from 'vue-moment'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import VueSwal from 'vue-swal'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/display.css';
// import locale from 'element-ui/lib/locale/lang/en'

// import { Notification } from 'element-ui';


axios.defaults.baseURL = 'http://localhost:3000/api/'

Vue.config.productionTip = false

Vue.use(VueMoment)
Vue.use(VueSwal)
// Vue.use(Notification)

Vue.use(ElementUI, { locale });


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
})
