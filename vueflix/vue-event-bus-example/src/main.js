import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'


// Import Bootstrap an BootstrapVue CSS files
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import router from './router'

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');

[BootstrapVue, IconsPlugin].forEach((x) => Vue.use(x));

