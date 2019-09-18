import vue from vue;
import vuex from 'vuex';
import store from './store.js';
import VuePersist from 'vuex-persist'
const vuexLocal = new VuexPersist({
  storage: window.localStorage
})
Vue.use(vuex);
export default new vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    store: store
  },

})
