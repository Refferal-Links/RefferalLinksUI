<template>
  <el-button @click="DownloadExcel()">In</el-button>
    <Suspense>
      <BasicAdminFormVue 
        :onCloseClicked="handleOnEditCloseClicked"
        :tableColumns="tableColumns"
        :apiName="'CustomerLink'"
        :allowAdd="false"
        :allowEdit="false"
        :allowDelete="false"
        title="CustomerLink"
        :CustomActions="CustomActions"
        @onCustomAction="ChangePage"
      />
    </Suspense>
    <StatusChange
        :CustomerLinkId="idCustomerLink"
        :openDialog="openDialog"
        :v-show="openDialog"
        @close="()=>{ openDialog = false; console.log('close'); }"
      />
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
  import StatusChange from "@/components/CustomerLink/StatusChange.vue";
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest";
import type {Filter} from "@/components/maynghien/BaseModels/Filter";
  
  const token = Cookies.get("accessToken")?.toString() ?? "";
  const decodedToken = jwt.decode(token ?? "") as TokenPayload;
  const userRoles = decodedToken.Roles || [];
  
  const hasTeamleaderRole = hasPermission(userRoles, ["Teamleader"]);
  const hasSaleRole = hasPermission(userRoles, ["Sale"]);
  const hasAdminRole = hasPermission(userRoles, ["Admin", "superadmin"]);
  
  interface TokenPayload {
    Roles: string[];
  }
const customerLinkId = ref("");
const deatailShow = ref(false);
const tableColumns: TableColumn[] = [
{
        key: "id",
        label: "ID",
        width: 1000,
        sortable: true,
        enableEdit: false,

        enableCreate: false,
        required: false,
        hidden: true,
        showSearch: false,
        inputType: "text",
        dropdownData: null,
    },
    {
        key: "name",
        label: "Người dùng",
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
        hidden: hasAdminRole?true:false,
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

        enableCreate: false,
        required: false,
        hidden: false,
        showSearch: hasSaleRole ? false : true,
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
    },
    {
        ActionName: "statusChange",
        ActionLabel: "statusChange",
        ApiActiontype:ApiActionType.PUT,
        IsRowAction: true,
        DataType: CustomActionDataType.RowId,
    }
]);

const idCustomerLink = ref("");
const openDialog = ref<boolean>(false);
function ChangePage(item: CustomActionResponse){
    if(item.Action.ActionName == "Deatail")
    router.push('/CustomerLink/' + item.Data.customerId);
    if(item.Action.ActionName == "statusChange"){
      idCustomerLink.value = item.Data.id
      openDialog.value = true;
      console.log("open");
    }
}
const handleOnEditCloseClicked = async () => {
  openDialog.value = false;
  console.log("Close");
}

function DownloadExcel() {
  var data;
  let searchRequest = reactive<SearchRequest>({
  filters: [
    {
      FieldName: "IsDelete",
      Value: "",
      Operation: undefined,
    },
  ] as Filter[],
  SortBy: undefined,
  PageIndex: 1,
  PageSize: 10,
});
  axiosInstance
    .post("CustomerLink/Download", searchRequest, {
      responseType: "blob",
    })
    .then((response) => {
      data = response.data;
      // Chuyển dữ liệu thành một đối tượng Blob
      const blob = new Blob([data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

      // Tải file về máy
      const filename = "CustomerLink"+new Date().toLocaleDateString("vi-GB")+".xlsx";
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    });
}
</script>