<template>
  <div>
    <el-select
      v-model="bank"
      class="m-2"
      placeholder="Select bank"
      size="large"
      style="width: 240px"
      filterable
    >
      <el-option
        v-for="item in Customer.banks"
        :key="item.id"
        :label="item.name"
        :value="item.id"
      />
    </el-select>
    <el-button :icon="Search"  @click="handlebtnSearchClicked"> search</el-button>
  </div>
  <div >
    <el-row :gutter="20" class="Bank">
      <el-col v-for="bank in banks" :key="bank.id" :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span @click="()=>{console.log(bank)}">{{ bank.name }}</span>
            </div>
          </template>
          <div v-for="customerLink in bank.customerLinks" :key="customerLink.id" class="text item">
            <el-button type="primary" text  @click="CreateCustomerLink(customerLink.id ?? '')">{{  customerLink.camPaignName }}</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div v-if="isLoading">Loading...</div>
    <el-dialog v-model="showLink" title="Link" @clouse="showLink = false" class="dialog-link">
      <el-form >
          <el-input v-model="Link" autocomplete="off" />
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { CustomerDto } from '@/Models/Dtos/CustomerDto';
import { ref, onMounted } from 'vue';
import { GetCustomer } from '@/Services/Customer/GetById';
import { useRoute } from 'vue-router';
import { CustomerLinkDto } from '@/Models/Dtos/CustomerLinkDto';
import router from '@/router';
import type { Bank } from '@/Models/Dtos/BankViewModel';
import {handelCreateCustomerLink} from '../Services/CustomerLink/Create';
import Clipboard from 'clipboard';
import {
    Search,
} from '@element-plus/icons-vue';
const route = useRoute();
const bank = ref();
const banks = ref<Bank[]>([])
const Customer = ref<CustomerDto>({
  id: undefined,
  name: undefined,
  passport: undefined,
  phoneNumber: undefined,
  email: undefined,
  refferalCode: undefined,
  nameProvice: undefined,
  provinceId: undefined,
  banks: [] as Bank[],
});
const isLoading = ref(true);
const showLink = ref(false);
const Link = ref("");
async function fetchCustomer() {
  await GetCustomer( useRoute().params.Id.toString()).then((x) => {
    if (x.isSuccess && x.data != null) {
      Customer.value = x.data;
      Customer.value.banks = Customer.value.banks?.sort((a, b) => {
        if (a.name && b.name) {
          return a.name.localeCompare(b.name); // Sắp xếp theo thứ tự alphabet
        }
        return 0; // hoặc trả về một giá trị phù hợp nếu không thể so sánh tên
      })
      banks.value = Customer.value.banks ?? [];
      console.log(Customer.value);
    }
  });
  // const value = JSON.parse(localStorage.getItem('Customer') || 'null');
  // console.log(value);
  // Customer.value = value;
  isLoading.value = false;
}

fetchCustomer();

async function CreateCustomerLink(idCustomerLink: string) {

  var results = confirm("Bạn có muốn thao tác tiếp hay không ?");
if(results){
 

  const newCustomerLink = new CustomerLinkDto();
  newCustomerLink.customerId = route.params.Id.toString();
  var customerlink = Customer.value.banks?.find(x => x.customerLinks?.find(y => y.id == idCustomerLink))?.customerLinks?.find(x => x.id == idCustomerLink);
  newCustomerLink.url = customerlink?.url;
  newCustomerLink.linkTemplateId = customerlink?.linkTemplateId;
  console.log("newCustomerLink", newCustomerLink);

  var result = await handelCreateCustomerLink(newCustomerLink);
  if(result.isSuccess && result.data != null) {
    // window.open(result.data.url, "_blank");
    myFunction(result.data.url as string);
  }
  else{
    alert(result.message);
  }


}else{
 
  showLink.value = false;
 
}

};
function myFunction( text:string) {
  var textField = document.createElement('textarea');
  textField.innerText = text;
  document.body.appendChild(textField);
  textField.select();
  document.execCommand('copy');
  document.body.removeChild(textField);
  
  // Alert the copied text
  // alert("Copy: " + text);
  Link.value = text;
  showLink.value = true;
}
const loading = ref(false);
function handlebtnSearchClicked(){
  loading.value = true;
    setTimeout(() => {
      loading.value = false;
      banks.value =
        Customer.value.banks?.filter((item) =>
          item.id?.toLowerCase().includes(bank.value.toLowerCase())
        ) ?? [];
    }, 200);
}
</script>
<style>
.box-card {
  margin-top: 20px;
  margin-bottom: 20px;
}
@media only screen and (max-width: 600px) {
  .dialog-link{
    width: 100% !important;
  }
}
.Bank > .el-col.el-col-8.is-guttered {
    min-width: 300px;
}
</style>
