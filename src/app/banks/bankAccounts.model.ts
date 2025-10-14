export interface BankAccountCreationDto
{
     accountNumber:  string
     accountName:  string
     bankId:  number
}

export interface BankAccountDto
{
     id:  number
     createDate:  string
     lastModifiedDate:  string
     accountNumber: string
     accountName: string
     bank: string
}

export interface BankAccountsPaginateDto
{
    bankAccounts: BankAccountDto[]
    totalRecords: number 
}

export interface BankAccountUpdateDto
{
    accountNumber: string 
    accountName: string 
    bankId: number
}

export interface BankAccountUpdateGetDto
{
    id: number
    accountNumber: string 
    accountName: string 
    bankId: number
}