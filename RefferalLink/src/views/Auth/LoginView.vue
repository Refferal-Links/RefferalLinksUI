<template>
  <div class="Content">
    <el-form ref="ruleFormRef" :model="state" status-icon label-width="px" class="demo-ruleForm">

      <el-form-item label="" prop="username">
        <el-input v-model="state.userName" placeholder="User name" />
      </el-form-item>

      <el-form-item label="" prop="pass">
        <el-input v-model="state.password" type="password" placeholder="PassWord" autocomplete="off" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="login()">Sign In</el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="dialogVisible" title="Error">
      <p>Invalid password. Please try again.</p>
      <el-button type="primary" @click="dialogVisible = false">OK</el-button>
    </el-dialog>
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
import { ElMessageBox } from 'element-plus'

const dialogVisible = ref(false)
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}

const login = async () => {
  const loginResult = await handleLogin(state);
  if (!loginResult.isSuccess) {
    dialogVisible.value = true;
  } else {
    window.location.href = '/Bank';
  }
}

const onInvalidLogin = () => {
  ElMessageBox.confirm('Invalid password. Please try again.')
    .then(() => {
      dialogVisible.value = false;
    })
    .catch(() => {
      // catch error
    })
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