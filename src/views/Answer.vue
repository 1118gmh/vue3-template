<script setup lang="ts"></script>
<template>
    <div class="answer_swiper">
        <div class="answer_container">
            <section class="answer_qustion">
                <span>所有的罪名，让我最讨厌的是欺骗发送到发的说法</span>
                <div class="answer_previous">上一题</div>
                <div class="answer_progress">1/27</div>
            </section>
            <section class="answer_select">
                <div class="answer-item">完全不符合</div>
                <div class="answer-item">比较不符合</div>
                <div class="answer-item">不确定</div>
                <div class="answer-item">比较符合</div>
                <div class="answer-item">完全符合</div>
            </section>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.answer_swiper {
  width: 100vw;
  height: 100vh;
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
  padding: 1.4rem;
  color: #d4ccff;
}
.answer_qustion {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 240px;
  margin-top: 50px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
}
.answer_previous {
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 16px;
}
.answer_progress {
    position: absolute;
    bottom: 20px;
    right: 20px;
    font-size: 16px;
}
.answer_select {
  width: 100%;
  margin-top: 50px;
}
.answer-item {
  width: 100%;
  height: 2rem;
  border-radius: 0.3rem;
  background-color: #25fcbc;
  margin: 0.5rem 0;
  line-height: 2rem;
  font-size: 0.8rem;
  color: black;
}
.answer-item:active {
  background-color: green;
  color: white;
}
</style>
