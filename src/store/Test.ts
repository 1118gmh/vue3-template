import { defineStore } from "pinia";
import { Names } from "./store_namespace"

type Result = {
  current: number,
  age: number
}

const Set = (): Promise<Result> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        current: 10,
        age: 20
      })
    }, 2000)
  })
}
export const useTestStore = defineStore(Names.Test, {
  state: () => {
    return {
      current: 1,
      age: 10
    }
  },
  // getters类似于computed的作用，多对一
  getters: {
    // 箭头函数中无this，通过第一个参数state来调用
    newCurrent: (state) => {
      return state.current + state.age
    },
    // 普通函数可以直接使用this
    newValue(): number {
      return this.age + this.current
    }
  },
  actions: {
    setCurrent() {
      // 可以通过this直接修改值
      this.current++;
    },
    async setCurrentAync() {
      const res = await Set()
      this.current = res.current
      this.age = res.age
    }
  }
})