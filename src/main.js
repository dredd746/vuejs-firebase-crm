import Vue from 'vue'
import App from './App.vue'
import dateFilter from '@/filters/date.filter'
import router from './router'
import store from './store'
import Vuelidate from 'vuelidate'
import messagePlugin from '@/utils/message.plugin'
import firebase from 'firebase/app'
import loader from '@/components/app/loader'
import Paginate from 'vuejs-paginate'
import 'materialize-css/dist/js/materialize.min'
import './registerServiceWorker'
import 'firebase/auth'
import 'firebase/database'




Vue.config.productionTip = false
Vue.filter('date',dateFilter)
Vue.use(Vuelidate)
Vue.use(messagePlugin)
Vue.component('loader',loader)
Vue.component('paginate', Paginate)

  const firebaseConfig = {
    apiKey: "AIzaSyAaW9ozqeoZufCDMrajkkI0VF02W2olhrQ",
    authDomain: "vuecrm-8d237.firebaseapp.com",
    projectId: "vuecrm-8d237",
    storageBucket: "vuecrm-8d237.appspot.com",
    messagingSenderId: "688502900890",
    appId: "1:688502900890:web:664729a4a1cf1389ce3723",
    measurementId: "G-WFX2H6B1SC"
  };
firebase.initializeApp(firebaseConfig)


let app

firebase.auth().onAuthStateChanged(() => {
  if(!app){
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})


