<template>
    <Suspense>
      <BasicAdminFormVue
        :tableColumns="tableColumns"
        :apiName="'CustomerLink'"
        :allowAdd="true"
        :allowEdit="true"
        :allowDelete="true"
        title="CustomerLink"
        :CustomActions="CustomActions"
      />
    </Suspense>
  </template>
  
  <script lang="ts" setup>
  import BasicAdminFormVue from "@/components/maynghien/adminTable/BasicAdminForm.vue";
  import { ApiActionType, CustomAction, CustomActionDataType } from "@/components/maynghien/adminTable/Models/CustomAction";
  // @ts-ignore
  import { TableColumn } from "@/components/maynghien/adminTable/Models/TableColumn.ts";
  import { axiosInstance } from "@/Services/axiosConfig";
  import Cookies from "js-cookie";
  import * as jwt from "jsonwebtoken";
  
  const token = Cookies.get("accessToken")?.toString() ?? "";
  const decodedToken = jwt.decode(token ?? "") as TokenPayload;
  const userRoles = decodedToken.Roles || [];
  
  const hasTeamleaderRole = hasPermission(userRoles, ["teamleader"]);
  const hasSaleRole = hasPermission(userRoles, ["Sale"]);
  const hasAdminRole = hasPermission(userRoles, ["Admin", "superadmin"]);
  
  interface TokenPayload {
    Roles: string[];
  }

const tableColumns: TableColumn[] = [
    {
        key: "name",
        label: "Tên Người dùng",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "passport",
        label: "Hộ Chiếu",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch:true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "phoneNumber",
        label: "Số điện thoại",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "email",
        label: "Email",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "bankName",
        label: "Tên Ngân Hàng",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "BankId",
        label: "Id Ngân Hàng",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "camPaignNamme",
        label: "Tên Chiến Dịch",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "camPaignId",
        label: "Tên Chiến Dịch",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: true,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "teamId",
        label: "Id Đội",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: hasAdminRole?false:true,
        showSearch: hasAdminRole?true:false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "teamName",
        label: "Tên Đội",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: hasAdminRole?false:true,
        showSearch: hasAdminRole?true:false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "userName",
        label: "User",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: hasSaleRole?true:false,
        showSearch:hasSaleRole?false:true ,
        inputType: "text",
        dropdownData: null,
    },
 
]

function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
  
const CustomActions: CustomAction[] = ([
    // ... custom actions
  ]);
</script>