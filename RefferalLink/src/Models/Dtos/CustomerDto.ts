import type { Bank } from "./BankViewModel";

export class CustomerDto {
    id: string | undefined;
    name: string | undefined;
    phoneNumber: string | undefined;
    email: string|undefined;
    passport:string|undefined;
    refferalCode:string|undefined;
    nameProvice:string|undefined;
    provinceId: string | undefined;
    banks: Bank[] | undefined;    
}