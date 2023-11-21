<template>
  <div>
    
  </div>
  <el-space style="width: 100%;" v-if="!isLoading" :fill="true" wrap>
    <el-card v-for="bank in Customer.banks" :key="bank.id" class="box-card">
      <template #header>
        <div class="card-header">
          <span>{{ bank.name }}</span>
        </div>
      </template>
      <div v-for="customerLink in bank.customerLinks" :key="customerLink.id" class="text item">
        <a :href="customerLink.url">{{ customerLink.camPaignNamme }}</a>
      </div>
    </el-card>
  </el-space>
  <div v-if="isLoading">Loading...</div>
</template>


 <!-- <template>
  <el-table style="width: 100%;" v-if="!isLoading" :fill="true" wrap>
    <el-table-column label="Ngân Hàng" width="200">
      <template>
      <div>
          <div v-for="bank in Customer.banks" :key="bank.id">
            <span>{{ bank.name }}</span>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column label="Chiến Dịch">
      <template>
        <div>
          <div v-for="customerLink in bank.customerLinks" :key="customerLink.id">
            <a :href="customerLink.url">{{ customerLink.camPaignNamme }}</a>
          </div>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div v-if="isLoading">Loading...</div>
</template> -->

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
  await GetCustomer(useRoute().params.Id.toString()).then((x) => {
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
