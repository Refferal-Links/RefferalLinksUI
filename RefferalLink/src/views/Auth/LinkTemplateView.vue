<template>
  <el-form
  ref="formRef"
  :model="numberValidateForm"
  label-width="100px"
  class="demo-ruleForm"
>
  <el-form-item label="name" prop="name">
    <el-input v-model="numberValidateForm.name" type="text" autocomplete="off" />
  </el-form-item>
  <el-form-item label="phone number" prop="phoneNumber">
    <el-input v-model="numberValidateForm.phoneNumber" type="tel" autocomplete="off" />
  </el-form-item>
  <el-form-item label="sale" prop="sale">
    <el-input v-model.number="numberValidateForm.sale" type="text" autocomplete="off" />
  </el-form-item>
  <el-form-item>
    <el-button type="primary"  @click="handleSubmit">Submit</el-button>
  </el-form-item>
  <label v-if="submitted">
    http://abc.com/{{numberValidateForm.sale}}?phonenumber={{numberValidateForm.phoneNumber}}&name={{numberValidateForm.name}}
    </label>
</el-form>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'LinkTemplate'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="LinkTemplate" :CustomActions="CustomActions" ></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue'
import {CustomAction} from '@/components/maynghien/adminTable/Models/CustomAction'
import { axiosInstance } from '@/Services/axiosConfig';

class Bank {
    Id: string| undefined
    Name: string|undefined
}
//import { ref } from 'vue';
const listBank = ref<Bank[]>([]);
const FetchData = async() => {
    await axiosInstance.get('Bank').then((response) => {
        listBank.value = response.data.data;
        console.log(response.data)
    })
}
FetchData()

// class Campaign {
//     Id: string| undefined
//     Name: string|undefined
// }
// import { ref } from 'vue';
// const listCampaign = ref<Campaign[]>([]);
// const FetchData = async() => {
//     await axiosInstance.get('Campaign').then((response) => {
//         listCampaign.value = response.data.data;
//         console.log(listCampaign)
//     })
// }
FetchData()
const tableColumns: TableColumn[] = [
    {
        key: "url",
        label: "Url",
        width: 1000,
        sortable: true,
        enableEdit:  true,

        enableCreate:  true,
        required:false,
        hidden: false,
        showSearch: false,
        inputType:  "text",
        dropdownData:null,
    },

    {
        key: "bankId",
        label: "Tên Ngân Hàng",
        width: 1000,
        sortable: true,
        enableEdit:  true,

        enableCreate:  true,
        required:true,
        hidden: false,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "Bank"
        },

    },
    {
        key: "campaignId",
        label: "Tên Chiến Dịch ",
        width: 1000,
        sortable: true,
        enableEdit:  true,

        enableCreate:  true,
        required:true,
        hidden: false,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "Campaign"
        },
    },
]
const CustomActions: CustomAction[]=([]);
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const numberValidateForm = reactive({
  name:'',
  phoneNumber:'',
  sale:''
});

const submitted = ref(false)

async function handleSubmit() {
  const form = formRef.value
  if (!form.validate()) {
    return
  }

  // Submit the form data to your server

  submitted.value = true
}
</script>