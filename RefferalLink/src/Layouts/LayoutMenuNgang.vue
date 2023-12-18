<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    background-color="--el-text-color-primary" text-color="#fff" active-text-color="#ffd04b"
                    >
                    <el-menu-item index="1">
                        <el-dropdown>
                            <span class="el-dropdown-link">
                                Danh Sách
                                <el-icon class="el-icon--right">
                                    <arrow-down />
                                </el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="onMenuItemClick('Bank')">Ngân Hàng</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Campaign')" v-if="hasAdminRole">Chiến Dịch</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Province')" v-if="hasAdminRole">Tỉnh Thành</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Team')" v-if="hasAdminRole">Team</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Link')">Liên Kết</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Branch')">Chi nhánh</el-dropdown-item>
                                    <el-dropdown-item divided @click="onMenuItemClick('User')">Quản Lý Người Dùng</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                    <el-menu-item index="2" @click="onMenuItemClick('CustomerLink2')">
                        Khách hàng
                    </el-menu-item>
                    <el-menu-item index="3" @click="onMenuItemClick(`Register`)" v-if="hasSaleRole || hasCSKHRole">
                        Đăng kí
                        
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-dropdown>
                            <el-icon style="margin-right: 8px; margin-top: 1px">
                                <setting />
                            </el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="logout()"><el-icon><SwitchButton /></el-icon>{{decodedToken?.userName}}</el-dropdown-item>
                                    <el-dropdown-item @click="()=>{ showChangePassword = true; }">Đổi mật khẩu</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                </el-menu>
            </el-header>
            <el-aside width="200px"></el-aside>
            <el-main>
                <div>
                    <router-view />
                </div>
            </el-main>
            <el-footer></el-footer>
        </el-container>
    </div>
    <ChangePassword :userName="decodedToken?.userName ?? ''" :openDialog="showChangePassword"
    @close="()=>{ showChangePassword = false; console.log('close'); }"
    ></ChangePassword>
</template>
<style>
.el-menu-demo .el-menu-item:last-child {
    margin-left: auto;
}

.el-header {
    position: relative;
    padding-left: 0px;
    padding-right: 0px;
    background-color: var(--el-text-color-primary);
}

.el-menu-item {
    background-color: var(--el-text-color-primary);
    color: var(--el-menu-hover-bg-color);
}

.el-container {
    height: 700px;
    width: 100%;
}

.el-aside {
    background-color: var(--el-text-color-primary);
}

main.el-main {
    padding: 0px;
}

header.el-header {
    padding: 0;
}

.el-footer {
    background-color: var(--el-text-color-primary);
}

.el-dropdown-link {
    color: var(--el-menu-text-color);
}
a{
    text-decoration: none;
}
</style>  
<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message,SwitchButton, Setting } from '@element-plus/icons-vue'
import router from '@/router';
import Cookies from 'js-cookie';
import ChangePassword from '@/components/ChangePassword.vue';
import type { LoginResult } from '@/Models/LoginResult';
const activeIndex = ref('1')
const activeIndex2 = ref('1')

const token = Cookies.get("accessToken")?.toString() ?? "";
const decodedToken = ref<LoginResult>({
    userName: "",
    roles: [],
    refferalCode: "",
    token: "",
    teamId: "",
    tpBank: "",
});
const userRoles = ref<string[]>();
const hasTeamleaderRole = ref<boolean>(false);
const hasSaleRole = ref<boolean>(false);
const hasCSKHRole = ref<boolean>(false);
const hasAdminRole = ref<boolean>(false);
const showChangePassword = ref<boolean>(false);
interface TokenPayload {
    Roles: string[];
  }
// const handleSelect = (key: string, keyPath: string[]) => {
//     console.log(key, keyPath)
//     if (key === '2') {
//         window.location.href = "";
//     }
//     else if(key==='3')
//     window.location.href = "";
// }


function getCode(){
    var token = Cookies.get('accessToken')?.toString();
    decodedToken.value.userName = Cookies.get('UserName')?.toString();
    decodedToken.value.refferalCode = Cookies.get('RefferalCode')?.toString();
    decodedToken.value.teamId = Cookies.get('TeamId')?.toString();
    decodedToken.value.tpBank = Cookies.get('TpBank')?.toString();

    var jsonString = Cookies.get('Roles')?.toString() ?? '';
    var jsonObject = JSON.parse(jsonString);
    var arrayFromString = Object.values(jsonObject);
    decodedToken.value.roles = arrayFromString as string[];
    console.log(decodedToken.value);
    userRoles.value = decodedToken.value?.roles ?? [];
    hasTeamleaderRole.value = hasPermission(userRoles.value as string[], ["Teamleader"]);
    hasSaleRole.value = hasPermission(userRoles.value as string[], ["Sale"]);
    hasAdminRole.value = hasPermission(userRoles.value as string[], ["Admin", "superadmin"]);
    hasCSKHRole.value = hasPermission(userRoles.value as string[], ["CSKH"]);
}
getCode();
const onMenuItemClick = (item: string) => {
    if(item =='Register'){
        router.push(`${item}/Code=${decodedToken.value.refferalCode}`);
    }
   else{
    router.push(`${item}`);
   }
}
function logout() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  }
  window.location.href = "/login";
}
function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
</script>