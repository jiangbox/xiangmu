<template>
  <div id="app">
    <!-- <router-view/> -->
    <transition name="fosition">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.fosition-enter-active,
.fosition-leave-active {
  transition: opacity.6s;
}
.fosition-enter,
.fosition-leave-to {
  opacity: 0;
}
</style>
