import {createClient} from '@sanity/client'

export const  client = createClient({
    projectId: '3uqx196f',
    dataset: 'production',
    useCdn: false, // set to `false` to bypass the edge cache
    apiVersion: '2023-11-15', // use current date (YYYY-MM-DD) to target the latest API version
    token: process.env.NEXT_PUBLIC_SANITY_SECRET_TOKEN // Only if you want to update content with the client
})

// uses GROQ to query content: https://www.sanity.io/docs/groq
export async function getActivePosts() {
    const posts = await client.fetch('*[_type == "post" && isActive == true]')
    return posts
}
  
export async function createPost(post: any) {
const result = client.create(post)
return result
}

export async function updatePostToNotActive(_id : string) {
const result = client.patch(_id).set({"isActive" : false}).commit()
return result
}