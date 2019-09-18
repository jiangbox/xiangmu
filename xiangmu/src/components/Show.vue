<template>
  <div>
    <Header ss="true" ele="true" login="true"></Header>
    <div class="zi">
      <ul>
        <li>
          <span>当前定位城市：</span>
        </li>
        <li class="xi">
          <h4>定位不准时,请在城市列表中选择</h4>
        </li>
      </ul>
    </div>
    <div class="bj">
      <ul>
        <router-link to="/search">
          <li class="a">
            <span>{{ this.name }}</span>
          </li>
        </router-link>
        <li>
          <span>
            <i class="el-icon-arrow-right"></i>
          </span>
        </li>
      </ul>
    </div>
    <div class="kon"></div>
    <div class="city">
      <span>热门城市</span>
    </div>
    <div class="city1">
      <ul>
        <li v-for="(v,i) in hot" :key="i">
          <router-link :to="'/search?id='+`${v.id}`" style="color: #3792e5;">{{ v.name }}</router-link>
        </li>
      </ul>
    </div>
    <div class="kon"></div>
    <div class="group">
      <div class="abc">
        <ul class="group1">
          <li v-for="(value,key) in groupaa" :key="key">
            <p>
              {{key}}
              <span>（按字母排序）</span>
            </p>
            <div class="group2">
              <div v-for="item in value" :key="item">
                <router-link :to="'/search?id='+`${item.id}`" style="color: black;">{{item.name}}</router-link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header";
export default {
  name: "Show",
  components: {
    Header
  },
  data() {
    return {
      name: "",
      id: "",
      hot: [],
      group: []
    };
  },
  computed: {
    // 将获取的数据按照A-Z字母开头排序
    groupaa() {
      let sortobj = {};
      for (let i = 65; i <= 90; i++) {
        // this.groupcity请求回来的数据
        if (this.group[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.group[String.fromCharCode(i)];
        }
      }
      // console.log(sortobj);
      return sortobj;
    }
  },
  mounted() {
    // axios.get("http://elm.cangdu.org/v1/cities?type=group").then(res => {
    //   //   for (let i in res.data) {
    //   //     for (let k in res.data[i]) {
    //   //       this.info = res.data[i][k];
    //   //       console.log(this.info);
    //   //     }
    //   //   }
    //   console.log(res);
    // });
    axios.get("http://elm.cangdu.org/v1/cities?type=guess").then(res => {
      console.log(res);
      this.name = res.data.name;
    });
    axios.get("http://elm.cangdu.org/v1/cities?type=hot").then(res => {
      this.hot = res.data;
      this.id = res.data.id;
      // console.log(res);
    });
    axios.get("http://elm.cangdu.org/v1/cities?type=group").then(res => {
      // console.log(res);
      this.group = res.data;
    });
  }
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}
ul,
li,
a {
  list-style: none;
  text-decoration: none;
}
.top {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-around;
  background-color: #3792e5;
}

.zi {
  padding-top: 60px;
  width: 100%;
  line-height: 70px;
  border-bottom: solid #e4e4e4 1px;
}
.zi ul {
  display: flex;
  justify-content: space-around;
}
.zi ul li {
  display: block;
  margin-right: 10px;
  margin-left: 10px;
}
.xi {
  color: #b9b9b9;
}
.bj {
  border-bottom: solid #e4e4e4 3px;
}
.bj span {
  margin-right: 30px;
  font-size: 30px;
}
.bj ul {
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.a span {
  font-size: 30px;
  color: #3792e5;
}
.bj ul li {
  color: #e4e4e4;
  display: block;
  margin-right: 10px;
  margin-left: 10px;
}
.bj ul li span {
  margin-left: 50px;
}
.kon {
  width: 100%;
  height: 20px;
  background-color: #f4f4f4;
}
.city {
  border-top: solid #e4e4e4 3px;
}
.city span {
  line-height: 40px;
  margin-left: 10px;
  color: #616161;
}
.city1 {
  width: 100%;
}
.city1 ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.city1 ul li {
  display: block;
  text-align: center;
  line-height: 40px;
  width: 24.5%;
  height: 45px;
  color: #3792e5;
  border: solid #e4e4e4 1px;
}
.group {
  background: #e2e2e2;
}
.group1 {
  margin-top: 17px;
  background: white;
}
.group1 li p {
  width: 94%;
  height: 45px;
  line-height: 45px;
  border: 1px solid silver;
  padding: 0 10px;
}
.group2 {
  display: flex;
  flex-wrap: wrap;
}
.group2 div {
  width: 24.4%;
  height: 50px;
  border: 1px solid #f4f4f4;
  background: white;
  text-align: center;
  line-height: 50px;
}
</style>