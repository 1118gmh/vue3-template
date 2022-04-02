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
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Login",
      component: () => import("@/views/Login.vue"),
    },
    {
      path: "/index",
      name: "Index",
      component: () => import("@/views/Index.vue"),
      children: [
        {
          path: "children1",
          name: "children1",
          component: () => import("@/views/children1/children1.vue"),
        },
      ]
    }
  ],
});
Object.values(hooks).forEach(hook => {
  router.beforeEach(hook.bind(router))
})
export default router;
