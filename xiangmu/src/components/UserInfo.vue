<template>
  <div class="UserInfo">
    <Header>
      <div slot="User" class="top">
        <i class="el-icon-arrow-left"></i>
        <span>账户信息</span>
      </div>
    </Header>
    <div class="kon"></div>
    <div class="head">
      <span>头像</span>
      <div class="img">
        <input type="file" class="upload" @change="uploadAvatar" ref="inp" />
        <img
          v-if="this.$store.state.userInfo.avatar"
          :src="'//elm.cangdu.org/img/'+this.$store.state.userInfo.avatar"
        />
        <img
          data-v-008f1529
          data-v-0fc4ab7a
          src="//elm.cangdu.org/img/default.jpg"
          class="privateImage"
          v-else
        />
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="shop">
      <span>用户名</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <router-link to="/upad" style="color:black;">
      <div class="shop">
        <span>收货地址</span>
        <i class="el-icon-arrow-right"></i>
      </div>
    </router-link>
    <div class="bd">
      <span>账号绑定</span>
    </div>
    <div class="shop">
      <span>手机</span>
      <i class="el-icon-arrow-right"></i>
    </div>
    <div class="bd">
      <span>安全设置</span>
    </div>
    <div class="shop1">
      <span>登陆密码</span>
      <div class="a">
        修改
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
    <div class="kon"></div>
    <van-button type="primary" size="large" style="background-color:red" @click="tui()">退出登录</van-button>
  </div>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";
export default {
  name: "UserInfo",
  data() {
    return {
      info: "",
      userid: "",
      avatar: "",
      userInfo: []
    };
  },
  mounted() {
    this.userid = this.$store.state.userInfo.userid;
    this.userInfo = this.$store.state.userInfo;

    axios
      .get(`http://elm.cangdu.org/v1/user?user_id=${this.userid}`)
      .then(res => {
        console.log(res);
        this.info = res.data;
      });
  },
  methods: {
    uploadAvatar() {
      // 选择了具体文件的时候，会触发change 事件
      console.log(this.userInfo);
      let input = this.$refs.inp;
      console.log(input.files[0]);
      // formData 数据类型来保存文件
      let data = new FormData();
      data.append("file", input.files[0]);
      //修改请求头 content-type类型
      let headers = { headers: { "Content-Type": "multipart/from/data" } };
      axios
        .post(
          `http://cangdu.org:8001/eus/v1/users/${this.userid}/avatar`,
          data,
          { headers: { "Content-Type": "multipart/from/data" } }
        )
        .then(res => {
          console.log(res);
          if (res.data.image_path != "") {
            this.$store.commit("upAvatar", res.data.image_path);
            this.userInfo.avatar = res.data.image_path;
          }
        });
    },
    tui() {
      axios.get("http://elm.cangdu.org/v2/signout").then(res => {
        console.log(res);
      });
      this.$store.commit("Konlogin");
    }
  }
};
</script>

<style>
.top {
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #3792e5;
}
.top i {
  margin-top: 10px;
  color: white;
  font-size: 30px;
}
.top span {
  margin-top: 13px;
  display: block;
  margin-left: 35%;
  color: white;
  font-size: 20px;
}
.kon {
  width: 100%;
  height: 10px;
  background-color: #f5f5f5;
}
.head {
  height: 80px;
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
  border-bottom: solid 1px #f5f5f5;
}
.head span {
  margin-top: 20px;
  margin-left: 20px;
}
.head .img {
  margin-right: 10px;
  display: flex;
}
.head img {
  border-radius: 50%;
  height: 70px;
  width: 70px;
}
.head .img i {
  margin-top: 20px;
  font-size: 30px;
  color: #f5f5f5;
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
.bd {
  height: 50px;
  background-color: #f5f5f5;
  color: black;
}
.bd span {
  display: block;
  padding: 12px 15px;
}
.shop1 {
  margin-top: 20px;
  height: 40px;
  width: 100%;
  border-bottom: solid 2px #f5f5f5;
}
.shop1 .a {
  font-size: 20px;
  float: right;
  color: #d2d2d2;
}
.shop1 span {
  padding-left: 20px;
}
.upload {
  width: 80%;
  /* margin-left: 90px; */
  float: right;
  position: absolute;
  opacity: 0;
}
</style>