import { urlFor } from "./client"

export function dummy_image(image: any){
    const imageArr = new Array(8).fill({
        original: image && urlFor(image)?.url(),
        thumbnail: image && urlFor(image)?.url(),
    })

    return imageArr
}