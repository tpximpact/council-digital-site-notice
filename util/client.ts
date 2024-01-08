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

export async function getLambethApplicationsPagination({_id, itemsPerPage, postcode}: {_id?:any, itemsPerPage:number, postcode: string}) {
    let posts
    if (_id === undefined) {
        posts = await client.fetch(`*[_type == "planning-application" && isActive == true] | order(_id) [0...${itemsPerPage}] {_id, image, development_address, name}`)
    } else {
        posts = await client.fetch(`*[_type == "planning-application" && isActive == true && _id >= $_id] | order(_id) [0...${itemsPerPage}] {_id, image, development_address, name}`, {_id})
    }

    return posts
}

export async function getCamdenApplicationsPagination({_id, itemsPerPage, postcode}: {_id?:string, itemsPerPage:number, postcode: string}) {
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
  let orderQuery = `registered_date DESC, last_uploaded DESC`;

  // If the user has searched by postcode, we need to tweak the request to
  // Camden's API to filter by location.
  const postCodeRegex = /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9][A-Za-z]?))))\s?[0-9][A-Za-z]{2})/
  if (postCodeRegex.test(postcode)) {
    // Verify that it's a real postcode and get its geolocation
    const postcodeRes = await fetch(`https://api.postcodes.io/postcodes/${postcode}`)
    const postcodeData = await postcodeRes.json()

    if (postcodeData.error) {
          orderQuery
    } else {

      postcode = postcodeData.result;
      // TBD whether we only want to order by location or also filter out
      // developments that are too far away. For now there won't be too many site
      // notices, so leaving this out.
      // whereQuery += ` and within_circle(location, ${postcodeData.result.latitude}, ${postcodeData.result.longitude}, ${distance})`;
      orderQuery = `distance_in_meters(location, 'POINT (${postcodeData.result.longitude} ${postcodeData.result.latitude})')`
    }

  }


  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}.json?$limit=${limit}&$where=${whereQuery}&$order=${orderQuery}`)
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

  return developments

}

export async function getActiveApplications() {
    const posts = process.env.NEXT_PUBLIC_DATA_PROVIDER === 'OpenData' ? getCamdenApplications() : getLambethApplications()
    return posts
}

export async function getActiveApplicationsPagination({_id, itemsPerPage, postcode}: {_id?:string, itemsPerPage:number, postcode?: any}) {
    let posts
    if(process.env.NEXT_PUBLIC_DATA_PROVIDER == 'OpenData') {
        posts = getCamdenApplicationsPagination({_id, itemsPerPage, postcode})
    } else {
        posts = getLambethApplicationsPagination({_id, itemsPerPage, postcode})
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