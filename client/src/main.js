import Vue from 'vue'
import App from './App.vue'

// Import main.css file
import './assets/css/main.css';
// Import fontAwesomeIcon6
import './assets/js/fontAwesomeIcon.js';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')