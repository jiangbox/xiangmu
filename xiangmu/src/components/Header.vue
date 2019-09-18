<template>
  <div>
    <div class="Header" v-if="ss">
      <i class="el-icon-arrow-left" v-if="left" @click="fan()"></i>
      <span v-if="city" class="ciname">{{ info.name }}</span>

      <span class="cit" v-if="spc">
        <router-link to="/show" style="color:white;">切换城市</router-link>
      </span>

      <div class="one" v-if="ele">
        <span>ele.me</span>
      </div>
      <router-link to="/login">
        <div class="two" v-if="login" v-show="this.checked == false">
          <span>登陆|注册</span>
        </div>
        <div class="two" v-if="login" v-show="this.checked == true">
          <i class="el-icon-user" id="ico"></i>
        </div>
      </router-link>
      <router-link to="/search">
        <i class="el-icon-search" v-if="searc"></i>
      </router-link>

      <span class="adr" v-if="title">{{this.address.name}}</span>
      <slot name="a"></slot>
      <router-link to="/login">
        <i class="el-icon-user" id="ico" v-if="use"></i>
      </router-link>
      <i class="el-icon-arrow-left" v-if="l" id="bi" @click="fan()"></i>
      <span class="sos" v-if="sos">搜索</span>
    </div>
    <slot name="my"></slot>
    <slot name="User"></slot>
    <slot name="adres"></slot>
    <slot name="a"></slot>
    <slot name="search-adress"></slot>
    <slot name="shoplist"></slot>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Header",
  props: [
    "left",
    "city",
    "spc",
    "ele",
    "login",
    "searc",
    "title",
    "use",
    "sos",
    "l",
    "ci",
    "loginPass",
    "ss"
  ],
  data() {
    return {
      info: "",
      name: "",
      geohash: "",
      addressName: "",
      checked: "",
      address: {}
    };
  },
  mounted() {
    let id = this.$route.query.id;
    this.id = id;
    axios.get("http://elm.cangdu.org/v1/cities/" + id).then(res => {
      this.info = res.data;
      // console.log(this.info);
    });
    let geohash = this.$store.state.geohash;
    // console.log(geohash);
    axios.get("http://elm.cangdu.org/v2/pois/" + geohash).then(res => {
      this.address = res.data;
      // console.log(this.address);
    });

    this.checked = this.$store.state.userInfo.checked;
    // console.log(this.checked);
  },
  created() {
    this.name = this.$route.query.name;
  },
  methods: {
    fan() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.Header {
  position: fixed;
  z-index: 99;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #3792e5;
}
.Header i {
  margin-left: 10px;
  margin-top: 13px;
  font-size: 30px;
  color: white;
}
.Header span {
  margin-top: 7px;
  margin-left: 70px;
  color: white;
  font-size: 30px;
}
.Header .cit {
  display: block;
  margin-top: 15px;
  font-size: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.Header .ciname {
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.Header .one {
  line-height: 60px;
  font-size: 20px;
  width: 70%;
  color: white;
}
.Header .two {
  line-height: 60px;
  font-size: 20px;
  color: white;
}
/* .Header #ico {
  padding-left: 0px;
} */
.Header .adr {
  display: block;
  margin-right: 50px;
  margin-top: 8px;
  color: aliceblue;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.Header .sos {
  margin-right: 200px;
  font-size: 30px;
  color: white;
}
.Header #bi {
  margin-right: 100px;
}
</style>
