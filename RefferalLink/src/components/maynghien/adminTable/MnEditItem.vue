<template>
    <el-dialog :model-value="openDialog" :title="(isEdit?'Edit ':'Create ')+ title" class="form-dialog" width="30%" @close="emit('onCloseClicked')">

        <div class="editform" v-if="model != undefined">
            <div v-for="column in columns" :key="column.key">
                <div v-if="(isEdit && column.enableEdit == true) || (!isEdit && column.enableCreate == true)">
                    <!-- Use double curly braces to bind variable values in templates -->
                    <label>{{ column.label }}</label>

                    <el-input v-model="model[column.key]" :placeholder="column.label"
                        v-if="column.inputType == undefined || column.inputType == 'text' || column.inputType=='number'"  
                        :type="column.inputType" />


                    <MnDropdown v-if="column.inputType == 'dropdown'" :column="column" @changed="handleUpdateValue"
                   v-model="model[column.key]"
                     >
                    </MnDropdown>
                </div>

            </div>

        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="emit('onCloseClicked')">Cancel</el-button>
                <el-button type="primary" @click="Save">
                    Confirm
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>
  
<script setup lang="ts">
import { ref, toRefs, computed, watch, inject } from 'vue';
// @ts-ignore
import { ElMessage, ElInput } from 'element-plus';
// @ts-ignore
import { handleAPICreate, handleAPIUpdate } from './Service/BasicAdminService.ts'
import type { TableColumn } from './Models/TableColumn';
import MnDropdown from './Input/MnDropdown.vue';
// @ts-ignore
import { SearchDTOItem } from './Models/SearchDTOItem.ts';
const emit = defineEmits<{
    (e: 'onSaved'): void;
    (e: 'onCloseClicked'): void;

}>()
const props = defineProps<{
    columns: TableColumn[];
    editItem: SearchDTOItem;
    apiName: string;
    isEdit: boolean;
    openDialog: boolean;
    title:string;
}>();
// Use computed to create a filtered model
const model = ref<SearchDTOItem>(props.editItem);
const Validate = (): boolean => {
    if (model != undefined)
        props.columns.forEach(column => {
            if (column.enableEdit) {
                const value = model.value[column.key];
                if (column.key == "id" && props.isEdit) {
                    if (value == undefined)
                        return false;
                }
                if (column.required && (value == undefined || value == "")) {
                    return false;
                }
            }

        });
    else return false;
    return true;
}
const Save = async () => {
    const valid = Validate();
    if (valid) {
        if (props.isEdit == true && props.editItem != undefined) {
            var editresult = await handleAPIUpdate(props.editItem, props.apiName);
            if (editresult.isSuccess) {
                ElMessage({
                    message: 'data Updated.',
                    type: 'success',
                });
            }
            else {
                ElMessage.error('Update failed.');
                return;
            }
        }
        else if (props.editItem != undefined) {
            var createresult = await handleAPICreate(props.editItem, props.apiName);
            if (createresult.isSuccess) {
                ElMessage({
                    message: 'data Created.',
                    type: 'success',
                });
            }
            else {
                ElMessage.error('Create failed.');
                return;
            }
        }
        emit("onSaved");
    }
    else {
        ElMessage.error('valid failed.');
    }
}
const handleUpdateValue = (key: string, value: string): void => {
   
    model.value[key] = value;
    console.log(model.value);
}

watch(() => props.editItem, () => {
    model.value = props.editItem;
}, { immediate: true })
</script>

<style>
.form-dialog {
    margin-top: 0;
    margin-right: 0;
    height: 100%;
}
.editform .el-select {
    width: 100%;
}
</style>