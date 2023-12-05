import {createClient} from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { time } from 'console'
import {parse, formatDistanceToNowStrict, getYear, getMonth, getDate, formatDistanceStrict} from 'date-fns'

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

export function deadline(commentDeadline: string) {
    const deadline = commentDeadline?.split(" ")[0].replaceAll('/', "-")
    const deadlineDateParse = parse(deadline, 'dd-MM-yyyy', new Date())
    const year = getYear(new Date(deadlineDateParse))
    const month = getMonth(new Date(deadlineDateParse))
    const day = getDate(new Date(deadlineDateParse))
    const timeLeft = formatDistanceStrict(new Date(year, month, day), new Date().setHours(0, 0, 0, 0), {unit: 'day'})
    return timeLeft
}