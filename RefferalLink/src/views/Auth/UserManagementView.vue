<template>
  <Suspense>
    <BasicAdminFormVue
      :tableColumns="tableColumns"
      :apiName="'UserManagemet'"
      :allowAdd="true"
      :allowEdit="true"
      :allowDelete="true"
      title="UserManagemet"
      :CustomActions="CustomActions"
    ></BasicAdminFormVue>
  </Suspense>
</template>
<script lang="ts" setup>
import type { LoginResult } from "@/Models/LoginResult";
import BasicAdminFormVue from "@/components/maynghien/adminTable/BasicAdminForm.vue";
import {
  ApiActionType,
  CustomAction,
  CustomActionDataType,
} from "@/components/maynghien/adminTable/Models/CustomAction";
// @ts-ignore
import { TableColumn } from "@/components/maynghien/adminTable/Models/TableColumn.ts";
import Cookies from "js-cookie";
import { ref } from "vue";

const userRoles = ref<string[]>();
const decodedToken = ref<LoginResult>({
  userName: "",
  roles: [],
  refferalCode: "",
  token: "",
  teamId: "",
  tpBank: "",
  typeTeam: "",
});
const hasAdminRole = ref<boolean>(false);
function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}
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
    hidden: true,
    showSearch: false,
    inputType: "text",
    dropdownData: null,
  },
  {
    key: "email",
    label: "Email",
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
    key: "refferalCode",
    label: "RefferalCode",
    width: 500,
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
    key: "tpBank",
    label: "TpBank",
    width: 500,
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
    key: "lockoutEnabled",
    label: "Khóa/Mở",
    width: 500,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
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
    sortable: false,
    showSearch: false,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "roleName",
      keyMember: "role",
      data: [
        {
          role: "Admin",
          roleName: "Admin",
        },
        {
          role: "Teamleader",
          roleName: "Teamleader",
        },
        {
          role: "Sale",
          roleName: "Sale",
        },
        {
          role: "CSKH",
          roleName: "CSKH",
        },
        {
          role: "SUP",
          roleName: "SUP",
        },
      ],
    },
  },
  {
    key: "teamId",
    label: "Team",
    width: 1000,
    sortable: false,
    enableEdit: true,

    enableCreate: true,
    required: true,
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
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: true,
    hidden: false,
    showSearch: false,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "name",
      keyMember: "id",
      apiUrl: "Team",
    },
  },
  {
    key: "branchId",
    label: "Chi nhánh",
    width: 1000,
    sortable: false,
    enableEdit: true,

    enableCreate: true,
    required: true,
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
    key: "branchName",
    label: "Chi nhánh",
    width: 1000,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: true,
    hidden: false,
    showSearch: false,
    inputType: "text",
    dropdownData: null,
  },
  {
    key: "receiveAllocation",
    label: "Phân bổ",
    width: 1000,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: true,
    hidden: false,
    showSearch: false,
    inputType: "text",
    dropdownData: null,
  },
];
const CustomActions: CustomAction[] = [
  {
    ActionName: "StatusChange",
    ActionLabel: "Khóa/Mở",
    ApiAction: "StatusChange",
    ApiActiontype: ApiActionType.PUT,
    IsRowAction: true,
    DataType: CustomActionDataType.RowId,
  },
  {
    ActionName: "ReceiveAllocation",
    ActionLabel: "Bật/Tắt phân bổ",
    ApiAction: "ReceiveAllocation",
    ApiActiontype: ApiActionType.PUT,
    IsRowAction: true,
    DataType: CustomActionDataType.RowId,
  },
];


function getCode() {
  var jsonString = Cookies.get("Roles")?.toString() ?? "";
  var jsonObject = JSON.parse(jsonString);
  var arrayFromString = Object.values(jsonObject);
  decodedToken.value.roles = arrayFromString as string[];
  console.log(decodedToken.value);
  userRoles.value = decodedToken.value?.roles ?? [];
  hasAdminRole.value = hasPermission(userRoles.value as string[], [
    "Admin",
    "superadmin",
  ]);

  if (hasAdminRole.value) {
    CustomActions.push({
    ActionName: "ResetPassword",
    ActionLabel: "Reset Password",
    ApiAction: "",
    ApiActiontype: ApiActionType.PUT,
    IsRowAction: true,
    DataType: CustomActionDataType.RowId,
  },)
  }
}
getCode()
</script>
