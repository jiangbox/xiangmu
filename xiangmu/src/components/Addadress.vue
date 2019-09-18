<template>
  <div>
    <Header>
      <div slot="a" class="compile">
        <i class="el-icon-arrow-left" @click="$router.go('-1')"></i>
        <h3>新增地址</h3>
      </div>
    </Header>
    <div class="kon"></div>

    <div class="inp_new">
      <div>
        <input type="text" placeholder="请填写你的姓名" v-model="username" />
      </div>
      <router-link to="/addDetail">
        <div>
          <input type="text" placeholder="小区/写字楼/学校等" v-model="school" />
        </div>
      </router-link>
      <div class="pos">
        <div>
          <input type="text" placeholder="请填写详细送餐地址" v-model="ardess" />
        </div>
        <div>
          <input type="text" placeholder="请填写能联系到你的手机号" v-model="phone" />
        </div>
        <div>
          <input type="text" placeholder="备用联系电话（备用）" v-model="phone_call " />
        </div>
      </div>
    </div>
    <div class="but">
      <van-button type="primary" size="large" @click="add()">新增地址</van-button>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header";
import axios from "axios";
export default {
  components: { Header },
  data() {
    return {
      school: "",
      ardess: "",
      name: "",
      username: "",
      phone: "",
      phone_you: "",
      phone_call: ""
    };
  },
  mounted() {
    this.school = this.$store.state.food;
  },
  methods: {
    add() {
      axios
        .post(
          `http://elm.cangdu.org/v1/users/${this.$store.state.userInfo.userid}/addresses`,
          {
            address: this.ardess, //请填写详细送餐地址
            address_detail: "北京站",
            geohash: this.$store.state.geohash, //经纬度
            name: this.username, //名字
            phone: this.phone, //手机号
            phone_bk: this.phone_call, //
            poi_type: 0,
            sex: 1,
            tag: "公司",
            tag_type: 4
          }
        )
        .then(res => {
          console.log(res);
          if ((res.data.satus = 0)) {
            alert(res.data.message);
          } else {
            this.$router.push({
              path: "/upad"
            });
          }
        });
    }
  }
};
</script>

<style scope>
.compile {
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #3792e5;
}
.compile i {
  margin-top: 10px;
  color: white;
  font-size: 30px;
}
.compile h3 {
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
.inp_new {
  width: 100%;
  height: 10px;
  background: white;
}
input[type="text"] {
  width: 80%;
  height: 30px;
  background: #f2f2f2;
  margin: 10px 25px;
  padding-left: 10px;
  border: 1px solid silver;
  border-radius: 3px;
}
.but {
  margin-top: 270px;
}
</style>