// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex from 'vuex';
import 'vuetify/dist/vuetify.min.css';
import App from './App';
import GlobalStore from './global-store';

Vue.use(Vuetify);
Vue.use(Vuex);

Vue.config.productionTip = false;

let store = GlobalStore();

/* eslint-disable no-new */
new Vue({
    el: '#app',
    store,
    components: { App },
    template: '<App/>',
});
