export class CustomerLinkDto{
    url:string|undefined
    camPaignName:string|undefined
    id:string|undefined
    status: number|undefined
    customerId: string|undefined
    linkTemplateId: string | undefined
    inforCustomer: string | undefined
    name:string|undefined
    passport: string | undefined
    phoneNumber: string | undefined
    email: string | undefined
    bankName:string|undefined
    campaignId:string|undefined
    bankId:string|undefined
    teamId:string|undefined
    userName:string|undefined
    teamName:string|undefined


    listCustomerlinkImage: CustomerlinkImageDto[]|undefined
}

export class CustomerlinkImageDto{
    id: string|undefined
    linkImage:string|undefined
    customerLinkId:string|undefined
}