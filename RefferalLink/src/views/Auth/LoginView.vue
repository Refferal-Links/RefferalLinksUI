<template>
    <div class="Content">
      <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">
  
        <el-form-item label="" prop="username">
          <el-input v-model="state.userName" placeholder="User name" />
        </el-form-item>
  
        <el-form-item label="" prop="pass">
          <el-input v-model="state.password" type="password" placeholder="PassWord" autocomplete="off" />
        </el-form-item>
        <el-form-item label="" prop="email">
          <el-input v-model="state.email" placeholder="Email" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login()" >Sign In</el-button>
        </el-form-item>
      </el-form>
    </div>
  </template>
  <script setup lang="ts">
import { Calendar, Search, User, Key } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
// @ts-ignore
import { LoginViewModel } from '../../Models/LoginViewModel.ts'

// @ts-ignore
import { handleLogin } from "../../Services/LoginService.ts"
//import { useToast } from "vue-toastification";

//const _toast = useToast();
const state = reactive<LoginViewModel>({
  userName: '',
  password: '',
  email: '',
  role:''
});
const login = async () => {
  console.log(state);
  const loginResult = await handleLogin(state);
  console.log("logresult:" + loginResult);
  if (loginResult.isSuccess)
    window.location.href = '/Bank';
  //else
   // _toast.success(loginResult.message);
}
</script>
  <style>
  /* .el-input{
      height:30px;
    } */
  .el-form-item {
    width: 500px;
  }
  
  /* .el-form{
      margin: 145px;
    } */
  .Content {
    width: 100%;
    height: 550px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  main.el-main {
    background-color: white;
  }
  body{
    margin: 0px;
  }
  </style>