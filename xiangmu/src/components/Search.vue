<template>
  <div id="app">
    <Header ss="true" left="true" city="true" spc="true"></Header>
    <div class="hui"></div>
    <div class="in">
      <input type="text" placeholder="输入学校.商务.地址" v-model="content" />
    </div>
    <div class="in">
      <button @click="tijiao()">提交</button>
    </div>
    <div class="di" v-if="content.length==0">
      <p>搜索历史</p>
      <div class="so" v-for="(v,i) in obj" :key="i" @click="add(v,i)">
        <!-- <router-link :to="'/?name='+`${v.name}`"> -->
        <p>{{ v.name }}</p>
        <span>{{ v.address }}</span>
        <!-- </router-link> -->
      </div>
      <div class="shan">
        <p @click="kon()">清除全部</p>
      </div>
    </div>
    <div class="di" v-if="content.length>0">
      <div class="so" v-for="(v,i) in cont" :key="i" @click="add(v,i)">
        <!-- <router-link to="/"> -->
        <p>{{ v.name }}</p>
        <span>{{ v.address }}</span>
        <!-- </router-link> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
export default {
  name: "Search",
  components: {
    Header
  },
  data() {
    return {
      info: "",
      content: "",
      id: "",
      z: false,
      fullname: "",
      cname: "",
      geohash: "",
      cont: [],
      arr: [],
      inf: [],
      obj: []
    };
  },
  methods: {
    tijiao() {
      axios
        .get(
          `http://elm.cangdu.org/v1/pois?type=search&city_id=${this.id}&keyword="${this.content}"`
        )
        .then(res => {
          console.log(res);
          this.cont = res.data;
        });
    },
    add(v, i) {
      // console.log(v);
      this.geohash = v.geohash;
      let addressData = JSON.parse(localStorage.getItem("address")) || [];
      let data = {};
      data.name = v.name;
      data.address = v.address;
      data.geohash = v.geohash;

      this.$router.push({
        path: "/",
        query: { geohash: v.geohash }
      });

      let a = addressData.findIndex(item => {
        return v.name == item.name;
      });

      if (a == -1) {
        addressData.unshift(data);
      } else {
        return false;
      }

      localStorage.setItem("address", JSON.stringify(addressData));

      this.$store.commit("addL", this.geohash);

      let latitude = v.latitude;
      let longitude = v.longitude;
      this.$store.commit("latitude", latitude);
      this.$store.commit("longitude", longitude);
    },
    kon() {
      // this.obj = JSON.parse(localStorage.getItem("address"));
      localStorage.removeItem("address");
      this.obj = [];
      // localStorage.setItem(JSON.stringify(this.obj));
    },
    fan() {
      this.$router.go(-1);
    }
  },
  mounted() {
    let id = this.$route.query.id;
    this.id = id;
    axios.get("http://elm.cangdu.org/v1/cities/" + id).then(res => {
      this.info = res.data;
    });
  },
  created() {
    this.obj = JSON.parse(localStorage.getItem("address"));
    console.log(this.obj);
  }
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
}
html,
body,
div {
  padding: 0;
  margin: 0;
  list-style: none;
}
.is {
  width: 100%;
  height: 60px;
  background: #3792e5;
  display: flex;
}
.iis img {
  margin-top: 13px;
}
.right {
  margin-left: 5px;
  line-height: 55px;
  font-size: 30px;
  color: white;
}
.biej {
  margin: 0 auto;
  line-height: 50px;
}
.biej p {
  font-size: 30px;
  color: #fff;
}
.qie {
  line-height: 60px;
  margin-right: 10px;
  color: #fff;
}
.hui {
  padding-top: 45px;
  width: 100%;
  height: 20px;
  background: #f6f6f6;
}
.in {
  width: 100%;
  height: 45px;
  text-align: center;
  margin-top: 25px;
}
.in input {
  width: 90%;
  height: 45px;
  border-radius: 3px;
  border: solid 1px #e3e3e3;
  outline: none;
  padding-left: 10px;
  font-size: 23px;
}
.in button {
  width: 91%;
  height: 50px;
  font-size: 23px;
  border: none;
  background: #3792e5;
  color: #fff;
}
.di {
  width: 100%;
  background: #f6f6f6;
  height: 100%;
  margin-top: 20px;
}
.di p {
  padding-top: 5px;
  margin: 10px 10px;
}
.so {
  margin-top: 10px;
  width: 100%;
  height: 100px;
  border-top: solid #929292 1px;
  background: #fff;
}
.so p {
  margin-left: 15px;
  padding-top: 10px;
  font-size: 20px;
  font-weight: 600;
  color: #333333;
}
.so span {
  margin-left: 15px;
  color: #d1d1d1;
}
.shan {
  width: 100%;
  height: 100px;
  background: #fff;
  border-top: solid #929292 1px;
}
.shan {
  text-align: center;
  line-height: 50px;
}
.shan p {
  font-size: 25px;
  font-weight: 900;
}
</style>
