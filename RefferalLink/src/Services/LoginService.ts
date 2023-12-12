// @ts-ignore
import { LoginViewModel } from '../models/LoginViewModel.ts'
// @ts-ignore
import { AppResponse } from '../models/AppResponse.ts'
// @ts-ignore
import { axiosInstance } from "./axiosConfig.ts"

import Cookies from 'js-cookie';
import { reactive } from 'vue';
import type { LoginResult } from '@/Models/LoginResult.js';
const loginUrl = "Account/login";

export const handleLogin = async (model: LoginViewModel): Promise<AppResponse<LoginResult>> => {

    let resust: AppResponse<LoginResult>=({
        isSuccess: false,
        message: '',
        data: undefined
    });

    try {
        const postResult = await axiosInstance.post(loginUrl, model);
        console.log(postResult.data);
        const responseObject = postResult.data
        resust = responseObject;
        if (resust.isSuccess) {
            if(resust.data!=undefined){
                Cookies.set('accessToken', resust.data.token ?? "", { expires: undefined });
                Cookies.set('UserName', resust.data.userName ?? "", { expires: undefined });
                Cookies.set('RefferalCode', resust.data.refferalCode ?? "", { expires: undefined });
                Cookies.set('Roles', JSON.stringify(resust.data.roles) ?? "", { expires: undefined });
                Cookies.set('TeamId', resust.data.teamId ?? "", { expires: undefined });
                Cookies.set('TpBank', resust.data.tpBank ?? "", { expires: undefined });
            }
            
        }
        else {
            console.log(resust.message);

        }
    } catch (error) {
        console.error(error);

    }
    return resust;

}

