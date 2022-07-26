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
  background-image: url(../assets/single.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #211b1d;
}
.single_no {
  width: 150px;
  height: 230px;
  position: absolute;
  top: 340px;
  left: 47px;
}
.single_yes {
  width: 150px;
  height: 230px;
  position: absolute;
  top: 340px;
  left: 215px;
}
</style>
