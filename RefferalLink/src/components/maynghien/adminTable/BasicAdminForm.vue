
<template>
    <MnActionPane :allowAdd="true" :tableColumns="tableColumns"  :isEdit="isEditting"
    @onBtnSearchClicked="handleBtnSearchClicked" @onBtnAddClicked="handleOpenCreate"  :openDialog="openDialogCreate" >
    </MnActionPane>
    <MnTable :columns="tableColumns" :datas="datas" :onSaved="handleSaved" 
      :onCloseClicked="handleOnEditCloseClicked"/>
      <MnEditItem ref="MnEdit"
        :columns="tableColumns" 
        :apiName="apiName"
        :openDialog="openDialogCreate"
        :editItem="EdittingItem"
        :isEdit="isEditting"
        @onSaved="handleSaved"
        @onCloseClicked="handleOnEditCloseClicked"/>
  </template>
    
  <script setup lang="ts">
  
  // @ts-ignore
  import MnTable from './MnTable.vue'
  
  // @ts-ignore
  import MnActionPane from './MnActionPane.vue'
  // @ts-ignore
  import MnEditItem from './MnEditItem.vue'
  
  import { ref,provide  } from 'vue';
  // @ts-ignore
  import { TableColumn } from './Models/TableColumn.ts'
  // @ts-ignore
  import { SearchDTOItem } from './Models/SearchDTOItem.ts'
  
  // @ts-ignore
  import { handleSearch } from './Service/BasicAdminService.ts'
  
  // @ts-ignore
  import { Filter } from '../BaseModels/Filter';
  // @ts-ignore
  import { SearchResponse } from '../BaseModels/SearchResponse';
  import { SearchRequest } from '../BaseModels/SearchRequest';
  import type { AppResponse } from '@/models/AppResponse';
  
  //#region Method
  
  const Search = async () => {
    var searchApiResponse = await handleSearch(searchRequest, props.apiName);
    if (searchApiResponse.isSuccess) {
      let dataresponse: SearchResponse<SearchDTOItem[]> = searchApiResponse.data;
  
      if (dataresponse != undefined && dataresponse.data != undefined && dataresponse.data.length > 0) {
        datas.value = dataresponse.data;
  
      }
      else {
        datas.value = [];
      }
    }
  }
  
  //#endregion
  //#region main
  
  const props = defineProps<{
    tableColumns: TableColumn[];
    apiName: string;
    allowAdd: boolean;
    allowEdit: boolean;
    allowDelete: boolean;
  }>();
  let datas = ref<SearchDTOItem[]>([]);
  let searchRequest: SearchRequest = {
    PageIndex: 1,
    PageSize: 10,
    filters: undefined,
    SortByInfo: undefined
  }
  await Search();
  //#endregion
  //#region variable
  const SelectedRowId = ref<string | null>(null);
  const EdittingItem=ref<SearchDTOItem>({});
  const openDialogCreate = ref<boolean>(false);
  const isEditting=ref(false);
  //#endregion
  
  //#region event funcs
  const handleBtnSearchClicked = (filters: Filter[]) => {
  
    searchRequest.filters = filters;
    searchRequest.PageIndex = 1;
    Search();
  
  }
  const handleSaved = async () => {
    openDialogCreate.value = false;
    searchRequest.PageIndex = 1;
    EdittingItem.value =new SearchDTOItem(props.tableColumns);
    Search();
  }
  const handleOnEditCloseClicked = async () => {
    openDialogCreate.value = false;
    EdittingItem.value =new SearchDTOItem(props.tableColumns);
  }
  type OpenCreateDialogType = () => void;
  type ChildMethodType = () => void;
  
  // // Explicitly specify the type of the injected value with a default value
  // const childMethod: ChildMethodType|undefined = inject('childMethod', undefined);
  
  // const OpenCreateDialog: OpenCreateDialogType = inject('OpenDialogEditItem', undefined);
  
  const handleOpenCreate = async () => {
    console.log("open create");
    
    EdittingItem.value =new SearchDTOItem(props.tableColumns);
    console.log(EdittingItem.value);
    isEditting.value=false;
    openDialogCreate.value=true;
  }
  const SelectedId=ref("");
  //provide('OpenDialogCreateItem', openDialogCreate);
  const handleEdit = async (id:string) => {
    
    SelectedId.value=id;
    openDialogCreate.value=true;
  }
  //#endregion
  </script>