
export class TableColumn {
    key: string="";
    label: string="";
    width: number =0;
    sortable:boolean=true;
    enableEdit:boolean=true;
    required: boolean = false;
    hidden:boolean=false;
    showSearch:boolean=false;
    inputType:string="text";
    dropdownData:any|null;
    
    constructor(){
       
    };
    
}
