import {
  createRouter,
  createWebHashHistory,
  RouteLocationNormalized,
} from "vue-router";
import hooks from './hooks'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/start"
    },
    {
      path: "/start",
      name: "Start",
      component: () => import("@/views/Start.vue"),
    },
    {
      path: "/single",
      name: "Single",
      component: () => import("@/views/Single.vue"),
    },
    {
      path: "/answer",
      name: "Answer",
      component: () => import("@/views/Answer.vue"),
    },
    {
      path: "/result",
      name: "Result",
      component: () => import("@/views/Result.vue"),
    },
    {
      path: "/finish",
      name: "Finish",
      component: () => import("@/views/Finish.vue"),
    },
    // {
    //   path: "/index",
    //   name: "Index",
    //   component: () => import("@/views/Index.vue"),
    //   children: [
    //     {
    //       path: "children1",
    //       name: "children1",
    //       component: () => import("@/views/children1/children1.vue"),
    //     },
    //   ]
    // }
  ],
});
Object.values(hooks).forEach(hook => {
  router.beforeEach(hook.bind(router))
})
export default router;
