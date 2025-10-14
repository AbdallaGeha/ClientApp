export const project_new_state = 1;
export const project_executed_state = 2;

export interface ProjectCreationDto
{
     name: string
     state: number
}

export interface ProjectDto
{
    id: number
    createDate: string
    lastModifiedDate: string
    name: string
    state: string
}

export interface ProjectsPaginateDto
{
    projects: ProjectDto[]
    totalRecords: number
}

export interface ProjectUpdateDto
{
    name: string
    state: number
}

export interface ProjectUpdateGetDto
{
    id: number
    name: string
    state: number
}