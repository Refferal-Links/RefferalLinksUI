<template>
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
import { ref, reactive } from "vue";
import StatusChange from "@/components/CustomerLink/StatusChange.vue";
import type { SearchRequest } from "@/components/maynghien/BaseModels/SearchRequest";
import type { Filter } from "@/components/maynghien/BaseModels/Filter";
import { LoginResult } from "@/Models/LoginResult";

const hasTeamleaderRole = ref<boolean>(false);
const hasSaleRole = ref<boolean>(false);
const hasAdminRole = ref<boolean>(false);
function checkRole() {
  try {
    var jsonString = Cookies.get("Roles")?.toString() ?? "";
    var jsonObject = JSON.parse(jsonString);
    var Roles = Object.values(jsonObject) as string[];
    console.log(Roles);
    hasTeamleaderRole.value = hasPermission(Roles, ["Teamleader"]);
    hasSaleRole.value = hasPermission(Roles, ["Sale"]);
    hasAdminRole.value = hasPermission(Roles, ["Admin", "superadmin"]);
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
    hidden: true,
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
    hidden: true,
    showSearch: true,
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
    hidden: true,
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
    hidden: true,
    showSearch: true,
    inputType: "text",
    dropdownData: null,
  },
  {
    key: "inforCustomer",
    label: "Thông tin khách hàng",
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
    showSearch: hasAdminRole ? true : false,
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
    hidden: hasAdminRole ? true : false,
    showSearch: false,
    inputType: "text",
    dropdownData: null,
  },
  {
    key: "userName",
    label: "Nhân viên",
    width: 1000,
    sortable: false,
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
  {
    key: "refferalCode",
    label: "Code",
    width: 1000,
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
    width: 1000,
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
    key: "createOn",
    label: "Ngày tạo   ",
    width: 1000,
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
    key: "modifiedOn",
    label: "Ngày hỗ trợ",
    width: 1000,
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
    key: "note",
    label: "Ghi chú",
    width: 1000,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: true,
    showSearch: false,
    inputType: "dropdown",
    dropdownData: null
  },
  {
    key: "image1",
    label: "ảnh 1",
    width: 1000,
    sortable: true,
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
    width: 1000,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: 'image',
    dropdownData: null
  },
  {
    key: "image3",
    label: "ảnh 3",
    width: 1000,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: 'image',
    dropdownData: null
  },
  {
    key: "image4",
    label: "ảnh 4",
    width: 1000,
    sortable: true,
    enableEdit: false,

    enableCreate: false,
    required: false,
    hidden: false,
    showSearch: false,
    inputType: 'image',
    dropdownData: null
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
  {
    ActionName: "Export",
    ActionLabel: "Export",
    ApiActiontype: ApiActionType.PUT,
    IsRowAction: false,
    DataType: CustomActionDataType.Filters,
  },
];

const idCustomerLink = ref("");
const openDialog = ref<boolean>(false);
function ChangePage(item: CustomActionResponse) {
  if (item.Action.ActionName == "Deatail")
    router.push("/CustomerLink/" + item.Data.customerId);
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

function DownloadExcel(filters: Filter[] | undefined) {
  var data;
  let searchRequest = reactive<SearchRequest>({
    filters: filters,
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
