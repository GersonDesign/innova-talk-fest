import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import VueCountdownTimer from 'vuejs-countdown-timer'
import firebase from 'firebase'
Vue.config.productionTip = false
Vue.use(VueCountdownTimer)
var config = {
    apiKey: "AIzaSyBIJi8rYqCwd5w-OlXaQcFhGd_D4ct_XM8",
    authDomain: "innova-db.firebaseapp.com",
    databaseURL: "https://innova-db.firebaseio.com",
    projectId: "innova-db",
    storageBucket: "innova-db.appspot.com",
    messagingSenderId: "491796357865"
  };
firebase.initializeApp(config);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
