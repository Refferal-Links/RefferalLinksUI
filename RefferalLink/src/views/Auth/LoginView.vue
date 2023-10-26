<template>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
    >

    <el-form-item label="" prop="username">
            <el-input v-model="ruleForm.username" placeholder="User name"/>
          </el-form-item>

      <el-form-item label="" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" placeholder="PassWord" autocomplete="off" />
      </el-form-item>
      <el-form-item label="" prop="checkPass">
        <el-input
          v-model="ruleForm.checkPass"
          type="password"
          autocomplete="off"
          placeholder="Confirm "
        />
      </el-form-item>
      <el-form-item label="" prop="email">
        <el-input  v-model="ruleForm.email"  placeholder="Email"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)"
          >Submit</el-button
        >
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  
  const ruleFormRef = ref<FormInstance>()

  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password'))
    } else {
      if (ruleForm.checkPass !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass', () => null)
      }
      callback()
    }
  }
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== ruleForm.pass) {
      callback(new Error("Two inputs don't match!"))
    } else {
      callback()
    }
  }
  
  const ruleForm = reactive({
    username: '',
    pass: '',
    checkPass: '',
    email: '',
  })
  
  const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: 'blur' }],
    checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  })
  
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  </script>
  <style>
  .el-input{
    height:30px;
  }
  .el-form-item {
    width:500px;
  }
  .el-form{
    padding:30px;
  }
</style>