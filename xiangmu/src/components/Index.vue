<template>
  <div class="Index">
    <Header ss="true" searc="true" title="true">
      <div slot="a">
        <router-link to="/login">
          <div v-show="checked == true">
            <i class="el-icon-user" id="ico"></i>
          </div>
          <div v-show="checked == false" class="lg">
            <span style="font-size: 20px margin-top:10px;">登录|注册</span>
          </div>
        </router-link>
      </div>
    </Header>

    <div class="v">
      <div class="swiper">
        <van-swipe class="aa">
          <van-swipe-item>
            <ul>
              <li v-for="(image, index) in info" :key="index" v-if="index<8">
                <img :src="'https://fuss10.elemecdn.com'+image.image_url" alt />
                <div>{{image.title}}</div>
              </li>
            </ul>
          </van-swipe-item>
          <van-swipe-item>
            <ul>
              <li v-for="(image, index) in info" :key="index" v-if="index>=8">
                <img :src="'https://fuss10.elemecdn.com'+image.image_url" alt />
                <div>{{image.title}}</div>
              </li>
            </ul>
          </van-swipe-item>
        </van-swipe>
      </div>

      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="content" v-for="(v,i) in cont" :key="i" @click="detail(v)">
          <p>附近商家</p>
          <div class="kox">
            <div class="content1">
              <img :src="'//elm.cangdu.org/img/'+v.image_path" />

              <div class="content2">
                <div class="a">
                  <span>品牌</span>
                  <span class="xi">{{ v.name }}</span>
                </div>
                <div class="content3">
                  <span>
                    <van-rate
                      v-model="v.rating"
                      allow-half
                      void-icon="star"
                      void-color="#eee"
                      aria-setsize="1"
                      size="10px"
                    />
                  </span>
                  <span class="star">{{ v.rating }}</span>
                  <span class="month">月售{{ v.recent_order_num }}单</span>
                </div>
                <div class="content4">
                  <span>￥20起送/配送费约￥5</span>
                </div>
              </div>
            </div>
            <div class="all" style="width:200px">
              <div class="bird">
                <span>蜂鸟转送</span>
                <span class="go">准时达</span>
              </div>
              <div class="bird2">
                <span>{{ v.distance }}/</span>
                <span class="mount">{{ v.order_lead_time }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </div>

    <div class="koko"></div>
    <Foot></Foot>
  </div>
</template>

<script>
import Foot from "@/components/Foot.vue";
import Header from "@/components/Header";
import axios from "axios";

export default {
  name: "Index",
  components: {
    Foot,
    Header
  },
  data() {
    return {
      info: [],
      cont: [],
      checked: "",
      userid: "",
      geohash: "",
      latitude: "",
      longitude: "",
      num: 0,
      list: [],
      loading: false,
      finished: false
    };
  },
  mounted() {
    //轮播
    axios
      .get(
        "http://elm.cangdu.org/v2/index_entry?geohash=39.78493,116.49476&group_type=1&flags[]=F"
      )
      .then(res => {
        console.log(res);
        this.info = res.data;
      });

    axios
      .get(
        `http://elm.cangdu.org/shopping/restaurants?latitude='${this.latitude}'&longitude='${this.longitude}'&offset=0&limit=10&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`
      )
      .then(res => {
        console.log(res);
        this.cont = res.data;
      });

    //内容

    this.geohash = this.$route.query;
    console.log(this.geohash);
    this.checked = this.$store.state.userInfo.checked;
    this.latitude = this.$store.state.latitude;
    this.longitude = this.$store.state.longitude;
  },
  methods: {
    onLoad() {
      // 异步更新数据

      setTimeout(() => {
        // 加载状态结束
        this.numof();
        // console.log(this.num);
        this.loading = false;

        // 数据全部加载完成
        if (this.cont.length >= 60) {
          this.finished = true;
        }
      }, 700);
    },
    numof() {
      this.num = this.num + 10;
      console.log(this.num);
      axios
        .get(
          `http://elm.cangdu.org/shopping/restaurants?latitude='${this.latitude}'&longitude='${this.longitude}'&offset=${this.num}&limit=${this.num}&extras[]=activities&keyword=&restaurant_category_id=&restaurant_category_ids[]=&order_by=&delivery_mode[]=`
        )
        .then(res => {
          if (this.cont.length < 60) {
            this.cont = this.cont.concat(res.data);
          }
          console.log(res);
        });
    },
    detail(v) {
      this.$router.push(`/shoplist?id=${v.id}`);
    }
  }
};
</script>

<style>
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
.a {
  margin-top: 5px;
}
.v {
  padding-top: 70px;
}
.swiper {
  height: 220px;
  background: white;
  border-bottom: 1px solid silver;
}
.aa ul {
  display: flex;
  flex-wrap: wrap;
}
.aa ul li {
  width: 25%;
  height: 100px;
  margin: 4px 0px;
}
.aa ul li img {
  width: 45px;
  height: 45px;
  margin-left: 22px;
}
.swiper div {
  text-align: center;
}
.kon {
  height: 20px;
  background-color: #f5f5f5;
}
.content {
  width: 100%;
  border-top: solid 1px #e5e5e5;
}
.content p {
  color: #afafaf;
  padding: 10px 20px;
}
.content1 {
  height: 100%;
  width: 320px;
  display: flex;
}
.content1 img {
  height: 50px;
  width: 50px;
  padding: 10px 10px;
}
.content2 {
  margin-top: 16px;
}
.content2 span {
  font-size: 1px;
  border: solid 1px #fadc48;
  background-color: #fadc48;
}
.a {
  display: flex;
}
.content2 .xi {
  display: block;
  border-radius: 20px white;
  border: solid 1px white;
  background-color: white;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.content2 p span {
  color: #fadc48;
  background-color: white;
}
.content3 {
  display: flex;
  margin-top: 10px;
}

.content3 span {
  padding-top: 5px;
  color: #fadc48;
  font-size: 10px;
  background-color: white;
  border: solid 1px white;
}
.content3 .star {
  line-height: 15px;
}
.content3 .month {
  line-height: 15px;
  color: #999999;
}
.kox {
  height: 150px;
  display: flex;
  justify-content: space-between;
}
.bird {
  height: 90px;
}
.bird span {
  line-height: 125px;
  color: white;
  border-radius: solid 10px #3a91e1;
  background-color: #3a91e1;
}
.bird .go {
  line-height: 125px;
  color: #3a91e1;
  border: solid 1px #3a91e1;
  background-color: white;
}
.content4 {
  margin-top: 13px;
}
.content4 span {
  font-size: 10px;
  color: #666666;
  border-radius: 20px white;
  border: solid 1px white;
  background-color: white;
}
.bird2 span {
  line-height: 5px;
}
.bird2 .mount {
  color: #3792e5;
}
.koko {
  height: 60px;
}
</style>