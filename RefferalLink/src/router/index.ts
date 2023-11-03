import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LayoutBlank from '../Layouts/LayoutBlank.vue'
import RegisterView from '../views/Auth/RegisterView.vue'
import LayoutMenuNgang from '../Layouts/LayoutMenuNgang.vue'
import UserView from '../views/Auth/UserView.vue'
import BankView from '../views/Auth/BankView.vue'
import Campaign from '../views/Auth/Campaign.vue'
import Province from '../views/Auth/Province.vue'
import TeamView from '../views/Auth/TeamView.vue'
import LoginView from '../views/Auth/LoginView.vue'
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
          component: LoginView,
        },
        {
          path: 'Bank',
          component:  BankView,
        },
        {
          path: 'Campaign',
          component:  Campaign,
        },
        {
          path: 'Province',
          component:  Province,
        },
        {
          path: 'Register',
          component:  RegisterView,
        },
        {
          path: 'Team',
          component: TeamView,
        },
        {
          path: 'Login',
          component: LoginView,
        },
        // Other routes using default layout...
      ],
    },
  ]
})

export default router
