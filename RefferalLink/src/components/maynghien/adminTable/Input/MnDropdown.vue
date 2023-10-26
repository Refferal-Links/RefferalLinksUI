<template>
    <el-select v-bind="modelValue" class="m-2" placeholder="Select" size="large" @change="dropdownChange"
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
    // @ts-ignore
    import { TableColumn } from '@/components/maynghien/adminTable/Models/TableColumn.ts';
    // @ts-ignore
    import { SearchDTOItem } from '@/components/maynghien/adminTable/SearchDTOItem.ts';
    
        const props  = defineProps<{
        column: TableColumn;
        modelValue: string;
        
    }>();
    const emit = defineEmits<{
        (e: 'update:modelValue',value:string): void;
    
    }>();
    const dropdownChange=(value:any):void=>{
      console.log("changed")
      console.log(value);
      console.log(props.modelValue);
      emit('update:modelValue', value);
    }
    
    </script>