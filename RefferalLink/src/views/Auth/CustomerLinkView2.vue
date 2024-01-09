<template>
  <Suspense>
    <BasicAdminFormVue
      :onCloseClicked="handleOnEditCloseClicked"
      :tableColumns="tableColumns"
      :apiName="'CustomerLink'"
      :allowAdd="false"
      :allowEdit="hasAdminRole || hasSUPRole || hasTeamleaderRole"
      :allowDelete="hasAdminRole == true ? true : false"
      title="CustomerLink"
      :CustomActions="CustomActions"
      @onCustomAction="ChangePage"
      :scroll="true"
      :changePageSize="true"
    />
  </Suspense>
  <StatusChange
    :CustomerLinkId="idCustomerLink"
    :openDialog="openDialog"
    :v-show="openDialog"
    @close="
      () => {
        openDialog = false;
        console.log('close');
      }
    "
  />
</template>

<script lang="ts" setup>
import BasicAdminFormVue from "@/components/maynghien/adminTable/BasicAdminForm.vue";
import {
  ApiActionType,
  CustomAction,
  CustomActionDataType,
  CustomActionResponse,
} from "@/components/maynghien/adminTable/Models/CustomAction";
// @ts-ignore
import { TableColumn } from "@/components/maynghien/adminTable/Models/TableColumn.ts";
import router from "@/router";
import { axiosInstance } from "@/Services/axiosConfig";
import Cookies from "js-cookie";
import { ref, reactive, type Ref } from "vue";
import StatusChange from "@/components/CustomerLink/StatusChange.vue";
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest";
import type { Filter } from "@/components/maynghien/BaseModels/Filter";
import { LoginResult } from "@/Models/LoginResult";

const hasTeamleaderRole = ref<boolean>(false);
const hasSaleRole = ref<boolean>(false);
const hasAdminRole = ref<boolean>(false);
const hasSUPRole = ref<boolean>(false);
const CustomActions: CustomAction[] = [
  {
    ActionName: "Deatail",
    ActionLabel: "Link",
    ApiActiontype: ApiActionType.PUT,
    IsRowAction: true,
    DataType: CustomActionDataType.RowId,
  },
  {
    ActionName: "statusChange",
    ActionLabel: "Đổi trạng thái",
    ApiActiontype: ApiActionType.PUT,
    IsRowAction: true,
    DataType: CustomActionDataType.RowId,
  },

];
function checkRole() {
  try {
    var jsonString = Cookies.get("Roles")?.toString() ?? "";
    var jsonObject = JSON.parse(jsonString);
    var Roles = Object.values(jsonObject) as string[];
    console.log(Roles);
    hasTeamleaderRole.value = hasPermission(Roles, ["Teamleader"]);
    hasSaleRole.value = hasPermission(Roles, ["Sale", "CSKH"]);
    hasAdminRole.value = hasPermission(Roles, ["Admin", "superadmin"]);
    hasSUPRole.value = hasPermission(Roles, ["SUP"]);
    if(!hasSaleRole.value){
      CustomActions.push({
        ActionName: "Export",
        ActionLabel: "Export",
        ApiActiontype: ApiActionType.PUT,
        IsRowAction: false,
        DataType: CustomActionDataType.Filters,
      })
    }
  } catch (error) {
    console.error(error);
  }
}
checkRole();
interface TokenPayload {
  Roles: string[];
}
const customerLinkId = ref("");
const deatailShow = ref(false);
const tableColumns: TableColumn[] = [
  {
    key: "id",
    label: "ID",
    width: 100,
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
    label: "Khách hàng",
    width: 100,
    sortable: true,
    enableEdit: true,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: true,
    inputType: "text",
    dropdownData: null,
  },
  {
    key: "passport",
    label: "Căn cước công dân",
    width: 100,
    sortable: true,
    enableEdit: true,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: true,
    inputType: "text",
    dropdownData: null,
  },
  
  {
    key: "email",
    label: "Email",
    width: 100,
    sortable: true,
    enableEdit: true,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: true,
    inputType: "text",
    dropdownData: null,
  },
  {
    key: "inforCustomer",
    label: "Thông tin khách hàng",
    width: 300,
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
    key: "phoneNumber",
    label: "Số điện thoại",
    width: 130,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: true,
    inputType: "phoneNumber",
    dropdownData: null,
  },
  {
    key: "bankName",
    label: "Ngân Hàng",
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
    key: "camPaignName",
    label: "Chiến Dịch",
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
    key: "campaignId",
    label: "Chiến Dịch",
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
    key: "teamId",
    label: "Đội",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: hasAdminRole.value ? true : false,
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
    key: "userName",
    label: "Nhân viên Sale",
    width: 100,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: hasSaleRole.value == false ? true : false,
    inputType: "dropdown",
    dropdownData: {
      displayMember: "userName",
      keyMember: "id",
      apiUrl: "UserManagemet/sale",
    },
  },
  {
    key: "refferalCode",
    label: "Mã NV",
    width: 100,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: true ,
    inputType: "text",
    dropdownData:null
  },
  {
    key: "nvCSKH",
    label: "Nhân viên CSKH",
    width: 100,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch:  true,
    inputType: "dropdown",
    dropdownData:{
      displayMember: "userName",
      keyMember: "id",
      apiUrl: "UserManagemet/cskh",
    },
  },
  {
    key: "codeNVCSKH",
    label: "Mã NVCSKH",
    width: 100,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false ,
    inputType: "text",
    dropdownData:null
  },
  {
    key: "statusText",
    label: "Trạng thái",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: true,
    inputType: "dropdown",
    dropdownData: {
            displayMember: "statusText",
            keyMember: "status",
            data: [
                {
                    status: "0",
                    statusText: "Pending"
                },
                {

                    status: "1",
                    statusText: "Approved"
                },
                {

                    status: "2",
                    statusText: "Rejected"
                },
                {

                    status: "3",
                    statusText: "Cancel"
                },
            ]

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
    hidden: false,
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
    hidden: false,
    showSearch: true,
    inputType: "date",
    dropdownData: null
  },
  {
    key: "note",
    label: "Ghi chú Sale",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: "dropdown",
    dropdownData: null
  },
  {
    key: "noteCSKH",
    label: "Ghi chú CSKH",
    width: 100,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: "dropdown",
    dropdownData: null
  },
  {
    key: "image1",
    label: "ảnh 1",
    width: 70,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: 'link',
    dropdownData: null
  },
  {
    key: "image2",
    label: "ảnh 2",
    width: 70,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: 'link',
    dropdownData: null
  },
  {
    key: "image3",
    label: "ảnh 3",
    width: 70,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: 'link',
    dropdownData: null
  },
  {
    key: "image4",
    label: "ảnh 4",
    width: 70,
    sortable: false,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: 'link',
    dropdownData: null
  },
  {
    key: "idUser",
    label: "Sale",
    width: 70,
    sortable: false,
    enableEdit: hasSUPRole.value || hasAdminRole.value ? true : false,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: false,
    inputType: 'dropdown',
    dropdownData: {
      displayMember: "userName",
      keyMember: "id",
      apiUrl: "UserManagemet/sale",
    },
  },
  {
    key: "provinceId",
    label: "Tỉnh thành",
    width: 70,
    sortable: false,
    enableEdit: true,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: false,
    inputType: 'dropdown',
    dropdownData: {
      displayMember: "name",
      keyMember: "id",
      apiUrl: "Province",
    },
  },
];

function hasPermission(userRoles: string[], requiredRoles: string[]): boolean {
  for (const requiredRole of requiredRoles) {
    if (userRoles.includes(requiredRole)) {
      return true;
    }
  }
  return false;
}



const idCustomerLink = ref("");
const openDialog = ref<boolean>(false);
function ChangePage(item: CustomActionResponse) {
  if (item.Action.ActionName == "Deatail"){
    router.push("/CustomerLink/" + item.Data.customerId);
  }
    
  if (item.Action.ActionName == "statusChange") {
    idCustomerLink.value = item.Data.id;
    openDialog.value = true;
    console.log("open");
  }
  if (item.Action.ActionName == "Export") {
    DownloadExcel(item.Data);
  }
}
const handleOnEditCloseClicked = async () => {
  openDialog.value = false;
  console.log("Close");
};

function DownloadExcel(filters: Ref<Filter[]> | undefined) {
  var data;
  var filter = filters?.value.filter((x) => x.Value != null && x.Value != "");
  let searchRequest = reactive<SearchRequest>({
    filters: filter?.slice(),
    SortBy: undefined,
    PageIndex: 1,
    PageSize: 10,
  });
  if(searchRequest.filters != undefined)
  for(let i = 0; i < searchRequest.filters.length; i++){
        if(searchRequest.filters[i].Type == "date"){
            var value = searchRequest.filters[i].Value?.toString();
            var filename = searchRequest.filters[i].FieldName?.toString()
            searchRequest.filters.splice(i,1);
            searchRequest.filters.push({FieldName: filename, DisplayName: filename, Value: value, Operation: "", Type: "text", dropdownData: undefined});
            i--
        }
    }
    console.log(searchRequest);
  axiosInstance
    .post("CustomerLink/Download", searchRequest, {
      responseType: "blob",
    })
    .then((response) => {
      data = response.data;
      // Chuyển dữ liệu thành một đối tượng Blob
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      // Tải file về máy
      const filename =
        "CustomerLink" + new Date().toLocaleDateString("vi-GB") + ".xlsx";
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    });
}
</script>
