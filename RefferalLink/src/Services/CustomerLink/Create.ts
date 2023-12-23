import { AppResponse } from "@/Models/AppResponse";
import type { CustomerLinkDto } from "@/Models/Dtos/CustomerLinkDto";
import { axiosInstance } from "../axiosConfig";



export const handelCreateCustomerLink =async (model : CustomerLinkDto) : Promise<AppResponse<CustomerLinkDto>> =>{
    var result = new AppResponse<CustomerLinkDto>();

    try {
        const postResult = await axiosInstance.post("/CustomerLink", model);
        // console.log(postResult.data);
        const responseObject = postResult.data
        if(responseObject.isSuccess){
            result = responseObject;   
        }
        else{
            console.log(responseObject.message);
        }
    }
    catch (error) {
        console.error(error);
    }

    return result;
}