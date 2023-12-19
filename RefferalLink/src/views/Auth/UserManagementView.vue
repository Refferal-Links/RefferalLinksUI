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
        enableEdit: false,

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
        hidden: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "email",
        label: "Email",
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
        key: "refferalCode",
        label: "RefferalCode",
        width: 500,
        sortable: false,
        enableEdit:  false,

        enableCreate:  true,
        required:false,
        hidden: false,
        showSearch: false,
        inputType:  "text",
        dropdownData:null,
    },
    {
        key: "tpBank",
        label: "TpBank",
        width: 500,
        sortable: false,
        enableEdit:  false,

        enableCreate:  true,
        required:false,
        hidden: false,
        showSearch: false,
        inputType:  "text",
        dropdownData:null,
    },
    {
        key: "lockoutEnabled",
        label: "Khóa/Mở" ,
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
        enableEdit: false,
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
                },
                {
                    role: "CSKH",
                    roleName: "CSKH"
                }
            ]

        },

    },
    {
        key: "teamId",
        label: "Team",
        width: 1000,
        sortable: true,
        enableEdit:  false,

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
        showSearch: false,
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
        ActionLabel: "Khóa/Mở",
        ApiAction: "StatusChange",
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);
</script>