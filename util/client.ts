import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {parse, getYear, getMonth, getDate, formatDistanceStrict} from 'date-fns'
import { groq } from "next-sanity"



export const  client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false, 
    apiVersion: '2023-11-15', 
    token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN
})

const builder = imageUrlBuilder(client)

export async function getLambethApplications() {
    const posts = await client.fetch('*[_type == "planning-application" && isActive == true] {_id}')
    return posts
}

export async function getCamdenApplications() {
    const posts = await client.fetch('*[_type == "planning-application"] {_id}')
    return posts
}

export async function getLambethApplicationsPagination({_id, itemsPerPage}: {_id?:any, itemsPerPage:number}) {
    let posts
    if (_id === undefined) {
        posts = await client.fetch(`*[_type == "planning-application" && isActive == true] | order(_id) [0...${itemsPerPage}] {_id, image, development_address, name}`)
    } else {
        posts = await client.fetch(`*[_type == "planning-application" && isActive == true && _id >= $_id] | order(_id) [0...${itemsPerPage}] {_id, image, development_address, name}`, {_id})
    }

    return posts
}

export async function getCamdenApplicationsPagination({_id, itemsPerPage}: {_id?:any, itemsPerPage:number}) {
    // Helper method to convert a JS array to a string for a SOQL query
    const arrayToSoqlString = (arr: []) => "'" + arr.toString().replace(/,/g , "','") + "'"
    const limit = 50;


  // First, fetch the data from the CMS

let cmsData : any = []
  if (_id === undefined) {
    cmsData = await client.fetch(groq`*[_type == "planning-application"] | order(_id) [0...${itemsPerPage}] {...}`);
  } else {
    cmsData = await client.fetch(groq`*[_type == "planning-application" && _id >= $_id] | order(_id) [0...${itemsPerPage}] {...}`, {_id});
  }

  // Then fetch the matching data from Camden's API
  const ids = cmsData.map((development: any) => development.applicationNumber);

  let whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}.json?$limit=${limit}&$where=${whereQuery}`)
  const data = await res.json()

  // Build up the array of developments from the CMS data and the data from Camden's API, mapping from Camden's API so we know we're only showing
  // developments that exist in M3 and the Planning Explorer
    const developments = data.map((development: any) => {
    const siteNotice = cmsData.find((el: any) => el.applicationNumber == development.application_number);

  // Skip if there's no CMS data
    if (!siteNotice) { return }

    return {
      development_address : development.development_address,
      name: siteNotice.name ? siteNotice.name : development.development_description,
      _id: siteNotice._id
    }
  });

  // ADD SEARCH POSTCODE

  return developments

}

export async function getActiveApplications() {
    const posts = process.env.NEXT_PUBLIC_DATA_PROVIDER === 'OpenData' ? getCamdenApplications() : getLambethApplications()
    return posts
}

export async function getActiveApplicationsPagination({_id, itemsPerPage}: {_id?:any, itemsPerPage:number}) {
    let posts
    if(process.env.NEXT_PUBLIC_DATA_PROVIDER == 'OpenData') {
        posts = getCamdenApplicationsPagination({_id, itemsPerPage})
    } else {
        posts = getLambethApplicationsPagination({_id, itemsPerPage})
    }
    return posts
}

export async function getLambethActiveApplicationById(id: string) {
    const query = '*[_type == "planning-application" && _id == $_id]'
    const post = await client.fetch(query, { _id:id })
    return post
}
export async function getCamdenActiveApplicationById(id: string) {
  const query = '*[_type == "planning-application" && _id == $_id]'
  const cmsData = await client.fetch(query, { _id:id })

  // Then fetch the matching data from Camden's API
  const ids = cmsData.map((development: any) => development.applicationNumber);
  const arrayToSoqlString = (arr: []) => "'" + arr.toString().replace(/,/g , "','") + "'"
  let whereQuery = `application_number in(${arrayToSoqlString(ids)})`;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}.json?$where=${whereQuery}`)
  const data = await res.json()

  // Build up the array of developments from the CMS data and the data from Camden's API, mapping from Camden's API so we know we're only showing
  // developments that exist in M3 and the Planning Explorer
    const developments = data.map((development: any) => {
    const siteNotice = cmsData.find((el: any) => el.applicationNumber == development.application_number);

  // Skip if there's no CMS data
    if (!siteNotice) { return }
    return {
      ...development,
      ...cmsData[0],
      _id: siteNotice._id
    }
  });

  return developments
}

export async function getActiveApplicationById(id: string) {
  const development =  process.env.NEXT_PUBLIC_DATA_PROVIDER == 'OpenData' ? await getCamdenActiveApplicationById(id) : await getLambethActiveApplicationById(id)
    return development
}
  
export async function createApplication(post: any) {
const result = client.create(post)
return result
}

export async function updateApplicationToNotActive(_id : string) {
const result = client.patch(_id).set({"isActive" : false}).commit()
return result
}

export async function checkExistingReference(reference: string): Promise<{ exists: boolean }> {
    const query = '*[_type == "planning-application" && reference == $reference]'
    const posts = await client.fetch(query, { reference })
    return { exists: posts.length > 0 };
}

export function urlFor(source: any) {
  return builder.image(source)
}

export async function addFeedback(data: any) {
console.log({data})
}

export function deadline(commentDeadline: string) {
    const deadline = commentDeadline?.split(" ")[0]?.replaceAll('/', "-")
    const deadlineDateParse = parse(deadline, 'dd-MM-yyyy', new Date())
    const year = getYear(new Date(deadlineDateParse))
    const month = getMonth(new Date(deadlineDateParse))
    const day = getDate(new Date(deadlineDateParse))
    const timeLeft = formatDistanceStrict(new Date(year, month, day), new Date().setHours(0, 0, 0, 0), {unit: 'day'})
    return timeLeft
}