<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'Campaign'" :allowAdd="true" :allowEdit="true"
            :allowDelete="true" title="Campaign" :CustomActions="CustomActions" ></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue';
import { ApiActionType, CustomAction, CustomActionDataType } from '@/components/maynghien/adminTable/Models/CustomAction';
// @ts-ignore
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
const tableColumns: TableColumn[] = [
    {
        key: "name",
        label: "Chiến Dịch ",
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
        key: "isActive",
        label: "Trạng Thái",
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