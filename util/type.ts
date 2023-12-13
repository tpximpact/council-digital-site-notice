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
    image: string
}

export type DataObj = {
    data: Data
  }

export type PaginationType = {
    data: Data[]
    paginationData?: Data[]
}