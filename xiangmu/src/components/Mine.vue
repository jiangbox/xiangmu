<template>
  <div class="Mine">
    <Header>
      <div slot="my" class="tp">
        <i class="el-icon-arrow-left" @click="fan()"></i>
        <span>我的</span>
      </div>
    </Header>
    <div class="content">
      <div class="log2">
        <img :src="'//elm.cangdu.org/img/'+this.info" v-if="this.$store.state.userInfo.avatar" />
        <img
          data-v-008f1529
          data-v-0fc4ab7a
          src="//elm.cangdu.org/img/default.jpg"
          class="privateImage"
          v-else
        />
        <div class="log">
          <h1 v-show="this.checked == false">登陆/注册</h1>
          <h1 v-show="this.checked == true">{{ this.name }}</h1>
          <span v-show="this.checked == false">暂无绑定手机号</span>
          <span v-show="this.checked == true">手机号：15311775870</span>
        </div>
      </div>

      <i class="el-icon-arrow-right" @click="login()"></i>
    </div>
    <div class="wrap">
      <div class="one">
        <h1>
          0.00
          <span>元</span>
        </h1>

        <p>我的余额</p>
      </div>

      <div class="two">
        <h1>
          0
          <span>个</span>
        </h1>

        <p>我的优惠</p>
      </div>
      <div class="three">
        <h1>
          0
          <span>元</span>
        </h1>

        <p>我的积分</p>
      </div>
    </div>
    <div class="kon"></div>
    <div class="List">
      <div class="shop">
        <span>我的订单</span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="shop">
        <span>积分商城</span>
        <i class="el-icon-arrow-right"></i>
      </div>
      <div class="shop">
        <span>饿了么会员卡</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="kon"></div>
    <div class="shop">
      <span>服务中心</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="shop">
      <span>下载饿了么app</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div id="di"></div>
    <Foot></Foot>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Foot from "@/components/Foot";
import axios from "axios";

export default {
  name: "Mine",
  components: {
    Header,
    Foot
  },
  data() {
    return {
      name: "",
      info: "",
      userid: "",
      checked: false
    };
  },
  mounted() {
    // vuex 调取数据
    this.userid = this.$store.state.userInfo.userid;
    this.checked = this.$store.state.userInfo.checked;
    this.name = this.$store.state.userInfo.username;
    this.info = this.$store.state.userInfo.avatar;
  },
  methods: {
    login() {
      if (this.checked == false) {
        this.$router.push({
          path: "/login"
        });
      } else {
        this.$router.push({
          path: "/user"
        });
      }
    },
    fan() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
*,
body {
  margin: 0;
  padding: 0;
}
.tp {
  height: 60px;
  background-color: #3792e5;
}
.tp i {
  margin-top: 12px;
  font-size: 30px;
  color: white;
}
.tp span {
  font-size: 30px;
  margin-top: 15px;
  margin-left: 35%;
  color: white;
}
.content {
  display: flex;
  justify-content: space-between;
  padding-top: -10px;
  background-color: #3792e5;
  height: 135px;
}
.content img {
  border-radius: 50%;
  height: 70px;
  widows: 70px;
  margin: 30px 20px;
}
.log2 {
  display: flex;
}
.log {
  margin-top: 33px;
  color: white;
}
.content i {
  margin-top: 60px;
  color: white;
  font-size: 30px;
}
.wrap {
  height: 75px;
  padding-top: 10px;
  display: flex;
  justify-content: space-around;
}
.wrap .one {
  border-right: solid 2px #f5f5f5;
  width: 28%;
  margin-left: 5px;
}
.wrap .two {
  border-right: solid 2px #f5f5f5;
  width: 28%;
  margin-left: 5px;
}

.wrap .one h1 {
  color: #ff9900;
}
.wrap .one h1 span {
  font-size: 10px;
  color: black;
}
.wrap .two h1 {
  color: #ff5f3e;
}
.wrap .two h1 span {
  font-size: 10px;
  color: black;
}
.wrap .three h1 {
  color: #6ac20b;
}
.wrap .three h1 span {
  font-size: 10px;
  color: black;
}
.kon {
  width: 100%;
  height: 10px;
  background-color: #f5f5f5;
}
.shop {
  margin-top: 20px;
  height: 40px;
  width: 100%;
  border-bottom: solid 2px #f5f5f5;
}
.shop i {
  font-size: 20px;
  float: right;
  color: #d2d2d2;
}
.shop span {
  padding-left: 20px;
}
#di {
  height: 40px;
}
</style>