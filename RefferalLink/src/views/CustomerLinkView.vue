
<template>
    <el-row class="login-container">
        <el-col :span="24" class="login-col">
            <div class="grid-content ep-bg-purple">
                <p class="helloRegister">Hello, Friend!</p>
                <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">
                    <el-form-item label="" prop="name">
                        <el-input v-model="state.name" placeholder="Họ Tên" :prefix-icon="User" />
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
    </el-row>
</template>
  
<script setup lang="ts">
import { Calendar, Search, User, Key } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
// @ts-ignore
import { RegisterViewModel } from '../../Models/RegisterViewModel.ts'

// @ts-ignore
import { handleRegister } from "../../Services/RegisterService.ts"
import { useToast } from "vue-toastification";


const _toast = useToast();
const state = reactive<RegisterViewModel>({
    name: "",
    passport: "",
    phoneNumber: " ",
    cccd: "",
    email: " ",
    refferalCode: "",
    nameProvice: "",
});
const register = async () => {
    console.log(state);
    const loginResult = await handleRegister(state);
    console.log("logresult:" + loginResult);
    if (loginResult.isSuccess) {
        window.location.href = '/';
    }
    else
        _toast.success(loginResult.message);
}
</script>
