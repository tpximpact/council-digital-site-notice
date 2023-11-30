import {createClient} from '@sanity/client'

export const  client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2023-11-15', // use current date (YYYY-MM-DD) to target the latest API version
    token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getActiveApplications() {
    const posts = await client.fetch('*[_type == "planning-application" && isActive == true]')
    return posts
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