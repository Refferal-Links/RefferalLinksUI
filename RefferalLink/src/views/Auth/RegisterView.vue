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
          <el-form-item label="" prop="ldPassport">
            <el-input v-model="state.oldPassport" placeholder="Hộ chiếu cũ" />
          </el-form-item>
          <el-form-item label="" prop="phoneNumber">
            <el-input v-model="state.phoneNumber" placeholder="Số Điện Thoại" />
          </el-form-item>
          <el-form-item label="" prop="email">
            <el-input v-model="state.email" placeholder="Email" />
          </el-form-item>
          <el-form-item label="" prop="Job">
            <el-input v-model="state.job" placeholder="Công việc" />
          </el-form-item>
          <el-form-item label="" prop="DateOfBirth">
            <el-date-picker
              v-model="state.dateOfBirth"
              type="date"
              placeholder="Pick a day"
              format="DD/MM/YYYY"
              value-format="DD/MM/YYYY"
            >
              <template #default="cell">
                <div class="cell" :class="{ current: cell.isCurrent }">
                  <span class="text">{{ cell.text }}</span>
                </div>
              </template>
            </el-date-picker>
          </el-form-item>
          
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
            <el-select v-model="state.source" placeholder="Nguồn">
              <el-option
                v-for="item in (hasSaleRole ? sourceSale: source)"
                :key="item"
                :label="item"
                :value="item"
              >
                {{ item }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">Xác Nhận</el-button>
          </el-form-item>
        </el-form>
        <el-dialog v-model="dialogVisible" title="Error">
          <p>Hộ Chiếu Này Đã Tồn Tại</p>
          <el-button type="primary" @click="dialogVisible = false"
            >OK</el-button
          >
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
import router from "@/router";
import Cookies from 'js-cookie';
import type { LoginResult } from "@/Models/LoginResult";
const dialogVisible = ref(false);
const hasSaleRole = ref<boolean>(false);
const state = reactive<RegisterViewModel>({
  name: "",
  phoneNumber: "",
  email: "",
  refferalCode: "",
  provinceId: "",
  passport: "",
  oldPassport: "",
  dateOfBirth: "",
  source: "",
  job: "",
});
const route = useRoute();
const decodedToken = ref<LoginResult>({
    userName: "",
    roles: [],
    refferalCode: "",
    token: "",
    teamId: "",
    tpBank: "",
});
const userRoles = ref<string[]>();
async function register() {
  console.log(state);
  const code = route.params.Code;
  state.refferalCode = code.toString();
  const result = await handleRegister(state);
  console.log("logresult:" + result);
  if (!result.isSuccess) {
    dialogVisible.value = true;
  } else {
    router.push("/CustomerLink/" + result.data?.id);
  }
}

interface Province {
  id: string;
  name: string;
}

const provinceData = ref<Province[]>([]);
const source = ref<string[]>([
  "Tự khai thác",
  "AutoCall",
  "SMS",
  // "Tư vấn viên",
]);
const sourceSale = ref<string[]>([
  // "Tự khai thác",
  // "AutoCall",
  // "SMS",
  "Tư vấn viên",
]);
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
function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
fetchProvinceData();
function getCode(){
    var token = Cookies.get('accessToken')?.toString();

    var jsonString = Cookies.get('Roles')?.toString() ?? '';
    var jsonObject = JSON.parse(jsonString);
    var arrayFromString = Object.values(jsonObject);
    decodedToken.value.roles = arrayFromString as string[];
    console.log(decodedToken.value);
    userRoles.value = decodedToken.value?.roles ?? [];
    hasSaleRole.value = hasPermission(userRoles.value as string[], ["Sale"]);
}
getCode();
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
