import { Id } from "sanity"

export type Housing = {
    affordableResidentialUnits: number
    residentialUnits: number
}

export type Jobs = {
    min: number
    max: number
}

export type ProposedLandUse = {
    classB: boolean
    classC: boolean
    classE: boolean
    classF: boolean
    suiGeneris: boolean
    suiGenerisDetail: string
}

export type Data = {
    _id: Id
    name: string
    development_address: string
    image: string
}

export type DataDetails = {
    massings?: string
    name?: string
    development_description?: string
    development_address?: string
    application_type?: string
    proposedLandUse?: ProposedLandUse
    height?: number
    constructionTime?: string
    applicationNumber?: string
    housing?: Housing
    showHousing?: boolean
    showHealthcare?: boolean
    healthcareDemand?: number
    showOpenSpace?: boolean
    openSpaceArea?: number
    showJobs?: boolean
    jobs?: Jobs
    showCarbon?: boolean
    carbonEmissions?: number
    showAccess?: boolean



}

export type DataTypeArray = {
    data: Data[]
  }

export type PaginationType = {
    dataId: {_id: string}[]
    data: Data[]
}