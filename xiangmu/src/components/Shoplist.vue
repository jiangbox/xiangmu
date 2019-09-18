<template>
  <div class="shoplist">
    <Header>
      <div slot="shoplist" class="shop">
        <span>
          <a href="#">商品</a>
        </span>
        <span>
          <a href="#">评价</a>
        </span>
      </div>
    </Header>

    <div class="one" ref="menuwrapper">
      <div class="all">
        <ul
          v-for="(v,index) in info"
          :key="index"
          class="men-item"
          :class="{'current':currentIndex === index}"
          @click="selectMenu(index)"
          v-cloak
        >
          <li>
            <a v-cloak>
              <span>
                <img
                  :src="'https://fuss10.elemecdn.com/5/da/3872d782f707b4c82ce4607c73d1ajpeg.jpeg'"
                />
              </span>
              {{ v.name }}
            </a>
          </li>
        </ul>
      </div>
      <div ref="foodwrapper" class="all2">
        <div class="ell">
          <div class="food-list food-list-hook" v-for="(item,index) in info" :key="index">
            <div class="hot">
              <h1 :class="{'current':currentIndex === index}">{{ item.name }}</h1>
              <span>{{ item.description}}</span>
              <span style="font-size:30px; padding-left:70px; margin-top:-1px;">...</span>
            </div>
            <div class="image" v-for="(v,i) in item.foods" :key="i">
              <img :src="'//elm.cangdu.org/img/'+v.image_path" />
              <div class="ner" style="width:220px;">
                <div class="cont">
                  <h3>{{ v.name }}</h3>
                  <span class="a" style="display:block;">{{ v.description }}</span>
                  <span class="b">月销{{v.month_sales}}份</span>
                  <span class="b">好评率{{v.satisfy_rate}}%</span>

                  <p class="money">
                    ￥{{v.specfoods[0].price}}
                    <span>起</span>
                  </p>
                  <p v-show="v.oldPrice" class="old">${{ v.oldPrice }}</p>
                </div>
              </div>
              <div style="padding-top:70px;">
                <button @click="jia(item,v,i)" class="an">+</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height:50px;"></div>
    <div class="ship">
      <van-button type="primary" @click="showPopup()" style="background:#3d3d3f; padding-top:50px;">
        <i class="iconfont icongouwuche" ref="icon">
          <van-icon name="shopping-cart" color="white" size="50px" style="top:7px;" />
        </i>
      </van-button>
      <van-popup v-model="show" position="bottom" :style="{ height: '20%'}" class="biao">
        <div class="xia">
          <h3 style="color:#727272">购物车</h3>
          <span @click="del()">
            <van-icon name="delete" color="#c1c1c1" size="30px" style="top:7px;" />
            <span>清空</span>
          </span>
        </div>

        <div class="tiao" v-for="(v,i) in shopp" :key="i">
          <h1>{{ v.Name }}</h1>
          <p>
            <span
              style="color:#ff6600; font-weight: bold; font-size:25px; padding-right:60px;"
            >${{ v.Price }}</span>
            <button style="color:white font-size:20px;" class="jia" @click="jianum(i)">+</button>
            <span style="color:#6d6d6d">{{ v.num }}</span>
            <button style="color:#3190e8" class="jian" @click="jiannum(i)">-</button>
          </p>
        </div>
      </van-popup>
      <div class="shipping">
        <div>
          <h3 style="font-size:20px;">￥{{ this.sum }}.00</h3>
          <h6>配送价￥5</h6>
        </div>
      </div>
      <h2 ref="sercha">还差￥20起送</h2>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header";
import axios from "axios";
import jq from "jquery";
export default {
  name: "shoplist",
  components: {
    Header
  },
  data() {
    return {
      log: "",
      ii: "",
      sum: 0,
      sum1: 0,
      zt: false,
      info: [],
      infoson: [],
      listHeight: [],
      shopp: [],
      Buyshop: [],
      scrollY: 0,
      currentIndex: 0,
      show: false
    };
  },
  mounted() {
    let shopId = this.$route.query.id;
    axios
      .get("http://elm.cangdu.org/shopping/v2/menu?restaurant_id=" + shopId)
      .then(res => {
        console.log(res);
        this.info = res.data;
        this.$nextTick(() => {
          this._calculateHeight(); //初始化所有li的高度，把每个li应该滚动应该滚动的高度放进一个数组里
        });
      });
    this.$refs.foodwrapper.addEventListener("scroll", this._initScroll);
    this.shopp = this.$store.state.BuyCar;
    this.sum = this.$store.state.sum;
  },
  created() {
    this.sum = this.$store.state.sum;
    console.log(this.sum);
  },
  methods: {
    selectMenu(index) {
      this.currentIndex = index;
      // this.$refs.foodwrapper.scrollTop = this.listHeight[index];
      this.$refs.foodwrapper.removeEventListener("scroll", this._initScroll);

      jq(this.$refs.foodwrapper).animate(
        { scrollTop: this.listHeight[index] },
        300
      );
      this.$refs.foodwrapper.addEventListener("scroll", this._initScroll);
    },
    _initScroll() {
      let scrollY = this.$refs.foodwrapper.scrollTop;
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i];                           
        let height2 = this.listHeight[i + 1];
        if (!height2 || (scrollY >= height1 && scrollY < height2)) {
          this.currentIndex = i;
          return;
        }
      }
      this.currentIndex = 0;
    },
    _calculateHeight() {
      let foodList = this.$refs.foodwrapper.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      //把第一个高度送入数组
      this.listHeight.push(height);
      //通过循环foodList下的dom结构，将每一个li的高度依次送入数组
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight;
        this.listHeight.push(height);
      }
    },
    showPopup() {
      this.show = true;
    },
    jia(item, v, i) {
      // console.log(this.info[i].id);
      // console.log(this.info[i].name);
      // console.log(this.info[i].foods[i].specfoods[0].price);
      // console.log(this.info[i].foods[i].category_id);
      let obj = {
        ShopId: item.id,
        ShopName: v.name,
        ShopPrice: v.specfoods[0].price,
        ShopCategory_id: v.category_id,
        num: 0
      };
      this.$store.commit("Buyshop", obj);
      this.shopp = this.$store.state.BuyCar;
      // this.$store.commit("Buysum");
      let sum = 0;
      for (let i in this.shopp) {
        if (this.shopp[i].Id == obj.ShopId) {
          sum += parseInt(this.shopp.Price) * this.shopp.num;
          console.log(sum);
        }
      }
      console.log(sum);
      this.$store.commit("Buysum", sum);
      this.sum = this.$store.state.sum;
    },
    jianum(i) {
      this.$store.commit("add", i);
    },
    jiannum(i) {
      this.$store.commit("jianadd", i);
    },
    del() {
      this.$store.commit("del");
    }
  }
};
</script>

<style scoped>
.tiao {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.tiao h1 {
  color: #666666;
  padding: 6px 20px;
}
.jia {
  width: 20px;
  height: 20px;
  background: #3190e8;
  padding-top: -5px;
  color: white;
  font-size: 13px;
  border-radius: 50%;
  border: 1px solid #3190e8;
}
.jian {
  width: 20px;
  height: 20px;
  padding-top: -5px;

  background: white;
  font-size: 13px;
  border-radius: 50%;
  border: 1px solid #3190e8;
}
.tiao p {
  padding-top: 8px;
  padding-right: 20px;
}
.xia {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  background-color: #eceff1;
}
.xia h3 {
  font-size: 23px;
  padding: 6px 20px;
}
.xia span {
  padding-right: 10px;
}
.xia span span {
  color: #6e6e6e;
  font-size: 20px;
  left: 5px;
}
ul,
li {
  list-style: none;
}
.shoplist {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
}
.shop {
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-around;
  border-bottom: solid 1px #f5f5f5;
}
.shop span {
  margin-top: 22px;
  font-size: 20px;
  display: block;
}
.shop a {
  color: black;
  height: 25px;
  display: block;
  text-align: center;
  width: 40px;
}
.shop a:hover {
  color: #3792e5;
  border-bottom: solid 1px #3792e5;
}
.one {
  flex: 1;
  overflow-y: hidden;
  display: flex;
}
.all2 {
  overflow-y: auto;
}
.one ul {
  background-color: #f5f5f5;
  width: 110px;
  height: 70px;
  border-top: solid 0.5px #ededed;
  border-bottom: solid 0.5px #ededed;
}
.one ul li a {
  color: #666666;
  display: block;
  line-height: 50px;
  padding-top: 7px;
  height: 70px;
  font-size: 20px;
  padding-left: 10px;
}
.one ul li a img {
  height: 20px;
  width: 20px;
}
.one ul li a:hover {
  border-left: solid 4px #3190e8;
  background-color: white;
  font-weight: bold;
}
.hot {
  display: flex;
  height: 70px;
  width: 380px;
  background-color: #f5f5f5;
}
.hot h1 {
  margin: 15px 10px;
  font-size: 25px;
  color: #666666;
}
.hot span {
  margin-top: 27px;
  font-size: 14px;
  color: #999999;
}
.ell .image {
  height: 140px;
  border-bottom: solid 1px #f5f5f5;
}
.ell .image img {
  width: 40px;
  height: 40px;
  padding: 30px 20px;
}
.ell .image {
  display: flex;
}
.cont {
  padding-top: 25px;
}
.food-list food-list-hook .cont h3 {
  padding-left: 5px;
}
.food-list food-list-hook .cont .a {
  color: #666666;
  padding-left: 6px;
  display: block;
}
.food-list food-list-hook .cont span {
  margin-top: 5px;
}
.food-list food-list-hook .cont .money {
  color: #ff6600;
  font-weight: bold;
  padding-top: 5px;
  font-size: 20px;
}
.food-list food-list-hook .cont .money span {
  font-size: 15px;
  color: black;
}
.money {
  color: #ff6600;
  font-size: 25px;
}
.money span {
  color: black;
  font-size: 9px;
}
.a {
  color: #999999;
}
.ship {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 60px;
  background: rgb(62, 62, 65);
  color: white;
}
.shipping {
  margin-top: 10px;
  margin-left: 100px;
}
.ship h2 {
  width: 200px;
  height: 100%;
  background: #535356;
  text-align: center;
  line-height: 60px;
  margin-left: 88px;
}
/* .ship h3 {
  width: 200px;
  height: 100%;
  background: #4cd964;
  text-align: center;
  line-height: 60px;
  margin-left: 88px;
} */
.icongouwuche {
  width: 60px;
  height: 60px;
  background: #3190e8;
  color: white;
  font-size: 5px;
  display: block;
  border-radius: 50%;
  text-align: center;
  position: absolute;
  bottom: 1px;
  left: 20px;
  border: 6px solid #3d3d3f;
}
.an {
  width: 20px;
  height: 20px;
  background: #3190e8;
  top: -5px;
  color: white;
  font-size: 13px;
  border-radius: 50%;
  border: 1px solid #3190e8;
  padding-top: -17px;
  margin-top: 15px;
}
van-popup {
  color: black;
}
</style>