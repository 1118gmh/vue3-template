<script lang="ts" setup>
import {useRouter} from 'vue-router'
const router = useRouter()
// 跳转single页
const start = ()=>{
  router.push({
    path: "/single"
  })
}
</script>

<template>

<div class="start_wrapper">
  <div class="start" @click="start"></div>
</div>
</template>
<style lang="scss" scoped>
.start_wrapper {
  width: 100vw;
  height: 100vh;
  background-image: url(../assets/start.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #211b1d;
}
.start {
  width: 38vw;
  height: 38vw;
  position: absolute;
  top: 130vw;
  left: 50vw;
  transform: translateX(-70px);
}
</style>

