<script setup lang="ts"></script>
<template>
  <div class="box">首页</div>
  >

  <router-link to="/index/children1">子路由1</router-link>
  <router-view />
</template>
<style lang="scss" scoped>
.box {
  color: red;
}
</style>
