import sanityClient from '@sanity/client'
import { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder'

const client = createClient({ 
    projectId: "l065o1qk",
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
 });

 const builder = ImageUrlBuilder(client)

 export const urlFor = (source) => builder.image(source)

 export default client;