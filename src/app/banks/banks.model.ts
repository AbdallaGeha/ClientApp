export interface BankCreationDto
{
     name: string
}

export interface BankDto
{
    id: number
    createDate: string
    lastModifiedDate: string
    name: string
}

export interface BankSearchDto
{
    pageNumber: number
    pageSize: number
    search: string
}

export interface BanksPaginateDto
{
    banks: BankDto[]
    totalRecords: number
}

export interface BankUpdateDto
{
    name: string
}

export interface BankUpdateGetDto
{
    id: number
    name: string
}