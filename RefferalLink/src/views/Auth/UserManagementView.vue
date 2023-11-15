<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'UserManagemet'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="UserManagemet" :CustomActions="CustomActions"></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import { axiosInstance } from '@/Services/axiosConfig';
const tableColumns: TableColumn[] = [
    {
        key: "userName",
        label: "Tên Người dùng",
        width: 1000,
        sortable: true,
        enableEdit: true,

        enableCreate: true,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "password",
        label: "Mật Khẩu",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: true,
        required: false,
        hidden: false,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "email",
        label: "Email",
        width: 1000,
        sortable: true,
        enableEdit: true,

        enableCreate: true,
        required: false,
        hidden: false,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "refferalCode",
        label: "RefferalCode",
        width: 500,
        sortable: false,
        enableEdit:  true,

        enableCreate:  true,
        required:false,
        hidden: false,
        showSearch: false,
        inputType:  "text",
        dropdownData:null,
    },
    {
        key: "tPbank",
        label: "TpBank",
        width: 500,
        sortable: false,
        enableEdit:  true,

        enableCreate:  true,
        required:false,
        hidden: false,
        showSearch: false,
        inputType:  "text",
        dropdownData:null,
    },
    {
        key: "lockoutEnabled",
        label: "LockoutEnabled",
        width: 500,
        sortable: false,
        enableEdit:  false,

        enableCreate:  false,
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

                    role: "Teamleader",
                    roleName: "Teamleader"
                },
                {

                    role: "Sale",
                    roleName: "Sale"
                }
            ]

        },

    },
    {
        key: "teamId",
        label: "Team",
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
            apiUrl: "Team",
        },

    },
    {
        key: "teamName",
        label: "Team",
        width: 1000,
        sortable: true,
        enableEdit:  false,

        enableCreate:  false,
        required:true,
        hidden: false,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
            displayMember: "name",
            keyMember: "id",
            apiUrl: "Team",
        },

    },
 
]
const CustomActions: CustomAction[] = ([
    {
        ActionName: "StatusChange",
        ActionLabel: "StatusChange",
        ApiAction: "StatusChange",
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);
</script>