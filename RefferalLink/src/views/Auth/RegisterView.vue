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
            <el-input v-model="state.passport" placeholder="Căn cước công dân"  maxlength="12"/>
          </el-form-item>
          <el-form-item label="" prop="ldPassport">
            <el-input v-model="state.oldPassport" placeholder="Căn cước công dân cũ" maxlength="9"/>
          </el-form-item>
          <el-form-item label="" prop="phoneNumber">
            <el-input v-model="state.phoneNumber" placeholder="Số Điện Thoại" maxlength="10"/>
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
              placeholder="Ngày sinh"
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
            <el-select
              v-model="state.provinceId"
              clearable
              filterable
              :reserve-keyword="false"
              placeholder="Tỉnh thành"
              :remote-method="remoteMethodProvince"
            >
              <el-option
                v-for="item in provinceDataRef"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="state.source" placeholder="Nguồn">
              <el-option
                v-for="item in ( (hasSaleRole || decodedToken.typeTeam == 'Sale' )? sourceSale: source)"
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
        <el-dialog v-if="dialogVisible == true" title="Error" @close="dialogVisible = false">
          <p>{{ message }}</p>
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
  provinceId: undefined,
  passport: "",
  oldPassport: "",
  dateOfBirth: "",
  source: "",
  job: "",
  tpBank: "",
});
const route = useRoute();
const decodedToken = ref<LoginResult>({
    userName: "",
    roles: [],
    refferalCode: "",
    token: "",
    teamId: "",
    tpBank: "",
    typeTeam: "",
});
const message = ref<string>("");
const userRoles = ref<string[]>();
async function register() {
  console.log(state);
  if(state.passport?.length != 12) {
    alert("căn cước công dân phải đúng 12 kí tự")
    return;
  }
  if(state.oldPassport?.length != 9 && state.oldPassport?.length != 0) {
    alert("căn cước công dân cũ phải đúng 9 kí tự hoặc bỏ trống nếu không có")
    return;
  }
  if(state.phoneNumber?.length != 10) {
    alert("số điện thoại phải đúng 10 kí tự")
    return;
  }
  if(!state.email?.endsWith("@gmail.com")) {
    alert("email phải có đuôi là @gmail.com")
    return;
  }
  const code = route.params.Code;
  const tpBank = route.params.TpBank;
  state.refferalCode = code.toString();
  state.tpBank = tpBank.toString();
  const result = await handleRegister(state);
  console.log("logresult:" + result);
  if (!result.isSuccess) {
    message.value = result.message;
    dialogVisible.value = true;
  } else {
    // const responseData =  result.data;
    // localStorage.setItem('Customer', JSON.stringify(responseData));
    if(state.source == "Khác") {
      router.push("/CustomerLink2");
    }
    else{
      router.push("/CustomerLink/" + result.data?.id);
    }
    
  }
}

interface Province {
  id: string;
  name: string;
}

const provinceDataRef = ref<Province[]>([]);
const source = ref<string[]>([
  // "Tự khai thác",
  "AutoCall",
  "SMS",
  "Tư vấn viên",
]);
const sourceSale = ref<string[]>([
  "Tự khai thác",
  // "AutoCall",
  // "SMS",
  // "Tư vấn viên",
  "Đi thị trường",
  "Khác"
]);
const provinceData = ref<Province[]>([]);
async function fetchProvinceData() {
  try {
    const response = await axiosInstance.get("Province");
    if (response.status === 200) {
      console.log(response.data.data);
      provinceData.value = response.data.data;
      provinceDataRef.value = response.data.data;
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
    decodedToken.value.typeTeam = Cookies.get('TypeTeam')?.toString() ?? '';
}
getCode();
const loading = ref(false);
const remoteMethodProvince = (query: string) => {
  if (query) {
    loading.value = true;
    setTimeout(() => {
      loading.value = false;
      provinceDataRef.value =
        provinceData.value.filter((item) =>
          item.name?.toLowerCase().includes(query.toLowerCase())
        ) ?? [];
    }, 200);
  } else {
    provinceDataRef.value = provinceData.value ?? [];
  }
};

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
@media (max-width: 800px) {
  .grid-content {
    background-color: #f5f5f5;
    padding: 20px;
    border-radius: 10px;
    width: 80%;
    margin-left: 5%;
    margin-top: 5%;
  }
  .el-form-item {
    width: 100%!important;
  }
  }
</style>
