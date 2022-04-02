<script lang="ts" setup>
import { useTestStore } from "@/store/Test";
import { storeToRefs } from "pinia";
const Test = useTestStore();
// 解构使用storeToRefs，否则会失去响应式
const { current, age } = storeToRefs(Test);
const Add = () => {
  // 修改值
  // 1. 直接修改
  // Test.current++;
  // 2. 通过$patch
  // Test.$patch({
  //   current: 200,
  //   age: 100,
  // });
  // Test.$patch((state) => {
  //   state.age++;
  //   state.current++;
  // });
  //3. 通过$state
  // Test.$state = {
  //   current: 10,
  //   age: 20,
  // };
  // 4. 通过actions中方法
  // Test.setCurrent();

  Test.setCurrentAync();
};
</script>

<template>
  <div>登录</div>
  <button @click="Add">增加</button>
  <div>Test.current:{{ Test.current }}</div>
  <div>current:{{ current }}</div>
  <div>age:{{ age }}</div>
  <div>getter newCurrent:{{ Test.newCurrent }}</div>
</template>
