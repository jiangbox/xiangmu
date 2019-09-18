import Vue from 'vue';
import Vuex from 'vuex';
import VuePersist from 'vuex-persist'
Vue.use(Vuex);

const vuexLocal = new VuePersist({
  storage: window.localStorage
})

const store = new Vuex.Store({
  state: {
    //用户id
    userInfo: {
      userid: "",
      username: "",
      checked: false,
      avatar: ""
    },
    BuyCar: [],
    addressInfo: [],
    //经纬度
    geohash: "",
    latitude: "",
    longitude: "",
    food: "",
    sum: 0

  },
  //异步
  actions: {

  },
  //同步改变state方法
  mutations: {
    addL(state, v) {
      state.geohash = v;
    },
    login(state, v) {
      state.userInfo = v;

      if (state.userInfo.userid.length != 0) {
        state.userInfo.checked = true;
      } else if (state.userInfo.userid.length == 0) {
        state.userInfo.checked = false;
      }
    },
    latitude(state, v) {
      state.latitude = v;
      console.log(state.latitude);
    },
    longitude(state, v) {
      state.longitude = v;
      console.log(state.longitude);
    },
    food(state, v) {
      if (v != "") {
        state.food = v
      } else {
        alert('不为空');
        return false;
      }

    },
    cun(state, v) {
      if (v != []) {
        state.addressInfo = v
      } else {
        alert('不为空');
        return false;
      }
    },
    upAvatar(state, v) {
      state.userInfo.avatar = v;
    },
    Konlogin(state) {
      this.state.userInfo = {
        checked: false
      };
      this.state.addressInfo = "";
      this.state.geohash = "";
      this.state.latitude = "",
        this.state.longitude = "",
        this.state.food = ""
    },
    Buyshop(state, obj) {

      let index = state.BuyCar.findIndex(item => {
        return item.Name == obj.ShopName;
      });
      if (index == -1) {
        state.BuyCar.unshift({
          Id: obj.ShopId,
          Name: obj.ShopName,
          Price: obj.ShopPrice,
          Category_id: obj.ShopCategory_id,
          num: 0
        });
      } else {
        state.BuyCar[index].num++;
      }
    },
    add(state, i) {
      state.BuyCar[i].num++;
    },
    jianadd(state, i) {
      if (state.BuyCar[i].num > 0) {
        state.BuyCar[i].num--;
      } else {
        return false;
      }
    },
    del(state) {
      state.BuyCar = [];
    },

    Buysum(state, v) {
      state.sum = v;


    }

  },
  //计算属性
  getters: {

  },
  plugins: [vuexLocal.plugin]
})

export default store;
