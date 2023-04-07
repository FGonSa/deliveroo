import {createClient} from '@sanity/client'
import  ImageUrlBuilder  from '@sanity/image-url'

const client = createClient({ 
    projectId: "l065o1qk",
    dataset: "production",
    useCdn: true,
    apiVersion: "2022-01-12"
 });

 const builder = ImageUrlBuilder(client)

 export const urlFor = (source) => builder.image(source)

 export default client;