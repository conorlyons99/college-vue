import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'                                       //Importing Vue components such as BootstrapVue
import 'bootstrap-vue/dist/bootstrap-vue.css'                                   //And VuePageTransition
import VuePageTransition from 'vue-page-transition'

Vue.use(VuePageTransition)                                                      //Telling the app to use these componenets

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  router,                                                                       //Initialising a new Vue application
  render: h => h(App),
}).$mount('#app')
