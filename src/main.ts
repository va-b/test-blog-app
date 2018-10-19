import iapp from "@/plugins/iapp";
import { ServicesFactory } from "@/services/ServicesFactory";
import Vue from 'vue'
import './plugins/vuetify'
import App from './components/main/App.vue'
import router from './routing/router'
import store from './store/appstore'

Vue.config.productionTip = false;

iapp.serviceFactory = new ServicesFactory();
iapp.vi = new Vue({ router, store, render: h => h(App) });
iapp.vi.$mount('#app');
