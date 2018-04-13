/* eslint-disable */
import Vue from 'vue';
import App from './App';
import * as firebase from 'firebase';
import {
  Vuetify,
  VApp,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VIcon,
  VGrid,
  VToolbar,
  transitions,
  VCarousel,
  VCard,
  VTextField,
  VDatePicker,
  VTimePicker
} from 'vuetify';
import router from './router';
import { store } from './store';
import DateFilter from './filters/date';
import AlertCmp from './components/Shared/Alert.vue';

import '../node_modules/vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    transitions,
    VCarousel,
    VCard,
    VTextField,
    VDatePicker,
    VTimePicker
  },
  theme: {
    primary: '#1565C0',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107',
  },
});

Vue.filter('date', DateFilter);
Vue.component('app-alert', AlertCmp);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  created() {
    firebase.initializeApp({
      apiKey: "AIzaSyCsZjqHypkV-3fTd0Vinn-9PdhKN69qDJM",
      authDomain: "devmeetup-ae563.firebaseapp.com",
      databaseURL: "https://devmeetup-ae563.firebaseio.com",
      projectId: "devmeetup-ae563",
      storageBucket: "devmeetup-ae563.appspot.com",
    })
  }
});
