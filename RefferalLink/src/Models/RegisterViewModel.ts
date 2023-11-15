
export class RegisterViewModel{
    name:string | undefined;
    passport: boolean;
    phoneNumber: string | undefined;
    cccd: string | undefined;
    email: string | undefined;
    refferalCode: string | undefined;
    provinceId: string | undefined

    constructor(){
        this.passport = true
    }
}