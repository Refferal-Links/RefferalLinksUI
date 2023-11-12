
<template>
    <el-row class="login-container">
        <el-col :span="24" class="login-col">
            <div class="grid-content ep-bg-purple">
                <p class="helloRegister">Hello, Friend!</p>
                <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">
                    <el-form-item label="" prop="name">
                        <el-input v-model="state.name" placeholder="Họ Tên" :prefix-icon="User" />
                    </el-form-item>
                    <!-- <el-form-item label="" prop="passport">
                      <el-input v-model="state.passport" placeholder="Hộ Chiếu" />
                  </el-form-item> -->
                    <el-form-item label="" prop="phoneNumber">
                        <el-input v-model="state.phoneNumber" placeholder="Số Điện Thoại" />
                    </el-form-item>
                    <el-form-item label="" prop="email">
                        <el-input v-model="state.email" placeholder="Email" />
                    </el-form-item>
                    <el-form-item label="" prop="cccd">
                        <el-input v-model="state.cccd" placeholder="CCCD" />
                    </el-form-item>
                    <el-form-item label="" prop="refferalCode">
                        <el-input v-model="state.refferalCode" placeholder="Mã Giới Thiệu" />
                    </el-form-item>
                    <el-form-item label="" prop="nameProvice">
                        <el-input v-model="state.nameProvice" placeholder=" nameProvice" />
                    </el-form-item>
                    <!-- <el-form-item label="" prop="nameProvice">
                        <el-select v-model="state.nameProvice" placeholder="Tên Tỉnh" direction="down">
                            <option v-for="province in provinces" :key="province.id" :value="province.name">
                                {{ province.name }}
                            </option>
                        </el-select>
                    </el-form-item> -->


                    <el-form-item>
                        <el-button type="primary" @click="register()">Xác Nhận</el-button>
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
// import axios from 'axios';

// const provinces = await axios.get('/api/Province');

//  Đây sẽ là một mảng các đối tượng, với mỗi đối tượng chứa tên tỉnh và ID
// const provinceList = provinces.data;

// Cập nhật các tùy chọn hộp chọn `nameProvice`
// state.nameProvice = provinceList;
</script>
