<template>
  <el-select v-model="editItem" class="m-2" placeholder="Select" size="large" @change="dropdownChange"
    >
      <el-option
        v-for="item in column.dropdownData.data"
        :key="item[column.dropdownData.keyMember]"
        :label="item[column.dropdownData.displayMember]"
        :value="item[column.dropdownData.keyMember]"
      />
    </el-select>
   {{column.dropdownData.keyMember}}
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  // @ts-ignore
  import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
  // @ts-ignore
  import { SearchDTOItem } from '@/components/maynghien/adminTable/Models/SearchDTOItem.ts';
  
      const props  = defineProps<{
      column: TableColumn;
      modelValue?: string;
        
      
  }>();
  const editItem=ref<string|undefined>("");
  const emit = defineEmits<{
      (e: 'update:modelValue',value:string): void;
      (e: 'changed',key:string,value:string): void;
  
  }>();
  
  const dropdownChange=(value:any):void=>{
  
    
    emit('changed',props.column.key, value);
  }
  watch(() => props.modelValue, () => {
    console.log(props.modelValue);
    editItem.value=props.modelValue;
      
  }, { immediate: true })
  </script>