<template>
  <Suspense>
    <BasicAdminFormVue
      :tableColumns="tableColumns"
      :apiName="'LinkTemplate'"
      :allowAdd="hasAdminRole"
      :allowEdit="hasAdminRole"
      :allowDelete="hasAdminRole"
      title="LinkTemplate"
      :CustomActions="CustomActions"
    ></BasicAdminFormVue>
  </Suspense>
</template>
<script lang="ts" setup>
import BasicAdminFormVue from "@/components/maynghien/adminTable/BasicAdminForm.vue";
import {
  ApiActionType,
  CustomAction,
  CustomActionDataType,
} from "@/components/maynghien/adminTable/Models/CustomAction";
// @ts-ignore
import { TableColumn } from "@/components/maynghien/adminTable/Models/TableColumn.ts";
import { axiosInstance } from "@/Services/axiosConfig";
import Cookies from "js-cookie";

class Bank {
  Id: string | undefined;
  Name: string | undefined;
}
import { reactive, ref } from "vue";

const hasAdminRole = ref<boolean>(false);


const tableColumns: TableColumn[] = [
  {
    key: "url",
    label: "Url",
    width: 1000,
    sortable: false,
    enableEdit: true,

    enableCreate: true,
    required: false,
    hidden: false,
    showSearch: false,
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
    required: true,
    hidden: false,
    showSearch: false,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "name",
      keyMember: "id",
      apiUrl: "Bank",
    },
  },
  {
    key: "campaignName",
    label: "Chiến Dịch ",
    width: 1000,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: true,
    hidden: false,
    showSearch: false,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "name",
      keyMember: "id",
      apiUrl: "Campaign",
    },
  },
  {
    key: "bankId",
    label: "Ngân Hàng",
    width: 1000,
    sortable: true,
    enableEdit: true,

    enableCreate: true,
    required: true,
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
    label: " Chiến Dịch ",
    width: 1000,
    sortable: true,
    enableEdit: true,
    enableCreate: true,
    required: true,
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
    key: "isActive",
    label: "Trạng Thái",
    width: 500,
    sortable: true,
    enableEdit: false,
    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: "text",
    dropdownData: null,
  },
];
const CustomActions: CustomAction[] = [
//   {
//     ActionName: "StatusChange",
//     ActionLabel: "StatusChange",
//     ApiAction: "StatusChange",
//     ApiActiontype: ApiActionType.PUT,
//     IsRowAction: true,
//     DataType: CustomActionDataType.RowId,
//   },
];

function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
function checkRole() {
  try {
    var jsonString = Cookies.get("Roles")?.toString() ?? "";
    var jsonObject = JSON.parse(jsonString);
    var Roles = Object.values(jsonObject) as string[];
    console.log(Roles);
    hasAdminRole.value = hasPermission(Roles, ["Admin", "superadmin"]);
    if(hasAdminRole.value == true){
        CustomActions.push({
            ActionName: "StatusChange",
            ActionLabel: "Đống/Mở",
            ApiAction: "StatusChange",
            ApiActiontype: ApiActionType.PUT,
            IsRowAction: true,
            DataType: CustomActionDataType.RowId,
      })
    }
  } catch (error) {
    console.error(error);
  }
}
checkRole();
</script>
