<template>
  <el-dialog
    :model-value="openDialog"
    class="form-dialog dialog-status"
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
        Ghi chú sale
        <el-input
          v-model="customerLink.note"
          :rows="2"
          type="textarea"
          placeholder="Ghi chú Sale"
        />
      </div>
      <div>
        Chi chú CSKH
        <el-input
          v-model="customerLink.noteCSKH"
          :rows="2"
          type="textarea"
          placeholder="Ghi chú CSKH"
        />
      </div>
      <el-card class="box-card">
        <!-- <template #header>
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
        </div> -->
        <div style="display: flex; flex-direction: column;">
          <div class="dl-f-w">
            <el-input placeholder="Hình 1" v-model="customerLink.listCustomerlinkImage[0].linkImage" />
            <el-image v-if="customerLink.listCustomerlinkImage[0].linkImage !== ''"
              style="width: 100px; height: 100px"
              :src="customerLink.listCustomerlinkImage[0].linkImage"
              fit="contain"
            />
          </div>
          <div class="dl-f-w">
            <el-input placeholder="Hình 2" v-model="customerLink.listCustomerlinkImage[1].linkImage" />
            <el-image v-if="customerLink.listCustomerlinkImage[1].linkImage !== ''"
              style="width: 100px; height: 100px"
              :src="customerLink.listCustomerlinkImage[1].linkImage"
              fit="contain"
            />
          </div>
          <div class="dl-f-w">
            <el-input placeholder="Hình 3" v-model="customerLink.listCustomerlinkImage[2].linkImage" />
            <el-image v-if="customerLink.listCustomerlinkImage[2].linkImage !== ''"
              style="width: 100px; height: 100px"
              :src="customerLink.listCustomerlinkImage[2].linkImage"
              fit="contain"
            />
          </div>
          <div class="dl-f-w">
            <el-input placeholder="Hình 4" v-model="customerLink.listCustomerlinkImage[3].linkImage" />
            <el-image v-if="customerLink.listCustomerlinkImage[3].linkImage !== ''"
              style="width: 100px; height: 100px"
              :src="customerLink.listCustomerlinkImage[3].linkImage"
              fit="contain"
            />
          </div>
          <!-- <el-input placeholder="Please input" v-model="customerLink.listCustomerlinkImage[1].linkImage" />
          <el-input placeholder="Please input" v-model="customerLink.listCustomerlinkImage[2].linkImage" />
          <el-input placeholder="Please input" v-model="customerLink.listCustomerlinkImage[3].linkImage" /> -->
          <!-- <el-button class="button" @click="addImage()"> thêm </el-button> -->
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
import Cookies from "js-cookie";
import { defineProps, ref, onMounted, onUnmounted, watch } from "vue";

const props = defineProps<{
  CustomerLinkId: string;
  openDialog: boolean;
}>();
const emit = defineEmits<{
  (e: "onCloseClicked"): void;
}>();
const userRoles = ref<string[]>();
const hasAdminRole = ref<boolean>(false);
const hasSupAndLeaderRole = ref<boolean>(false);
const message = ref<string>("");

const customerLink = ref({
  id: undefined,
  status: 0,
  statusText: "",
  listCustomerlinkImage: [
    {
      linkImage: "",
      customerLinkId: undefined,
      id: undefined,
    },
    {
      linkImage: "",
      customerLinkId: undefined,
      id: undefined,
    },
    {
      linkImage: "",
      customerLinkId: undefined,
      id: undefined,
    },
    {
      linkImage: "",
      customerLinkId: undefined,
      id: undefined,
    },
] as CustomerlinkImageDto[],
  url: "",
  customerId: "",
  note: "",
  noteCSKH: "",
  customerCancel: null,
});
// for (let i = 0; i < 4; i++) {
//     if (!customerLink.value.listCustomerlinkImage) {
//       customerLink.value.listCustomerlinkImage = []; // hoặc khởi tạo giá trị mảng khác
//     }
//     if (customerLink.value.listCustomerlinkImage.length) {
//       message.value = "";
//       const customerlinkImage = new CustomerlinkImageDto();
//       customerlinkImage.linkImage = "";
//       customerLink.value.listCustomerlinkImage.push(customerlinkImage);
//     }
// }
function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
const getCustomerLink = async () => {
  var jsonString = Cookies.get("Roles")?.toString() ?? "";
  var jsonObject = JSON.parse(jsonString);
  var Roles = Object.values(jsonObject) as string[];
  hasAdminRole.value = hasPermission(Roles as string[], [
    "Admin",
    "superadmin",
  ]);
  hasSupAndLeaderRole.value = hasPermission(Roles as string[], [
    "SUP","Teamleader"
  ])
  await axiosInstance
    .get(`/CustomerLink/${props.CustomerLinkId}`)
    .then((response) => {
      console.log("customerLink", response.data);
      if (!response.data.isSuccess) {
        console.error(response.data.message);
      } else {
        customerLink.value = response.data.data;
        customerLink.value.note = hasAdminRole.value == true ? customerLink.value.note : "";
        customerLink.value.noteCSKH = hasAdminRole.value == true ? customerLink.value.noteCSKH : "";
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
          // case 4:
          //    customerLink.value.statusText = "CustomerCancel";
          //    break;
        }
        if(customerLink.value.listCustomerlinkImage.length < 4){
          var n = 4 - customerLink.value.listCustomerlinkImage.length
          for (let i = 0; i < n; i++) {
            if (!customerLink.value.listCustomerlinkImage) {
              customerLink.value.listCustomerlinkImage = []; // hoặc khởi tạo giá trị mảng khác
            }
            if (customerLink.value.listCustomerlinkImage.length < 4) {
              var dto = new CustomerlinkImageDto();
              dto.linkImage = "";
              customerLink.value.listCustomerlinkImage.push(dto);
            }
          }
        }
      }
    });
};
onMounted(() => {
  getCustomerLink
});

watch(() => props.openDialog, getCustomerLink);
const linkText = ref("");
async function Save() {
  var Check = confirm("Bạn có chắc chắn với những thay đổi này");
  if(Check == false){
    return; 
  }
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
    // case"CustomerCancel":
    //   customerLink.value.status = 4;
    //     break;
      
  }
  
  const request = new CustomerLinkDto();
  request.id = props.CustomerLinkId;
  request.status = customerLink.value.status;
  request.listCustomerlinkImage = customerLink.value.listCustomerlinkImage.filter(x=>x.linkImage != '');
  request.note = customerLink.value.note;
  request.noteCSKH = customerLink.value.noteCSKH
  console.log("request", request);
  await axiosInstance
    .put(`/CustomerLink/StatusChange`, request)
    .then((response) => {
      if (!response.data.isSuccess) {
        console.error(response.data.message);
        alert(response.data.message);
      } else {
        if(customerLink.value.status == 3){
          if(!(hasAdminRole.value || hasSupAndLeaderRole.value)){
            alert("Thay đổi đã được cập nhật trên hệ thống, vui lòng chờ xác nhận");
          }
        }
        console.log(response.data);
        // alert("cập nhật trạng thái thành công");
        emit('onCloseClicked');
      }
    });
}
// function addImage() {
//   console.log(customerLink.value.listCustomerlinkImage);
//   if (!customerLink.value.listCustomerlinkImage) {
//     customerLink.value.listCustomerlinkImage = []; // hoặc khởi tạo giá trị mảng khác
//   }
//   if (customerLink.value.listCustomerlinkImage.length < 4) {
//     message.value = "";
//     const customerlinkImage = new CustomerlinkImageDto();
//     customerlinkImage.linkImage = linkText.value;
//     customerLink.value.listCustomerlinkImage.push(customerlinkImage);
//   } else {
//     message.value = "không được vượt qua 4 ảnh";
//   }
// }
</script>
<style>
.dialog-status{
  width: 30% !important;
}
@media screen and (max-width: 900px) {
  .dialog-status{
    width: 100% !important;
  }
  
}
</style>
