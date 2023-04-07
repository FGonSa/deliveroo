import {createClient} from '@sanity/client'
import  ImageUrlBuilder  from '@sanity/image-url'

const client = createClient({ 
    projectId: "qwoxusny", //l065o1qk or woxusny
    dataset: "production",
    useCdn: true,
    apiVersion: "2021-10-21"
 });

 const builder = ImageUrlBuilder(client)

 export const urlFor = (source) => builder.image(source)

 export default client;