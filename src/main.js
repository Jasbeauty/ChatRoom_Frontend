import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuex from 'vuex'
import 'bulma/css/bulma.css'
import 'font-awesome/css/font-awesome.css'

import axios from 'axios'
import qs from "qs";
Vue.config.productionTip = false

//与websocket服务端建立连接
Vue.use(Vuex)

// Vue.use(axios)
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// Vue.prototype.$axios = axios;
// Vue.prototype.$qs = qs;


new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
