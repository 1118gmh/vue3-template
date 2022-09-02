<script setup lang="ts">
import imgList from '@/assets/imgList'
import { ref } from 'vue';
import {useRouter} from 'vue-router'
const router = useRouter()
console.log(imgList)
const count = ref(0)
const progress = ref('0')
const GetPercent = (num:number, total:number)=>{
    if (isNaN(num) || isNaN(total)) {
        return "-";
    }
    return total <= 0 ? "0%" : (Math.round(num / total * 10000) / 100.00)+"%";
}
imgList.forEach(img => {
  let image = new Image();
  image.onload = ()=>{
    count.value ++
    progress.value = GetPercent(count.value,imgList.length)
    console.log(count.value)
    if(count.value >= 8){
        router.push({
            path:'/start'
        })
    }
  }
  image.src = img
})

</script>
<template>
    <div class="loading_wrapper">
        <div class="progress-bar">
            <div class="progress-bg" :style="`width:${progress};`"></div>
        </div>
        <div style="text-align: right;color: white;width: 80%;margin: 0 auto;">加载资源中...</div>
    </div>
</template>
<style lang="scss" scoped>
.loading_wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: #211b1d;
}
.progress-bar{
  width: 80%;
  height: 25px;
  margin: 0 auto;
  margin-top: 45vh;
  overflow: hidden;
  box-sizing: border-box;
  border-radius: 24px;
  background-color: white;
  position: relative;
}
.progress-bg{
  width: 0%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  background-image: linear-gradient(45deg,#00BFFF 0,#00BFFF 25%,#1dfad9 0,#1dfad9 50%,#00BFFF 0,#00BFFF 75%, #1dfad9 75%);
  border-radius: 24px;
  animation: panoramic 20s linear infinite;
  background-size: 20px 20px;
}
@keyframes panoramic{
  to {
    background-position: 200% 0;
  }
}

</style>
