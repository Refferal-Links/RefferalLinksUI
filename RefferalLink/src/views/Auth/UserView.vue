<template>
    <el-scrollbar>
        <el-table :data="tableData">
            <el-table-column prop="date" label="Ngày" width="140" />
            <el-table-column prop="name" label="Họ Và Tên" width="170" />
            <el-table-column prop="update" label="Cập Nhật" width="140" />
            <el-table-column prop="status" label="Trạng Thái" width="140" />
            <el-table-column prop="campaign" label="Chiến Dịch" width="140" />
            <el-table-column prop="more" label="..." />
        </el-table>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'

const item = {
    date: '2016-05-02',
    name: 'Nguyen Thi Nhu Y',
    update: '2023-01-01',
    status: 'pending',
    campaign: "",
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>
  