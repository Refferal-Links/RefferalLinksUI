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
import CustomerLinkView from "../views/CustomerLinkView.vue"
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
        {
          path: "CustomerLink",
          component: CustomerLinkView,
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
          path: "Register/Code=:Code",
          component: RegisterView,
        },
        // Other routes using alternative layout...
      ],
    },
  ],
});
router.beforeEach((to, from, next) => {
  const isAuthenticated: boolean = !!Cookies.get('accessToken');
  const userRoles: string[] = getRolesFromToken(Cookies.get('accessToken')?.toString() || '');

  if(!to.meta.requiresAuth) {
    next('/');
  }
  // Kiểm tra trang đăng nhập
  else if (to.meta.requiresAuth && !isAuthenticated && to.path !== '/auth/Register/Code=:Code') {
    next('/login'); // Chuyển hướng đến trang đăng nhập
  } else if (to.meta.roles && !hasPermission(userRoles, to.meta.roles as string[])) {
    // Xử lý truy cập không được phép
    next('/403'); // Chuyển hướng đến trang 403 hoặc xử lý khác
  } else {
    next(); // Tiếp tục đến trang yêu cầu
  }
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
