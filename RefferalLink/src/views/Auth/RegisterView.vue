<template>
    <el-row class="login-container">
        <el-col :span="24" class="login-col">
            <div class="grid-content ep-bg-purple">
                <p class="helloRegister">Hello, Friend!</p>
                <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">
                    <el-form-item label="" prop="name">
                        <el-input v-model="state.name" placeholder="Họ Tên" />
                    </el-form-item>
                    <el-form-item label="" prop="passport">
                      <el-input v-model="state.passport" placeholder="Hộ Chiếu" />
                  </el-form-item>
                    <el-form-item label="" prop="phoneNumber">
                        <el-input v-model="state.phoneNumber" placeholder="Số Điện Thoại" />
                    </el-form-item>
                    <el-form-item label="" prop="email">
                        <el-input v-model="state.email" placeholder="Email" />
                    </el-form-item>
                    <el-form-item label="" prop="cccd">
                        <el-input v-model="state.cccd" placeholder="CCCD" />
                    </el-form-item>
                    <!-- <el-form-item label="" prop="refferalCode">
                        <el-input v-model="state.refferalCode" placeholder="Mã Giới Thiệu" />
                    </el-form-item> -->
                    <!-- <el-form-item label="" prop="nameProvince">
                        <el-input v-model="state.nameProvince" placeholder="Tên Tỉnh" />
                    </el-form-item> -->
                    <el-form-item>
                        <el-select v-model="state.nameProvince" placeholder="Tên Tỉnh">
                        <el-option v-for="item in provinceData" :key="item.id" :label="item.name" :value="item.id">
                            {{ item.name }}
                        </el-option>
                        <el-option v-if="!provinceData.length">
                            Đang tải dữ liệu tỉnh thành phố...
                        </el-option>
                    </el-select>
                    </el-form-item>
                    

                    <el-form-item>
                        <el-button type="primary" @click="register()">Xác Nhận</el-button>
                    </el-form-item>

                </el-form>
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
// @ts-ignore
import { RegisterViewModel } from '../../Models/RegisterViewModel.ts';

// @ts-ignore
import { handleRegister } from '../../Services/RegisterService.ts';
import { useToast } from "vue-toastification";

const _toast = useToast();
const state = reactive<RegisterViewModel>({
    name: "",
    passport: "",
    phoneNumber: " ",
    cccd: "",
    email: " ",
    refferalCode: "",
    nameProvince: "",
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

interface Province {
    id: string;
    name: string;
}

import axios from 'axios';
const provinceData = ref<Province[]>([]);
async function fetchProvinceData() {
    try {
        const response = await axios.get('https://localhost:7292/api/Province');
        if (response.status === 200) {
            provinceData.value = response.data;
        } 
        else {
            console.error('Không thể lấy dữ liệu tỉnh thành phố');
        }
    } catch (error) {
        console.error(error);
    }
}
fetchProvinceData();
</script>