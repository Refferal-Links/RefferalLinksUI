export class SearchDTOItem {
    [key: string]: any;
    constructor(columns:TableColumn[]){
        columns.forEach(column => {
            this[column.key]= "";
        });
    }
}

// @ts-ignore
import {TableColumn} from "./TableColumn.ts"