<template>
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
        key: "bankName",
        label: "Tên Ngân Hàng",
        width: 1000,
        sortable: true,
        enableEdit:  false,

        enableCreate:  false,
        required:true,
        hidden: false,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "Bank"
        },

    },
    {
        key: "campaignName",
        label: "Tên Chiến Dịch ",
        width: 1000,
        sortable: true,
        enableEdit:  false,

        enableCreate:  false,
        required:true,
        hidden: false,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "Campaign"
        },
    },
    {
        key: "bankId",
        label: "id Ngân Hàng",
        width: 1000,
        sortable: true,
        enableEdit:  true,

        enableCreate:  true,
        required:true,
        hidden: true,
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
        label: "IdChiến Dịch ",
        width: 1000,
        sortable: true,
        enableEdit:  true,

        enableCreate:  true,
        required:true,
        hidden: true,
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
</script>