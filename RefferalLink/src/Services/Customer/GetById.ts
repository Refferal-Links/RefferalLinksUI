import type { CustomerDto } from "@/Models/Dtos/CustomerDto";
import { AppResponse } from "@/Models/AppResponse";
import { axiosInstance } from "../axiosConfig";


export const GetCustomer = async (Id: string): Promise<AppResponse<CustomerDto>> => {
    let result: AppResponse<CustomerDto>=({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        await axiosInstance.get("/Customer/"+Id).then((response) => {
            result = response.data;
        })
    }
    catch(ex){
        console.error(ex);
    }
    return result;
}