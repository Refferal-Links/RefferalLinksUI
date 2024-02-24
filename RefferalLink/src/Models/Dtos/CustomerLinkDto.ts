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

    createOn: string|undefined
    modifiedOn: string|undefined
    note: string|undefined
    customerCancel: boolean|undefined

    image1: string|undefined
    image2: string|undefined
    image3: string|undefined
    image4: string|undefined

    nvCSKH: string|undefined
    codeNVCSKH: string|undefined

    listCustomerlinkImage: CustomerlinkImageDto[]

    noteCSKH: string|undefined

    constructor() {
        this.listCustomerlinkImage = [];
    }
}

export class CustomerlinkImageDto{
    id: string|undefined
    linkImage:string
    customerLinkId:string|undefined

    constructor() {
        this.linkImage = "";
    }
}