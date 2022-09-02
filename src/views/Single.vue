<script setup lang="ts">
import {useRouter} from 'vue-router'
const router = useRouter()
// 跳转answer页
const singleNoAnswer = ()=>{
  router.push({
    path: "/answer"
  })
}
const singleYesAnswer = ()=>{
  router.push({
    path: "/answer"
  })
}
</script>
<template>
<div class="single_wrapper">
  <div class="single_no" @click="singleNoAnswer"></div>
  <div class="single_yes" @click="singleYesAnswer"></div>
</div>
</template>
<style lang="scss" scoped>
.single_wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(../assets/single.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #211b1d;
}
.single_no {
  width: 35vw;
  height: 55vw;
  position: absolute;
  top: 82vw;
  left: 12vw;
}
.single_yes {
  width: 35vw;
  height: 55vw;
  position: absolute;
  top: 82vw;
  right: 12vw;
}
</style>
