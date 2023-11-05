<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'UserManagemet'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="UserManagemet" :CustomActions="CustomActions" ></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue'
import {CustomAction} from '@/components/maynghien/adminTable/Models/CustomAction'
const tableColumns: TableColumn[] = [
    {
        key: "userName",
        label: "Tên Người dùng",
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
        key: "password",
        label: "Mật Khẩu",
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
        key: "email",
        label: "Email",
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
        key: "role",
        label: "Role",
        enableEdit: true,
        enableCreate: true,
        hidden: false,
        width: 300,
        required: true,
        sortable: true,
        showSearch: false,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "roleName",
            keyMember: "role",
            data: [
                {
                    role: "Admin",
                    roleName: "Admin"
                },
                {

                    role: "TenantAdmin",
                    roleName: "Personal"
                }
            ]

        },

    },
]
const CustomActions: CustomAction[]=([]);
</script>