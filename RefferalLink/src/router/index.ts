import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutBlank from '../Layouts/LayoutBlank.vue'
import LoginView from '../views/Auth/LoginView.vue'
import LayoutMenuNgang from '../Layouts/LayoutMenuNgang.vue'
import UserView from '../views/Auth/UserView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   // name: 'home',
    //   component: Layout1,
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/',
      component: LayoutMenuNgang,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component: UserView,
        },
        {
          path: 'user',
          component:  HomeView,
        },
        // Other routes using default layout...
      ],
    },
  ]
})

export default router
