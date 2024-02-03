<template>
    <Suspense>
        <BasicAdminFormVue :tableColumns="tableColumns" :apiName="'CustomerLink'" :allowAdd="false" :allowEdit="false"
            :allowDelete="false" title="Báo cáo" :CustomActions="CustomActions" searchUrl="/search2" :changePageSize="true"></BasicAdminFormVue>
    </Suspense>
</template>
<script lang="ts" setup>
import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn'
import BasicAdminFormVue from '@/components/maynghien/adminTable/BasicAdminForm.vue'
import {CustomAction} from '@/components/maynghien/adminTable/Models/CustomAction'
const tableColumns: TableColumn[] = [
    {
        key: "branchName",
        label: "Chi nhánh",
        width: 1000,
        sortable: true,
        enableEdit:  false,

        enableCreate:  false,
        required:false,
        hidden: false,
        showSearch: false,
        inputType:  "text",
        dropdownData:null,
    },
    {
        key: "branchId",
        label: "Chi nhánh",
        width: 1000,
        sortable: false,
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
    key: "teamId",
    label: "team",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
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
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: "text",
    dropdownData: null,
  },
  {
    key: "sale",
    label: "Sale",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: true,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "userName",
      keyMember: "id",
      apiUrl: "UserManagemet/sale",
    },
  },
  // {
  //       key: "totalLead",
  //       label: "Lead",
  //       width: 1000,
  //       sortable: false,
  //       enableEdit:  false,

  //       enableCreate:  false,
  //       required:false,
  //       hidden: false,
  //       showSearch: false,
  //       inputType:  "text",
  //       dropdownData:null,
  //   },
  {
        key: "approved",
        label: "Approved",
        width: 1000,
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
        key: "rejected",
        label: "Rejected",
        width: 1000,
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
        key: "pending",
        label: "Pending",
        width: 1000,
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
        key: "cancel",
        label: "Cancel",
        width: 1000,
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
        key: "totalString",
        label: "Total",
        width: 1000,
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
        key: "bankId",
        label: "Ngân Hàng",
        width: 100,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: true,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
        displayMember: "name",
        keyMember: "id",
        apiUrl: "Bank",
        },
    },
    {
        key: "campaignId",
        label: "Chiến dịch",
        width: 100,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: true,
        showSearch: true,
        inputType: "dropdown",
        dropdownData: {
        displayMember: "name",
        keyMember: "id",
        apiUrl: "Campaign",
        },
    },
    {
    key: "createOn",
    label: "Ngày tạo",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: true,
    inputType: "date",
    dropdownData: null
  },
  {
    key: "modifiedOn",
    label: "Ngày hỗ trợ",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: true,
    inputType: "date",
    dropdownData: null
  },
  {
    key: "nvActive",
    label: "Trạng thái nhân viên",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: true,
    inputType: "dropdown",
    dropdownData: 
    {
      displayMember: "nvActiveText",
      keyMember: "nvActive",
      data: [
        {
          nvActive: "False",
          nvActiveText: "Cấm",
        },
        {
          nvActive: "True",
          nvActiveText: "Đang hoạt động",
        },
      ],
    }
  },
]
const CustomActions: CustomAction[]=([]);
</script>