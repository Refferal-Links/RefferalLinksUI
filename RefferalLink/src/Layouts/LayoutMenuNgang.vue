<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal"
                    background-color="--el-text-color-primary" text-color="#fff" active-text-color="#ffd04b"
                    @select="handleSelect">
                    <el-menu-item index="1">Danh Sách Ngân Hàng</el-menu-item>
                    <el-menu-item index="2">Danh Sách Chiến Dịch</el-menu-item>
                    <el-menu-item index="3">Danh Sách Liên Kết</el-menu-item>
                    <el-menu-item index="4">Quản Lý Người Dùng</el-menu-item>
                    <el-menu-item index="5">
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
.el-container{
    height:700px;
    width:100%;
}
.el-aside{
    background-color: var(--el-text-color-primary);
}
main.el-main {
    padding: 0px;
}
header.el-header {
    padding: 0;
}
.el-footer{
    background-color: var(--el-text-color-primary);
}
</style>  
<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
const activeIndex = ref('1')
const activeIndex2 = ref('1')
const handleSelect = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>