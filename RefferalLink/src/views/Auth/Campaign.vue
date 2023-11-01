<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Campaign'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="Campaign" :CustomActions="CustomActions" ></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue'
import {CustomAction} from '@/components/maynghien/adminTable/Models/CustomAction'
const tableColumns: TableColumn[] = [
    {
        key: "name",
        label: "Tên Chiến Dịch ",
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
]
const CustomActions: CustomAction[]=([]);
</script>