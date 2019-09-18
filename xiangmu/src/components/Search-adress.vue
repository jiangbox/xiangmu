<template>
  <div>
    <Header>
      <div slot="search-adress" class="adress">
        <i class="el-icon-arrow-left" @click="$router.go('-1')"></i>
        <h1>搜索地址</h1>
      </div>
    </Header>
    <div class="sou">
      <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="sch" />
      <van-button
        type="primary"
        style="width:70px;  margin:5px 5px; "
        color="#3792e5"
        @click="add()"
      >确认</van-button>
    </div>
    <div v-if="sch.length!=0">
      <div class="search" v-for="(v,i) in info" :key="i" @click="chuan(i)">
        <p>{{ v.name }}</p>
        <p>{{ v.address }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";
export default {
  name: "Search-adress",
  components: {
    Header
  },
  data() {
    return {
      food: "",
      sch: "",
      zhut: false,
      info: []
    };
  },
  methods: {
    add() {
      axios
        .get(`http://elm.cangdu.org/v1/pois?type=nearby&keyword=${this.sch}`)
        .then(res => {
          this.info = res.data;
        });

      this.zhut = true;
    },
    chuan(i) {
      this.$store.commit("food", this.info[i].name);
      this.$router.push({
        path: "/add"
      });
    }
  }
};
</script>

<style>
.adress {
  display: flex;
  height: 60px;
  width: 100%;
  background-color: #3792e5;
}
.adress i {
  margin-top: 10px;
  color: white;
  font-size: 30px;
}
.adress h1 {
  margin-top: 13px;
  display: block;
  margin-left: 35%;
  color: white;
  font-size: 20px;
}
.sou {
  display: flex;
  padding: 20px 20px;
}
.sou input {
  padding-left: 10px;
  margin-top: 5px;
  height: 45px;
  width: 300px;
  border: solid 1px #f2f2f2;
  border-radius: 3px;
}
.search {
  height: 60px;
  background-color: #f5f5f5;
  color: black;
  border-bottom: solid 2px burlywood;
}
.search p {
  padding-left: 30px;
  padding-top: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>