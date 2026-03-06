import { getCliClient } from 'sanity/cli'
import { createReadStream } from 'fs'
import { join } from 'path'

const client = getCliClient()

const products = [
    {
        name: 'Bizcochuelo Clásico de Vainilla',
        price: 8500,
        desc: 'Esponjoso, alto y de miga suave. El sabor tradicional, horneado a la perfección para acompañar tus tardes.',
        image: 'bizcochuelo_vainilla.png'
    },
    {
        name: 'Bizcochuelo de Dulce de Leche',
        price: 12000,
        desc: 'Esponjoso, alto y relleno en el centro. Una doble capa generosa del mejor dulce de leche repostero artesanal.',
        image: 'bizcochuelo_dulce_de_leche.png'
    },
    {
        name: 'Torta Artesanal de Chocolate',
        price: 14500,
        desc: 'Intensa, húmeda y cubierta por completo. Bañada en una brillante reducción de ganache de chocolate semi-amargo.',
        image: 'torta_chocolate.png'
    }
]

async function migrate() {
    console.log('Iniciando migración de productos...')
    for (const product of products) {
        const imagePath = join(process.cwd(), '../public', product.image)
        console.log(`Subiendo imagen: ${imagePath}`)

        const stream = createReadStream(imagePath)
        const asset = await client.assets.upload('image', stream as any, {
            filename: product.image
        })

        console.log(`Creando producto: ${product.name}`)
        const doc = {
            _type: 'product',
            name: product.name,
            price: product.price,
            desc: product.desc,
            isAvailable: true,
            image: {
                _type: 'image',
                asset: {
                    _type: 'reference',
                    _ref: asset._id
                }
            }
        }

        await client.create(doc)
        console.log('✅ Creado!')
    }
    console.log('Migración finalizada con éxito.')
}

migrate().catch(err => {
    console.error('Error durante la migración:', err)
    process.exit(1)
})
