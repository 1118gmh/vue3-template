<script setup lang="ts">
import uncheckedBoyImg from '@/assets/uncheckedBoy.png'
import uncheckedGirlImg from '@/assets/uncheckedGirl.png'
import checkedBoyImg from '@/assets/checkedBoy.png'
import checkedGirlImg from '@/assets/checkedGirl.png'
import { ref } from 'vue';
import {useRouter} from 'vue-router'

// import {useTestStore} from '../store/Test'
// const Test = useTestStore()

const router = useRouter()

const boyImg = ref(uncheckedBoyImg)
const girlImg = ref(uncheckedGirlImg)

const tip = ref('')

const gender = ref('')
// 跳转answer页
const checkedBoy = ()=>{
    boyImg.value = checkedBoyImg
    girlImg.value = uncheckedGirlImg
}
const checkedGirl = ()=>{
    boyImg.value = uncheckedBoyImg
    girlImg.value = checkedGirlImg
}
const look = ()=>{
    if(boyImg.value === checkedBoyImg){
        gender.value = '1'
    }else if(girlImg.value === checkedGirlImg) {
        gender.value = '2'
    }else {
        gender.value = ''
    }
    // Test.sex = gender.value
    sessionStorage.setItem('sex',gender.value)
    if(gender.value === ''){
        tip.value = '请选择性别'
        const timer = setTimeout(()=>{
            tip.value = ''
            clearTimeout(timer)
        },1000)
        return
    }
    router.push({
        path: "/finish"
    })
}
</script>
<template>
<div class="gender_wrapper">
    <div class="gender_box">
        <span class="gender_title">恭喜！完成评测！</span>
        <span class="gender_letter">请按照真是性别选择，影响测试结果</span>
        <div class="gender_select">
            <img :src="boyImg" alt="" class="gender_unchecked_girl" @click="checkedBoy">
            <img :src="girlImg" alt="" class="gender_unchecked_girl" @click="checkedGirl">
        </div>
        <div class="gender_look" @click="look">查看报告</div>
        <div style="color: #f56c6c;font-size:3vw;">{{tip}}</div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.gender_wrapper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: #140f2e;
}
.gender_box {
    width: 80vw;
    height: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #233334;
    border-radius: 10vw;
    margin: 0 auto;
    margin-top: 55vw;
}
.gender_title {
  font-size: 5vw;
  font-weight: 600;
  color: #cefffb;
  margin-top: 6vw;
}
.gender_letter {
  font-size: 4vw;
  font-weight: 500;
  color: #cefffb;
  margin-top: 2vw;
}
.gender_select {
    width: 50vw;
    height: 25vw;
    display: flex;
    // background: blue;
    margin-top: 5vw;
}
.gender_unchecked_boy {
    width: 25vw;
    height: 25vw;
}
.gender_unchecked_girl {
    width: 25vw;
    height: 25vw;
}
.gender_look {
    width: 50vw;
    height: 10vw;
    background-color: #1bf8df;
    font-size: 4.2vw;
    font-weight: 600;
    text-align: center;
    line-height: 10vw;
    border-radius: 5vw;
    margin-top: 2vw;
}
</style>
