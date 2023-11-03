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
                                    <el-dropdown-item @click="onMenuItemClick('')">Ngân Hàng</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Campaign')" >Chiến Dịch</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Province')" >Tỉnh Thành</el-dropdown-item>
                                    <el-dropdown-item @click="onMenuItemClick('Team')" >Team</el-dropdown-item>
                                    <el-dropdown-item>Liên Kết</el-dropdown-item>
                                    <el-dropdown-item divided>Quản Lý Người Dùng</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </el-menu-item>
                    <el-menu-item index="2">Khách Hàng</el-menu-item>
                    <el-menu-item index="3" @click="onMenuItemClick('Register')">Đăng Kí</el-menu-item>
                    <el-menu-item index="4">
                        <el-dropdown>
                            <el-icon style="margin-right: 8px; margin-top: 1px">
                                <setting />
                            </el-icon>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>Đăng Xuất</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                        <span>Admin</span>
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
</style>  
<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
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
const onMenuItemClick = (item: string) => {
    window.location.href = `http://localhost:5173/${item}`;
}


</script>