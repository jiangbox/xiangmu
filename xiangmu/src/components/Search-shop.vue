<template>
  <div class="Search-shop">
    <Header ss="true" sos="true" l="true"></Header>
    <div class="padding">
      <div class="search">
        <input type="text" placeholder="请输入商家或商品名称" v-model="nr" />
        <input type="submit" value="提交" @click="refer()" />
      </div>

      <div class="history">
        <h4>搜索历史</h4>
      </div>
    </div>
    <div class="histcont">
      <span>锅</span>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
import Foot from "@/components/Foot";
export default {
  name: "Search-shop",
  components: {
    Header,
    Foot
  },
  data() {
    return {
      nr: "",
      geohash: ""
    };
  },
  created() {
    this.geohash = this.$store.state.geohash;
    console.log(this.geohash);
  },
  methods: {
    refer() {
      console.log(this.geohash);
      axios
        .get(
          `http://elm.cangdu.org/v4/restaurants?extras[]=restaurant_activity&geohash=${this.geohash}&keyword="${this.nr}"&type=search`
        )
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>

<style>
.padding {
  padding-top: 3.6rem;
}
.search {
  width: 92%;
  height: 3rem;
  background: white;
  padding: 1rem 1rem;
}
.search input[type="text"] {
  margin-left: 10px;
  padding-left: 10px;
  width: 310px;
  height: 2.5rem;
  border-radius: 4px;
  border: 1px solid #f4f4f4;
  background: #f4f4f4;
  font-weight: 800;
}
.search input[type="submit"] {
  width: 5.5rem;
  height: 2.5rem;
  background: #3190e8;
  color: white;
  font-weight: 800;
  border: none;
  border-radius: 0.3rem;
}
.history {
  height: 40px;
  background-color: #f5f5f5;
}
.history h4 {
  width: 90%;
  height: 3rem;
  color: #666666;
  line-height: 42px;
  margin-left: 30px;
}
.histcont {
  height: 50px;
  border-bottom: solid 1px #e4e4e4;
}
.histcont span {
  font-size: 20px;
  margin-left: 40px;
  line-height: 47px;
}
</style>