<template>
  <div>
    <el-row :gutter="20">
      <el-col v-for="bank in Customer.banks" :key="bank.id" :span="8">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>{{ bank.name }}</span>
            </div>
          </template>
          <div v-for="customerLink in bank.customerLinks" :key="customerLink.id" class="text item">
            <a :href="customerLink.url">{{ customerLink.camPaignName }}</a>
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

const Customer = ref<CustomerDto>({
  id: undefined,
  name: undefined,
  passport: undefined,
  phoneNumber: undefined,
  email: undefined,
  refferalCode: undefined,
  nameProvice: undefined,
  provinceId: undefined,
  banks: undefined,
});
const isLoading = ref(true);

async function fetchCustomer() {
  await GetCustomer( useRoute().params.Id.toString()).then((x) => {
    if (x.isSuccess && x.data != null) {
      Customer.value = x.data;
      console.log(Customer.value);
    }
  });
}

onMounted(async () => {
  await fetchCustomer();
  isLoading.value = false;
});
</script>
<style>
.box-card {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
