<template>
    <el-row>
        <el-col :span="24">
            <el-row class="ep-bg-purple-dark el-col-24 action-pane">
                <el-col :span="24">
                    <el-row>
                        <div v-for="filter in filters">

                            <el-input v-model="filter.Value" :placeholder="filter.DisplayName"
                                v-if="filter.Type == undefined || filter.Type == 'text'">
                            </el-input>
                            <el-select v-model="filter.Value" :placeholder="filter.DisplayName"
                                v-if="filter.Type == 'dropdown'">
                                <el-option v-for="item in filter.dropdownData.data"
                                    :key="item[filter.dropdownData.keyMember]"
                                    :label="item[filter.dropdownData.displayMember]"
                                    :value="item[filter.dropdownData.keyMember]" />
                            </el-select>
                        </div>
                        <el-button v-if="filters != undefined && filters.length > 0" :icon="Search" 
                            @click="handlebtnSearchClicked"> search</el-button>

                    </el-row>

                </el-col>



            </el-row>
            <el-row>
                <el-col :span="12" class="buttons">

                    <el-button :icon="Plus"  @click="handlebtnAddClicked" v-if="allowAdd"> Create</el-button>
                </el-col>

            </el-row>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import {
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Star,
    Plus,
} from '@element-plus/icons-vue';

// @ts-ignore
import { TableColumn } from './Models/TableColumn.ts'

// @ts-ignore
import { Filter } from '../BaseModels/Filter';

import { ref } from 'vue';
import type { CustomAction } from './Models/CustomAction';
const props = defineProps<{
    tableColumns: TableColumn[];
    allowAdd: boolean;
    CustomActions: CustomAction[];
}>();

const emit = defineEmits<{
    (e: 'onBtnAddClicked'): void;
    (e: 'onBtnSearchClicked', filters: Filter[]): void;
}>();
const filters = ref<Filter[]>([]);

props.tableColumns.forEach(colum => {
    if (colum.showSearch) {
        const newFilter: Filter = {
            FieldName: colum.key,
            DisplayName: colum.label,
            Value: "",
            Operation: "",
            Type: colum.inputType,
            dropdownData: colum.dropdownData,
        };
        filters.value?.push(newFilter);
    }
});
const handlebtnAddClicked = () => {
    //console.log("btn add click");
    emit("onBtnAddClicked");
    //console.log("not err");
}
const handlebtnSearchClicked = () => {
    const filtersRequest = filters.value.filter(filter => filter.Value !== null && filter.Value !== undefined && filter.Value != "");

    emit("onBtnSearchClicked", filtersRequest);
}
</script>
<style >
.action-pane {
    width: "100%";
    padding: 10px;
}

.action-pane .buttons {
    float: right;
    text-align: right;
}

button {
    margin-left: 5px;
}
</style>