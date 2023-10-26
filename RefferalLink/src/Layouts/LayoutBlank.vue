<template>
    <div class="common-layout">
        <el-container>
            <el-aside width="400px"></el-aside>
            <el-main>
                <div>
                    <router-view />
                </div>
            </el-main>
        </el-container>
    </div>
</template>
<style>
.el-container {
    background-color: var(--el-color-primary-light-7);
    width: 1200px;
    Height: 500px;
}

.el-aside {
    background-color: var(--el-text-color-primary);
}
</style>
  