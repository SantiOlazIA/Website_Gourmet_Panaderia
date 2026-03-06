import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// Configuración del cliente para leer de la base de datos
export const client = createClient({
    projectId: 'kuqzj6h2', // El ID real
    dataset: 'production',
    useCdn: true, // `true` para respuesta rápida a los usuarios en toda Argentina
    apiVersion: '2023-05-03', // API Version
})

// Utilidad para extraer las URLs de las fotos de la nube
const builder = imageUrlBuilder(client)
export const urlFor = (source: any) => builder.image(source)
