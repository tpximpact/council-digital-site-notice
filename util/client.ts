import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const  client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false, 
    apiVersion: '2023-11-15', 
    token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN
})

const builder = imageUrlBuilder(client)

export async function getActiveApplications() {
    const posts = await client.fetch('*[_type == "planning-application" && isActive == true]')
    return posts
}

export async function getActiveApplicationById(id: string) {
    const query = '*[_type == "planning-application" && _id == $_id]'
    const post = await client.fetch(query, { _id:id })
    return post
}
  
export async function createApplication(post: any) {
const result = client.create(post)
return result
}

export async function updateApplicationToNotActive(_id : string) {
const result = client.patch(_id).set({"isActive" : false}).commit()
return result
}

export async function checkExistingReference(reference: string): Promise<boolean> {
    const query = '*[_type == "planning-application" && reference == $reference]'
    const posts = await client.fetch(query, { reference })
    return posts.length > 0;
}


export function urlFor(source: any) {
  return builder.image(source)
}