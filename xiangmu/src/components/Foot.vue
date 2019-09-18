<template>
  <div class="Top">
    <div class="Foot">
      <ul>
        <li>
          <router-link to="/">
            <i class="el-icon-eleme"></i>
            <div>外卖</div>
          </router-link>
        </li>

        <li>
          <router-link to="/shop">
            <i class="el-icon-discover"></i>
            <div>搜索</div>
          </router-link>
        </li>

        <li>
          <i class="el-icon-document"></i>
          <div>订单</div>
        </li>

        <li>
          <router-link to="/mine">
            <i class="el-icon-user"></i>
            <div>我的</div>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Foot"
};
</script>

<style >
.Foot {
  width: 100%;
  position: fixed;
  bottom: 0;
}
.Foot ul {
  display: flex;
  justify-content: space-around;
  background-color: white;
}
.Foot ul li {
  display: block;
  width: 25%;
}
.Foot ul li i {
  display: block;
  text-align: center;
}
.Foot ul li div {
  line-height: 30px;
  text-align: center;
}
</style>