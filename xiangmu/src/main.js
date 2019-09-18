// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import store from './store/store.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import Vant from 'vant';
import 'vant/lib/index.css';

import {
  Rate,
  Swipe,
  SwipeItem,
  Switch,
  List,
  TreeSelect,
  Icon
} from 'vant';




Vue.use(ElementUI);
Vue.config.productionTip = false
Vue.use(Vant);
Vue.use(Rate);
Vue.use(Switch);
Vue.use(List);
Vue.use(TreeSelect);
Vue.use(Icon);
Vue.use(Swipe).use(SwipeItem);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  render: h => h(App),
  template: '<App/>'
})
