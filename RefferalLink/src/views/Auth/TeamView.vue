<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Team'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="Team" :CustomActions="CustomActions" :changePageSize="true"></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue'
import {CustomAction} from '@/components/maynghien/adminTable/Models/CustomAction'

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
        showSearch: false,
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
        showSearch: false,
        inputType: "text",
        dropdownData: null
    },
    {
        key: "type",
        label: "Loại team",
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 300,
        required: true,
        sortable: false,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "typeName",
            keyMember: "type",
            data: [
                {
                    type: "CSKH",
                    typeName: "CSKH"
                },
                {
                    type: "Sale",
                    typeName: "Sale"
                }
            ]
        },

    },
]
const CustomActions: CustomAction[]=([]);
</script>