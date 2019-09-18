<template>
  <div class="Cheackout">
    <span>{{ this.bb }}</span>
    <button @click="gai()">点</button>
    <router-link to="/header">跳转</router-link>
    <button>+</button>
  </div>
</template>
<script>
import jq from "jquery";
export default {
  name: "Cheackout",
  data() {
    return {
      bb: "22"
    };
  },
  methods: {
    gai() {
      this.bb = 11;
    }
  },
  mounted() {
    console.log(this.bb);
  },
  created() {
    console.log(this.bb);
  },
  beforeUpdate() {
    console.log("update");
  },
  beforeDestroy() {
    console.log("destory");
  },
  destroyed() {
    console.log("destroyed");
  }
};
</script>

<style>
</style>