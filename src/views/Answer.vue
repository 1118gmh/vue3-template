<script setup lang="ts">
import { onMounted, ref } from 'vue';
import {useRouter} from 'vue-router'
import {debounce} from '@/utils/debounce'
import axios from 'axios';

// import {useTestStore} from '../store/Test'
// const Test = useTestStore()

const router = useRouter()

const isShowCommit = ref(false)
// 问题
const ary = ref([])
// 当前索引
const currentIndex = ref(0)
// 结果数组
const result = ref<string[]>([])
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
      // router.push({
      //   path: '/finish'
      // })
      return
    }
    currentIndex.value += 1
  }
},200)
const answerCommit = ()=>{
  console.log(result.value.join('|'))
  // Test.data = result.value.join('|')
  sessionStorage.setItem('data',result.value.join('|'))
  // console.log(Test,'Test')
  router.push({
    path: '/gender'
  })
}
onMounted(()=>{
  axios.get("https://nanguimi.zhenxinzhenyi.cn/api/testing/question").then(res=>{
    ary.value = res.data.data
  })
  // 页面加载重置
  currentIndex.value = 0
  result.value = []
  isShowCommit.value = false
})
</script>
<template>
    <div class="answer_swiper">
      <div class="imgbg" :style="isShowCommit?'':'background:none;'">
        <div class="answer_container">
            <section class="answer_qustion">
                <span>{{ary[currentIndex]}}</span>
                <div class="answer_previous" @click="answerPrevious">上一题</div>
                <div class="answer_progress">{{Number(currentIndex)+1}}/{{ary.length}}</div>
            </section>
            <section class="answer_select" @click="answerSelect">
                <div class="answer-item" data_id="1" :class="result[currentIndex]=='1'?'active':''">完全不符合</div>
                <div class="answer-item" data_id="2" :class="result[currentIndex]=='2'?'active':''">比较不符合</div>
                <div class="answer-item" data_id="3" :class="result[currentIndex]=='3'?'active':''">不确定</div>
                <div class="answer-item" data_id="4" :class="result[currentIndex]=='4'?'active':''">比较符合</div>
                <div class="answer-item" data_id="5" :class="result[currentIndex]=='5'?'active':''">完全符合</div>
            </section>
        </div>
        <div class="answer_commit" @click="answerCommit" :style="isShowCommit?'':'display:none;'">

        </div>
      </div>

    </div>
</template>
<style lang="scss" scoped>
.answer_swiper {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url(../assets/answer.jpg);
  background-size: 100%;
  background-repeat: no-repeat;
  background-color: #211b1d;
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
  width: 64vw;
  height: 14vw;
  position: absolute;
  bottom: 8vw;
  left: 50vw;
  transform: translateX(-32vw);
}
.answer_qustion {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 65vw;
  margin-top: 7vw;
  padding: 20px;
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
  width: 100%;
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
</style>
