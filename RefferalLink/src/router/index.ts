import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LayoutBlank from "../Layouts/LayoutBlank.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import LayoutMenuNgang from "../Layouts/LayoutMenuNgang.vue";
import BankView from "../views/Auth/BankView.vue";
import Campaign from "../views/Auth/Campaign.vue";
import Province from "../views/Auth/Province.vue";
import TeamView from "../views/Auth/TeamView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import UserManagementView from "../views/Auth/UserManagementView.vue";
import HomePageView from "../views/Auth/HomePageView.vue";
import LinkTemplateView from "../views/Auth/LinkTemplateView.vue";
import Cookies from "js-cookie";
import * as jwt from "jsonwebtoken";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LayoutMenuNgang,
      meta: { requiresAuth: true },
      children: [
        {
          path: "",
          component: HomePageView,
        },

        {
          path: "Bank",
          component: BankView,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Campaign",
          component: Campaign,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Province",
          component: Province,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Register/Code=:Code",
          component: RegisterView,
        },
        {
          path: "Team",
          component: TeamView,
          meta: { requiresAuth: true, roles: ["Admin", "superadmin"] },
        },
        {
          path: "Link",
          component: LinkTemplateView,
          meta: { requiresAuth: true, roles: ["Admin", "Sale", "Teamleader", "superadmin"] },
        },
        {
          path: "User",
          component: UserManagementView,
          meta: { requiresAuth: true, roles: ["Admin", "Sale", "superadmin"] },
        },
        // Other routes using default layout...
      ],
    },
    {
      path: "/auth",
      component: LayoutBlank,
      children: [
        {
          path: "/login",
          component: LoginView,
        },
        {
          path: "/register",
          component: RegisterView,
        },
        // Other routes using alternative layout...
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated: boolean = !!Cookies.get('accessToken');
  const userRoles: string[] = getRolesFromToken(Cookies.get('accessToken')?.toString() || '') ??[]; 

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); // Redirect to the login page
  } else if (to.meta.roles && !hasPermission(userRoles, to.meta.roles as string[])) {
    next('/'); // Redirect to the 403 page or handle unauthorized access in another way
    
  } else {
    next(); // Continue to the requested route
  }
  console.log(userRoles);
});

function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
function getRolesFromToken(token: string): string[] | null {
  try {
    var token = Cookies.get('accessToken')?.toString() ?? "";
    const decodedToken = jwt.decode(token ?? '') as TokenPayload;
    console.log(decodedToken);
    return decodedToken.Roles || [];
  } catch (error) {
    console.error(error);
    return null;
  }
}
interface TokenPayload {
  [x: string]: never[];
}
export default router;
