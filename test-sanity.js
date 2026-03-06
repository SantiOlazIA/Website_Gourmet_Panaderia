import { createClient } from '@sanity/client';

const client = createClient({
    projectId: 'kuqzj6h2', // El ID real
    dataset: 'production',
    useCdn: true, // `true` para respuesta rápida a los usuarios en toda Argentina
    apiVersion: '2023-05-03', // API Version
});

client.fetch(`*[_type == "product" && isAvailable == true] | order(price asc) {
    _id,
    name,
    price,
    desc,
    image
}`).then(res => console.log(JSON.stringify(res, null, 2))).catch(console.error);
