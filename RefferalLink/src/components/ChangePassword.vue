<template>
  <el-dialog
    :model-value="openDialog"
    class="form-dialog"
    width="30%"
    @close="emit('onCloseClicked')"
  >
    <p>Tài khoản : {{ props.userName }}</p>
    <el-input
      placeholder="Mật khẩu cũ"
      v-model="passwordUser.initialPassword"
    />
    <el-input placeholder="Mật khẩu mới" v-model="passwordUser.newPassword" />
    <el-button type="primary" @click="handleSave()">Save</el-button>
  </el-dialog>
</template>
<script setup lang="ts">
import { defineProps, ref, onMounted, onUnmounted, watch } from "vue";
import { axiosInstance } from "../Services/axiosConfig";
import type { AppResponse } from "@/Models/Dtos/AppResponse";
const props = defineProps<{
  userName: string;
  openDialog: boolean;
}>();
class change {
  email: string | undefined;
  initialPassword: string | undefined;
  newPassword: string | undefined;
}
const passwordUser = ref<change>({
  email: props.userName,
  newPassword: "",
  initialPassword: "",
});
const emit = defineEmits<{
  (e: "onCloseClicked"): void;
}>();

async function handleSave() {
  passwordUser.value.email = props.userName;
  let resust: AppResponse<string> = {
    isSuccess: false,
    message: "",
    data: "",
  };
  var respone = (
    await axiosInstance.put("/Account/changePassword", passwordUser.value)
  ).data;
  resust = respone;
  if (resust.isSuccess)
  {
    alert("OK");
  } else {
    alert(resust.message);
  }
}
</script>
