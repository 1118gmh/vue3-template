<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
// import HelloWorld from "./components/HelloWorld.vue";
</script>

<template>
  <router-link tag="div" to="/login">登录</router-link>
  <router-link to="/index">首页</router-link>

  <router-view></router-view>
</template>

<style>
html,
body {
  margin: 0;
}
</style>
