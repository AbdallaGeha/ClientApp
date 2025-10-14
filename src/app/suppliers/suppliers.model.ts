export interface SupplierCreationDto
{
     name: string
     phone: string | null
     email: string | null
     address: string | null
}

export interface SupplierDto
{
    id: number
    createDate: string
    lastModifiedDate: string
    name: string
    phone: string | null
    email: string | null
    address: string | null
}

export interface SuppliersPaginateDto
{
    suppliers: SupplierDto[]
    totalRecords: number
}

export interface SupplierUpdateDto
{
    name: string
    phone: string | null
    email: string | null
    address: string | null
}

export interface SupplierUpdateGetDto
{
    id: number
    name: string
    phone: string | null
    email: string | null
    address: string | null
}