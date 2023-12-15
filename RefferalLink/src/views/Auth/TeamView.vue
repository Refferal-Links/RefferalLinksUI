<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Team'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="Team" :CustomActions="CustomActions" ></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue'
import {CustomAction} from '@/components/maynghien/adminTable/Models/CustomAction'
import { fa } from 'element-plus/lib/locale/index.js';
const tableColumns: TableColumn[] = [
    {
        key: "name",
        label: "Team",
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
        key: "branchId",
        label: "Chi nhánh",
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
            apiUrl: "Branch",
        },
    },
    {
        key: "nameBranch",
        label: "Chi nhánh",
        width: 1000,
        sortable: true,
        enableEdit:  false,

        enableCreate:  false,
        required:true,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null
    },
]
const CustomActions: CustomAction[]=([]);
</script>