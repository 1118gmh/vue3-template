<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useRouter} from 'vue-router'
import {debounce} from '@/utils/debounce'
import axios from 'axios';
import uncheckedBoyImg from '@/assets/uncheckedBoy.png'
import uncheckedGirlImg from '@/assets/uncheckedGirl.png'
import checkedBoyImg from '@/assets/checkedBoy.png'
import checkedGirlImg from '@/assets/checkedGirl.png'

const router = useRouter()

const isShowCommit = ref(false)
// 问题
const ary = ref([])
// 当前索引
const currentIndex = ref(0)
// 结果数组
const result = ref<string[]>([])

const boyImg = ref(uncheckedBoyImg)
const girlImg = ref(uncheckedGirlImg)

const tip = ref('')

const gender = ref('')
const isMask = ref(false)
const clickMask = () => {
    isMask.value = false
}
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
    sessionStorage.setItem('sex',gender.value)
    if(gender.value === ''){
        tip.value = '请选择性别'
        const timer = setTimeout(()=>{
            tip.value = ''
            clearTimeout(timer)
        },1000)
        return
    }
    axios.post("https://nanguimi.zhenxinzhenyi.cn/api/testing/answer",{
        sex: sessionStorage.getItem('sex'),
        data: sessionStorage.getItem('data'),
        platv:2
    }).then((res)=>{
        console.log(res)
        if(res.data.code === 0){
            sessionStorage.setItem('bgImg',res.data.data.img)
            sessionStorage.setItem('osn',res.data.data.osn)
            router.push({
                path: "/finish"
            })
        }else {
            console.log('error')
        }
    })

}
// 点击上一题
const answerPrevious = ()=>{
  if(currentIndex.value === 0){
    return
  }
  currentIndex.value -= 1
}

const answerSelect = debounce((e)=>{
  if(e.target.getAttribute("data_id")){
    result.value[currentIndex.value] = e.target.getAttribute("data_id")
    if(currentIndex.value === ary.value.length-1){
      console.log(result.value)
      isShowCommit.value = true
      return
    }
    currentIndex.value += 1
  }
},200)
const answerCommit = ()=>{
  console.log(result.value.join('|'))
  sessionStorage.setItem('data',result.value.join('|'))
  isMask.value = true
  
}
onMounted(()=>{
  axios.get("https://nanguimi.zhenxinzhenyi.cn/api/testing/question?platv=2").then(res=>{
    ary.value = res.data.data
  })
  // 页面加载重置
  currentIndex.value = 0
  result.value = []
  isShowCommit.value = false
  const data = sessionStorage.getItem('data')
  if(data){
    result.value = data.split('|')
    currentIndex.value = result.value.length-1
    isShowCommit.value = true
  }
})
</script>
<template>
    <div class="answer_swiper">
        <div class="answer_container">
            <section class="answer_qustion">
                <span>{{ary[currentIndex]}}</span>
                <div class="answer_previous" @click="answerPrevious">上一题</div>
                <div class="answer_progress">{{Number(currentIndex)+1}}/{{ary.length}}</div>
            </section>
            <section class="answer_select" @click="answerSelect">
                <div class="answer-item" data_id="5" :class="result[currentIndex]=='5'?'active':''">非常同意</div>
                <div class="answer-item" data_id="4" :class="result[currentIndex]=='4'?'active':''">比较同意</div>
                <div class="answer-item" data_id="3" :class="result[currentIndex]=='3'?'active':''">差不多同意</div>
                <div class="answer-item" data_id="2" :class="result[currentIndex]=='2'?'active':''">一点点同意</div>
                <div class="answer-item" data_id="1" :class="result[currentIndex]=='1'?'active':''">不同意</div>
            </section>
            <div class="answer_commit" @click="answerCommit" :style="isShowCommit?'':'display:none;'">
                <img src="@/assets/commit.png" alt="" style="width: ;100%;height:100%;">
            </div>

        
      </div>
      <div class="gender_box" :style="isMask?'display: flex;':'display: none;'">
        <span class="gender_title">恭喜！完成评测！</span>
        <span class="gender_letter">请按照真是性别选择，影响测试结果</span>
        <div class="gender_select">
            <img :src="boyImg" alt="" class="gender_unchecked_girl" @click="checkedBoy">
            <img :src="girlImg" alt="" class="gender_unchecked_girl" @click="checkedGirl">
        </div>
        <div class="gender_look" @click="look">查看报告</div>
        <div style="color: #f56c6c;font-size:3vw;">{{tip}}</div>
    </div>
    <div class="finish_mask" :style="isMask ? 'display:block;' : 'display:none;'" @click="clickMask"></div>
    </div>
</template>
<style lang="scss" scoped>
.finish_mask {
    z-index: 98;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.4);
}

.answer_swiper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(../assets/answer.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #211b1d;
  position: relative;
}
.answer_container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 7vw;
  color: white;
}
.imgbg {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(@/assets/commit.png);
  background-position: bottom;
  background-repeat: no-repeat;
  background-size: 100%;
}
.answer_commit {
  width: 100vw;
  height: 18vw;
}
.answer_qustion {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 65vw;
  margin-top: 7vw;
  padding: 15vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.answer_previous {
    position: absolute;
    bottom: 22px;
    left: 20px;
    font-size: 16px;
}
.answer_progress {
    position: absolute;
    bottom: 22px;
    right: 20px;
    font-size: 16px;
}
.answer_select {
  width: 88%;
  margin-top: 7vw;
}
.answer-item {
  width: 100%;
  height: 10vw;
  border-radius: 2vw;
  background-color: #233135;
  margin: 3vw 0;
  line-height: 10vw;
  font-size: 16px;
  color: white;
  cursor:pointer;
}
.answer-item:active {
  background-color: #1efad5;
  color: white;
}

.active {
  background-color: #1efad5;
  color: white;
}
.gender_box {
  z-index: 99;
    position: absolute;
    top: 50%;
    left: 10vw;
    transform: translateY(-35vw);
    width: 80vw;
    height: 70vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #233334;
    border-radius: 10vw;
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
