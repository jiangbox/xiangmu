<template>
  <div class="Login">
    <div class="pasw">
      <i class="el-icon-arrow-left" @click="tiao()"></i>
      <span>密码登录</span>
    </div>
    <div class="kon"></div>
    <div class="conten">
      <section>
        <input type="text" placeholder="账号" v-model="username" />
      </section>
      <div class="a">
        <span v-if="checked==true">
          <input type="password" placeholder="密码" v-model="password" />
        </span>
        <span v-if="checked==false">
          <input type="text" placeholder="密码" v-model="password" />
        </span>
        <span>
          <van-switch
            @change="qie()"
            v-model="checked"
            size="24px"
            active-color="#07c160"
            inactive-color="#f44"
          />
        </span>
      </div>
      <div class="b">
        <input type="text" placeholder="验证码" v-model="captcha_code" />
        <div class="image">
          <img :src="code" alt />
        </div>

        <div class="kan" @click="huan()">
          <p>看不清</p>
          <p>换一张</p>
        </div>
      </div>
    </div>
    <div class="tishi">
      <p>温馨提示：未注册过的账号，登录时将自动注册</p>
      <p>注册过的用户可凭账户密码进行登录</p>
    </div>
    <van-button type="primary" size="large" @click="login">登录</van-button>
    <Foot></Foot>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Foot from "@/components/Foot";
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  name: "Login",
  components: {
    Header,
    Foot
  },
  data() {
    return {
      checked: true,
      code: "",
      username: "",
      password: "",
      captcha_code: "",
      userid: "",
      username: "",
      user_id: ""
    };
  },
  mounted() {
    this.huan();
  },
  methods: {
    huan() {
      axios.post("http://elm.cangdu.org/v1/captchas", {}).then(res => {
        console.log(res);
        if (res.data.code != "") {
          this.code = res.data.code;
        }
      });
    },
    qie() {
      // console.log(this.checked);
    },
    login() {
      axios
        .post("http://elm.cangdu.org/v2/login", {
          username: this.username,
          password: this.password,
          captcha_code: this.captcha_code
        })
        .then(res => {
          console.log(res);
          this.userid = res.data.user_id;
          this.username = res.data.username;

          if (res.data.username != "") {
            let obj = {
              userid: res.data.id,
              username: res.data.username,
              checked: false
            };

            this.$store.commit("login", obj);
          }

          if (res.data.status == 0) {
            if (
              this.username !== "" &&
              this.password !== "" &&
              this.captcha_code !== ""
            ) {
              alert(res.data.message);
            }
          } else {
            this.$router.push({
              path: "/show"
            });
          }
        });
    },
    tiao() {
      this.$router.go(-1);
    }
  }
};
</script>

<style>
.pasw {
  height: 60px;
  width: 100%;
  background-color: #3792e5;
}
.pasw {
  text-align: center;
}
.pasw i {
  float: left;
  line-height: 58px;
  color: white;
  font-size: 35px;
}
.pasw span {
  text-align: center;
  line-height: 55px;
  color: white;
  font-size: 30px;
}
.kon {
  height: 20px;
  width: 100%;
  background-color: #f5f5f5;
}
.conten section input {
  width: 97%;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
  border: solid white 1px;
  color: #757575;
  border-bottom: solid 2px #f5f5f5;
}
.conten .a {
  width: 100%;
  border-bottom: solid 2px #f5f5f5;
}
.conten .a input {
  width: 80%;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
  border: solid white 1px;
  color: #757575;
}
.conten .b {
  width: 100%;
  border-bottom: solid 2px #f5f5f5;
}
.conten .b input {
  width: 70%;
  height: 50px;
  font-size: 20px;
  padding-left: 10px;
  border: solid white 1px;
  color: #757575;
}
.conten .b {
  display: flex;
}
.conten .b div {
  margin-top: 3px;
}
.conten .b .image {
  margin-top: 7px;
}
.tishi {
  background-color: #f5f5f5;
}
.tishi p {
  width: 90%;
  padding: 10px 20px;
  color: red;
}
</style>