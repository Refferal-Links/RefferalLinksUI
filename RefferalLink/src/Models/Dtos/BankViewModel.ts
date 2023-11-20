import type { CustomerLinkDto } from "./CustomerLinkDto"

export class Bank {
    id: string| undefined
    name: string|undefined

    customerLinks: CustomerLinkDto[] | undefined
}