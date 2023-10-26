
// @ts-ignore
import { AppResponse } from '../../../../models/AppResponse.js'

// @ts-ignore
import { SearchRequest } from '../../BaseModels/SearchRequest.js'

// @ts-ignore
import { SearchResponse } from '../../BaseModels/SearchResponse.js'
// @ts-ignore
import { axiosInstance } from "../../../../Services/axiosConfig.js"
// @ts-ignore
import Filter  from '../../BaseModels/Filter.js'
// @ts-ignore
import SortByInfo  from '../../BaseModels/SortByInfo.js';


// @ts-ignore
import { TableColumn } from '../Models/TableColumn.ts'
// @ts-ignore
import { SearchDTOItem } from '../Models/SearchDTOItem.ts'


export const handleSearch = async (model: SearchRequest, apiurl:string): Promise<AppResponse<SearchResponse<SearchDTOItem[]|undefined>>> => {

    let resust: AppResponse<SearchResponse<SearchDTOItem[]|undefined>>=({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const postResult = await axiosInstance.post(apiurl+"/search", model);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}

export const handleCreate = async (model: SearchDTOItem, apiurl:string): Promise<AppResponse<SearchDTOItem|undefined>> => {

    let resust: AppResponse<SearchDTOItem|undefined>=({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const postResult = await axiosInstance.post(apiurl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}

export const handleUpdate = async (model: SearchDTOItem, apiurl:string): Promise<AppResponse<SearchDTOItem|undefined>> => {

    let resust: AppResponse<SearchDTOItem|undefined>=({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const postResult = await axiosInstance.put(apiurl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            return resust;
        }
        else {
            console.log(resust.message);
            return resust;
        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}
