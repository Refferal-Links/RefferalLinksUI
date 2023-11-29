<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    background-color="--el-text-color-primary" text-color="#fff" active-text-color="#ffd04b"
                    @select="handleSelect">
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
                                    <el-dropdown-item @click="onMenuItemClick('Campaign')" >Chiến Dịch</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Province')" >Tỉnh Thành</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Team')" >Team</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Link')">Liên Kết</el-dropdown-item>
                                    <el-dropdown-item divided @click="onMenuItemClick('User')">Quản Lý Người Dùng</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <router-link to="CustomerLink2">Khách hàng</router-link>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <router-link :to="`Register/Code=${decodedToken.RefferalCode}`">Đăng kí</router-link>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-dropdown>
                            <el-icon style="margin-right: 8px; margin-top: 1px">
                                <setting />
                            </el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item @click="logout()"><el-icon><SwitchButton /></el-icon>{{decodedToken.UserName}}</el-dropdown-item>
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
import { decode,verify } from 'jsonwebtoken';
import Cookies from 'js-cookie';
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
    if (key === '2') {
        window.location.href = "";
    }
    else if(key==='3')
    window.location.href = "";
}
const decodedToken = ref();

function getCode(){
    var token = Cookies.get('accessToken')?.toString();
    decodedToken.value = decode(token ?? '');
    console.log(decodedToken.value);
}
getCode();
const onMenuItemClick = (item: string) => {
    if(item =='Register'){
        router.push(`${item}/Code=${decodedToken.value.RefferalCode}`);
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

</script>