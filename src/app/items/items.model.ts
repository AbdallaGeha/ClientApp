export interface ItemCreationDto
{
     name: string
     unit: string
     affectInventory: boolean
}

export interface ItemDto
{
    id: number
    createDate: string
    lastModifiedDate: string
    name: string
    unit: string
    affectInventory: string
}

export interface ItemsPaginateDto
{
    items: ItemDto[]
    totalRecords: number
}

export interface ItemUpdateDto
{
    name: string
    unit: string
    affectInventory: boolean
}

export interface ItemUpdateGetDto
{
    id: number
    name: string
    unit: string
    affectInventory: boolean    
}