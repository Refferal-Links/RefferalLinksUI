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
        @onCustomAction="ChangePage"
      />
    </Suspense>
  </template>
  
  <script lang="ts" setup>
  import BasicAdminFormVue from "@/components/maynghien/adminTable/BasicAdminForm.vue";
  import { ApiActionType, CustomAction, CustomActionDataType, CustomActionResponse } from "@/components/maynghien/adminTable/Models/CustomAction";
  // @ts-ignore
  import { TableColumn } from "@/components/maynghien/adminTable/Models/TableColumn.ts";
import router from "@/router";
  import { axiosInstance } from "@/Services/axiosConfig";
  import Cookies from "js-cookie";
  import * as jwt from "jsonwebtoken";
import { ref, reactive } from "vue";
  
  const token = Cookies.get("accessToken")?.toString() ?? "";
  const decodedToken = jwt.decode(token ?? "") as TokenPayload;
  const userRoles = decodedToken.Roles || [];
  
  const hasTeamleaderRole = hasPermission(userRoles, ["teamleader"]);
  const hasSaleRole = hasPermission(userRoles, ["Sale"]);
  const hasAdminRole = hasPermission(userRoles, ["Admin", "superadmin"]);
  
  interface TokenPayload {
    Roles: string[];
  }
const customerLinkId = ref("");
const deatailShow = ref(false);
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
        label: "Ngân Hàng",
        width: 1000,
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
        key: "bankId",
        label: "Ngân Hàng",
        width: 1000,
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
        key: "camPaignName",
        label: "Chiến Dịch",
        width: 1000,
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
        key: "campaignId",
        label: "Chiến Dịch",
        width: 1000,
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
        key: "teamId",
        label: "Đội",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: true,
        showSearch: hasAdminRole?true:false,
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
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: hasAdminRole?false:true,
        showSearch:false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "userName",
        label: "Sale",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: true,
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
    {
        ActionName: "Deatail",
        ActionLabel: "Link",
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);
function ChangePage(item: CustomActionResponse){
    if(item.Action.ActionName == "Deatail")
    router.push('/CustomerLink/' + item.Data.customerId);
}
</script>