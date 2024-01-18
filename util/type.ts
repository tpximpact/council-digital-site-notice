import { Id, Image } from "sanity"

export type Data = {
    _id: Id
    name: string
    address: string
    description: string
    height: number
    reference: string
    commentDeadline: string
    applicationType: string
    image_head?: string
    image_gallery: any[]
}

export type DataObj = {
    data: Data
  }

export type PaginationType = {
    data: Data[]
    paginationData?: Data[]
}

export type CommentForm = {
    [key:number] : string
}

export type PersonalDetailsForm = {
    name : string,
    address: string,
    email: string,
    phone: string,
    postcode: string,
    consent: boolean
}

export type CommentType = {
    onChange: () => void, 
    label: string, 
    commentForm: CommentForm, 
    setCommentForm: (value: any) => void, 
    setQuestion: (value:number) => void, 
    selectedCheckbox: number[], 
    question: number
}

export type PersonalDetailsType = {
    onChange: () => void, 
    personalDetailsForm: PersonalDetailsForm, 
    setPersonalDetailsForm: (value: any) => void, 
    setQuestion:(value:any) => void, 
    selectedCheckbox: number[]
}

export type ImpactType = {
    onChange: () => void, 
    setSelectedCheckbox: (value: number[]) => void, 
    selectedCheckbox: number[], 
    setQuestion: (value: number) => void 
}

export type FeelingType = {
    onChange: () => void, 
    feelingForm: string, 
    setFeelingForm: (value: string) => void
}