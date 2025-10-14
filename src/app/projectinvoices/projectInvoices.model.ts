export const Created_State = 1;
export const Approved_State = 2;

export interface ProjectInvoiceItemCreationDto
{
    itemId : number
    Unit : string
    Quantity : number
    Price : number
}

export interface ProjectInvoiceItemUpdateDto
{
    id : number
    itemId : number
    unit : string
    quantity : number
    price : number
}

export interface ProjectInvoiceItemUpdateGetDto
{
    id : number 
    itemId : number 
    unit : string
    quantity : number 
    price : number 
}

export interface ProjectInvoiceCreationDto
{
    referenceNumber : string 
    date : Date
    projectId : number
    supplierId : number
    state : number
    items : ProjectInvoiceItemCreationDto[]
}

export interface ProjectInvoiceUpdateDto
{
    referenceNumber : string 
    date : Date 
    projectId : number
    supplierId : number
    state : number
    items : ProjectInvoiceItemUpdateDto[] 
}

export interface ProjectInvoiceUpdateGetDto
{
    id : number
    referenceNumber : string
    date : string
    projectId : number
    supplierId : number
    state : number
    items : ProjectInvoiceItemUpdateGetDto[]
}

export interface ProjectInvoicePaymentReadyToPayDto
{
    id : number
    date : Date
    amount : number
    invoiceId : number
    invoiceReference : string
    invoiceDate : Date
    supplierId : number
    supplier : string
    projectId : number
    project : string
}

export interface ProjectInvoiceCashCreationDto
{
    date : Date
    amount : number
}

export interface ProjectInvoiceCheckCreationDto
{
    date : Date
    amount : number
    bankAccountId : number
    checkNumber : string
}

export interface ProjectInvoiceCheck
{
    date : Date
    amount : number
    bankAccount : string
    checkNumber : string
}

export interface ProjectInvoiceCash
{
    date : Date
    amount : number
}

export interface ProjectInvoicePaymentCreationDto
{
    paymentId  : number
    checksList : ProjectInvoiceCheckCreationDto[]
    CashList : ProjectInvoiceCashCreationDto[]
}

export interface  ProjectInvoiceGroupPaymentCreationDto
{
    paymentIds : number[]
    checksList : ProjectInvoiceCheckCreationDto[]
    CashList : ProjectInvoiceCashCreationDto[]
}



export interface ProjectInvoiceViewDto
{
    id : string
    referenceNumber : string
    date : string
    project : string
    supplier : string
    state : string
    amount : number
}

export interface ProjectInvoiceViewResponseDto
{
    data : ProjectInvoiceViewDto[]   
    totalRecords : number
}

export interface ProjectInvoiceViewRequestDto
{
    id : number | null
    reference : string | null
    projectId : number | null
    supplierId : number | null
    state : number | null
    fromDate : Date | null
    toDate : Date | null
    page : number
    pageSize : number
}