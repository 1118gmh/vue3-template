export default {
  loginGuard: (to: any, from: any, next: any) => {
    // console.log(to)
    // if (to.path === '/login') {
    //   return next()
    // }
    // const tokenStr = localStorage.getItem('token')
    // if (!tokenStr) {
    //   console.log("路由守卫：未登录，跳转登录界面")
    //   return next('/login')
    // }
    next()
  }
}
