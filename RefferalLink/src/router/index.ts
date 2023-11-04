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
import Cookies from 'js-cookie';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: LayoutMenuNgang,
      meta: { requiresAuth: true }, 
      children: [
        {
          path: '',
          component:LoginView,
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
        // Other routes using default layout...
      ],
    },
    {
      path: '/auth',
      component: LayoutBlank,
      children: [
        {
          path: '/login',
          component: LoginView,
        },
        {
          path: '/register',
          component: RegisterView,
        },
        // Other routes using alternative layout...
      ],
    },
  ]
});
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!Cookies.get('accessToken');
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to the login page
  } else {
    next(); // Continue to the requested route
  }
});
export default router
