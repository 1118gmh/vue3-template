<script setup lang="ts">
import { onMounted, ref } from 'vue';
const resultImg = ref('')
onMounted(()=>{
  const img = localStorage.getItem('img')
  if(img !== null){
    resultImg.value = img
  }
})
</script>
<template>
<div class="result_wrapper">
    <img :src="resultImg" alt="" class="result_img">
</div>
</template>
<style lang="scss" scoped>
.start_wrapper {
  width: 100vw;
}
.result_img {
    width: 100%;
}
</style>