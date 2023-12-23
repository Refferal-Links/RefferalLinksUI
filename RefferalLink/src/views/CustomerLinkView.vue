<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="bank in Customer.banks" :key="bank.id" :span="8">
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
const route = useRoute();


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

async function fetchCustomer() {
  // await GetCustomer( useRoute().params.Id.toString()).then((x) => {
  //   if (x.isSuccess && x.data != null) {
  //     Customer.value = x.data;
  //     console.log(Customer.value);
  //   }
  // });
  const value = JSON.parse(localStorage.getItem('Customer') || 'null');
  console.log(value);
  Customer.value = value;
  isLoading.value = false;
}

fetchCustomer();

async function CreateCustomerLink(idCustomerLink: string) {
  const newCustomerLink = new CustomerLinkDto();
  newCustomerLink.customerId = route.params.Id.toString();
  var customerlink = Customer.value.banks?.find(x => x.customerLinks?.find(y => y.id == idCustomerLink))?.customerLinks?.find(x => x.id == idCustomerLink);
  newCustomerLink.url = customerlink?.url;
  newCustomerLink.linkTemplateId = customerlink?.linkTemplateId;
  console.log("newCustomerLink", newCustomerLink);

  var result = await handelCreateCustomerLink(newCustomerLink);
  if(result.isSuccess && result.data != null) {
    window.open(result.data.url, "_blank");
  }
  else{
    alert(result.message);
  }
};

</script>
<style>
.box-card {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
