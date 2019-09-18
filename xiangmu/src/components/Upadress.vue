<template>
  <div>
    <Header>
      <div slot="adres" class="adres">
        <i class="el-icon-arrow-left" @click="$router.go('-1')"></i>
        <h1>编辑地址</h1>
        <span @click="update()" v-if="dian == false">编辑</span>
        <span @click="finish()" v-if="dian == true">完成</span>
      </div>
    </Header>
    <div class="add" v-for="(v,i) in add" :key="i">
      <p>{{ v.address }}</p>
      <p>{{ v.phone }}</p>
      <span v-if="dian == true" @click="del(i,v.id)">X</span>
    </div>
    <div class="shop">
      <router-link to="/add">
        <span>新增地址</span>
        <i class="el-icon-arrow-right"></i>
      </router-link>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";
export default {
  name: "Upadress",
  data() {
    return {
      dian: false,
      userid: "",
      add: []
    };
  },
  methods: {
    update() {
      this.dian = true;
    },
    finish() {
      this.dian = false;
    },
    del(i, id) {
      axios
        .delete(`http://elm.cangdu.org/v1/users/38384/addresses/${id}`)
        .then(res => {
          console.log(res);
          if (res.data.success) {
            this.add.splice(i, 1);
          }
        });
    }
  },
  mounted() {
    this.userid = this.$store.state.userInfo.userid;
    axios
      .get(`http://elm.cangdu.org/v1/users/${this.userid}/addresses`)
      .then(res => {
        this.add = res.data;
        this.$store.commit("cun", this.add);
      });
  }
};
</script>

<style>
.adres {
  height: 60px;
  width: 100%;
  background-color: #3792e5;
  display: flex;
  justify-content: space-between;
}
.adres i {
  padding-top: 10px;
  font-size: 30px;
  color: white;
}
.adres h1 {
  color: white;
  padding-top: 5px;
}
.adres span {
  font-size: 20px;
  color: white;
  padding-right: 10px;
  padding-top: 13px;
}
.add {
  margin-top: 10px;
  height: 50px;
  width: 100%;
  background-color: antiquewhite;
}
.shop {
  margin-top: 20px;
  height: 50px;
  width: 100%;
  border-top: solid 1px #f5f5f5;
  border-bottom: solid 1px #f5f5f5;
}
.shop i {
  line-height: 50px;
  font-size: 20px;
  float: right;
  color: #d2d2d2;
}
.shop span {
  line-height: 50px;
  padding-left: 20px;
}
.add span {
  float: right;
  margin-top: -30px;
  margin-right: 10px;
}
</style>