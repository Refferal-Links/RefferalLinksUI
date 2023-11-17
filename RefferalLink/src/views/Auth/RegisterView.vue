<template>
  <el-row class="login-container">
    <el-col :span="24" class="login-col">
      <div class="grid-content ep-bg-purple">
        <p class="helloRegister">Hello, Friend!</p>
        <el-form
          ref="ruleFormRef"
          :model="state"
          status-icon
          label-width="px"
          class="demo-ruleForm"
        >
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
          <!-- <el-form-item label="" prop="refferalCode">
                        <el-input v-model="state.refferalCode" placeholder="Mã Giới Thiệu" />
                    </el-form-item> -->
          <!-- <el-form-item label="" prop="nameProvince">
                        <el-input v-model="state.nameProvince" placeholder="Tên Tỉnh" />
                    </el-form-item> -->
          <el-form-item>
            <el-select v-model="state.provinceId" placeholder="Tên Tỉnh">
              <el-option
                v-for="item in provinceData"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                {{ item.name }}
              </el-option>
              <el-option v-if="!provinceData.length">
                Đang tải dữ liệu tỉnh thành phố...
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="register">Xác Nhận</el-button>
          </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible" title="Error">
      <p>Hộ Chiếu Này Đã Tồn Tại</p>
      <el-button type="primary" @click="dialogVisible = false">OK</el-button>
    </el-dialog>
      </div>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
// @ts-ignore
import { RegisterViewModel } from "../../Models/RegisterViewModel.ts";

// @ts-ignore
import { handleRegister } from "../../Services/RegisterService.ts";
import { axiosInstance } from "../../Services/axiosConfig";
import { useRoute } from "vue-router";
const dialogVisible = ref(false)
const state = reactive<RegisterViewModel>({
  name: "",
  phoneNumber: "",
  email: "",
  refferalCode: "",
  provinceId: "",
  passport: "",
});
const route = useRoute();
async function register() {
  console.log(state);
  const code = route.params.Code;
  state.refferalCode = code.toString();
  const loginResult = await handleRegister(state);
  console.log("logresult:" + loginResult);
  if (!loginResult.isSuccess) {
    dialogVisible.value = true;
  } else {
    window.location.href = '/CustomerLink';
  }
}

interface Province {
  id: string;
  name: string;
}

const provinceData = ref<Province[]>([]);
async function fetchProvinceData() {
  try {
    const response = await axiosInstance.get("Province");
    if (response.status === 200) {
      console.log(response.data.data);
      provinceData.value = response.data.data;
    } else {
      console.error("Không thể lấy dữ liệu tỉnh thành phố");
    }
  } catch (error) {
    console.error(error);
  }
}
fetchProvinceData();
</script>
<style>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.grid-content {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    width: 500px;
    margin-left: 30%;
    margin-top: 5%;
}

.helloRegister {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
</style>