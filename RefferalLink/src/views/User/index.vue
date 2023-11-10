<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'user'" :allowAdd="true" :allowDelete="true" title="User"
           :CustomActions="CustomActions" :allowEdit="true"></BasicAdminFormVue>
    </Suspense>
</template>

<script setup lang="ts">

import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
import {
    Unlock
} from '@element-plus/icons-vue';
const tableColumns: TableColumn[] = [
    {
        key: "userName",
        label: "User Name",
        enableEdit: false,
        enableCreate: true,
        hidden: false,
        width: 500,
        required: true,
        sortable: true,
        showSearch: true,
        inputType: "text",
        dropdownData: null,

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
        showSearch: true,
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
const CustomActions: CustomAction[] = ([
    {
        ActionName: "Reset",
        ActionLabel: "Reset",
        Icon: Unlock,
        ApiAction: "Reset",
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);
</script>