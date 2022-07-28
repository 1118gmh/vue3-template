import { defineStore } from "pinia";
import { Names } from "./store_namespace"


export const useTestStore = defineStore(Names.Test, {
  state: () => {
    return {
      sex: '',
      data: ''
    }
  },
  actions: {
  }
})