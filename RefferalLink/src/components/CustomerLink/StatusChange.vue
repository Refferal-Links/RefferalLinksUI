<template>
  <el-dialog
    :model-value="openDialog"
    class="form-dialog"
    width="30%"
    @close="emit('onCloseClicked')"
  >
    <div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="customerLink.statusText">
          <el-radio-button label="Pending" />
          <el-radio-button label="Approved" />
          <el-radio-button label="Rejected" />
          <el-radio-button label="Cancel" />
        </el-radio-group>
      </div>
      <div>
        <el-input
          v-model="customerLink.note"
          :rows="2"
          type="textarea"
          placeholder="Ghi chú Sale"
        />
      </div>
      <div>
        <el-input
          v-model="customerLink.noteCSKH"
          :rows="2"
          type="textarea"
          placeholder="Ghi chú CSKH"
        />
      </div>
      <el-card class="box-card">
        <template #header>
          <div class="card-header">
            <span>List image</span>
          </div>
        </template>
        <div
          v-for="item in customerLink.listCustomerlinkImage"
          class="text item"
          style="display: flex; align-items: flex-end"
        >
          <el-image
            style="width: 100px; height: 100px"
            :src="item.linkImage"
            fit="contain"
          />
          <el-button
            class="button"
            @click="
              () => {
                customerLink.listCustomerlinkImage.splice(
                  customerLink.listCustomerlinkImage.indexOf(item),
                  1
                );
              }
            "
            >Xóa</el-button
          >
        </div>
        <div style="display: flex">
          <el-input placeholder="Please input" v-model="linkText" />
          <el-button class="button" @click="addImage()"> thêm </el-button>
        </div>
      </el-card>
      <p style="color: red">{{ message }}</p>
      <el-button type="primary" size="small" @click="Save()">Lưu</el-button>
    </div>
  </el-dialog>
</template>
<script setup lang="ts">
import {
  CustomerLinkDto,
  CustomerlinkImageDto,
} from "@/Models/Dtos/CustomerLinkDto";
import { axiosInstance } from "@/Services/axiosConfig";
import { defineProps, ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps<{
  CustomerLinkId: string;
  openDialog: boolean;
}>();
const emit = defineEmits<{
  (e: "onCloseClicked"): void;
}>();
const message = ref<string>("");

const customerLink = ref({
  id: undefined,
  status: 0,
  statusText: "",
  listCustomerlinkImage: [] as CustomerlinkImageDto[],
  url: "",
  customerId: "",
  note: "",
  noteCSKH: "",
});
const getCustomerLink = async () => {
  await axiosInstance
    .get(`/CustomerLink/${props.CustomerLinkId}`)
    .then((response) => {
      console.log("customerLink", response.data);
      if (!response.data.isSuccess) {
        console.error(response.data.message);
      } else {
        customerLink.value = response.data.data;
        switch (customerLink.value.status) {
          case 0:
            customerLink.value.statusText = "Pending";
            break;
          case 1:
            customerLink.value.statusText = "Approved";
            break;
          case 2:
            customerLink.value.statusText = "Rejected";
            break;
          case 3:
            customerLink.value.statusText = "Cancel";
            break;
        }
      }
    });
};
onMounted(getCustomerLink);
watch(() => props.openDialog, getCustomerLink);
const linkText = ref("");
async function Save() {
  switch (customerLink.value.statusText) {
    case "Pending":
      customerLink.value.status = 0;
      break;
    case "Approved":
      customerLink.value.status = 1;
      break;
    case "Rejected":
      customerLink.value.status = 2;
      break;
    case "Cancel":
      customerLink.value.status = 3;
      break;
  }
  const request = new CustomerLinkDto();
  request.id = props.CustomerLinkId;
  request.status = customerLink.value.status;
  request.listCustomerlinkImage = customerLink.value.listCustomerlinkImage;
  request.note = customerLink.value.note;
  request.noteCSKH = customerLink.value.noteCSKH
  console.log("request", request);
  await axiosInstance
    .put(`/CustomerLink/StatusChange`, request)
    .then((response) => {
      if (!response.data.isSuccess) {
        console.error(response.data.message);
      } else {
        console.log(response.data);
        alert("cập nhật trạng thái thành công");
      }
    });
}
function addImage() {
  console.log(customerLink.value.listCustomerlinkImage);
  if (!customerLink.value.listCustomerlinkImage) {
    customerLink.value.listCustomerlinkImage = []; // hoặc khởi tạo giá trị mảng khác
  }
  if (customerLink.value.listCustomerlinkImage.length < 4) {
    message.value = "";
    const customerlinkImage = new CustomerlinkImageDto();
    customerlinkImage.linkImage = linkText.value;
    customerLink.value.listCustomerlinkImage.push(customerlinkImage);
  } else {
    message.value = "không được vượt qua 4 ảnh";
  }
}
</script>
<style scoped></style>
