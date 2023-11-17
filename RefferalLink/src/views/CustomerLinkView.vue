<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'CustomerLink'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="CustomerLink" :CustomActions="CustomActions" ></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue'
import {CustomAction} from '@/components/maynghien/adminTable/Models/CustomAction'
const tableColumns: TableColumn[] = [
// {
//         key: "customerId",
//         label: "customerId",
//         width: 1000,
//         sortable: true,
//         enableEdit:  true,

//         enableCreate:  true,
//         required:false,
//         hidden: false,
//         showSearch: true,
//         inputType:  "text",
//         dropdownData:null,
//     },
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
    // {
    //     key: "linkTemplateId",
    //     label: "linkTemplateId",
    //     width: 1000,
    //     sortable: true,
    //     enableEdit:  true,

    //     enableCreate:  true,
    //     required:false,
    //     hidden: false,
    //     showSearch: true,
    //     inputType:  "text",
    //     dropdownData:null,
    // },
    {
        key: "bankName",
        label: "Tên Ngân Hàng",
        width: 1000,
        sortable: true,
        enableEdit:  true,

        enableCreate:  true,
        required:false,
        hidden: false,
        showSearch: true,
        inputType:  "text",
        dropdownData:null,
    },
    {
        key: "camPainNamme",
        label: "Tên Chiến Dịch",
        width: 1000,
        sortable: true,
        enableEdit:  true,

        enableCreate:  true,
        required:false,
        hidden: false,
        showSearch: true,
        inputType:  "text",
        dropdownData:null,
    },
    // {
    //     key: "linkTemplateName",
    //     label: "linkTemplateName",
    //     width: 1000,
    //     sortable: true,
    //     enableEdit:  true,

    //     enableCreate:  true,
    //     required:false,
    //     hidden: false,
    //     showSearch: true,
    //     inputType:  "text",
    //     dropdownData:null,
    // },
]
const CustomActions: CustomAction[]=([]);
</script>