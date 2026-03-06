import { getCliClient } from 'sanity/cli'

const client = getCliClient()
const PEXELS_API_KEY = "FsODvGSufVzgQ24jr4dRnVNAJtPE3TpJkiIFMjhwfINwVmTFsS8FHdgg";

const products = [
    {
        name: "Medialunas de manteca",
        price: 850,
        desc: "100% de manteca bañadas con una generosa capa de almíbar clásicas, rellenas con crema pastelera o dulce de leche",
        query: "croissant pastry"
    },
    {
        name: "Croissant de manteca",
        price: 1800,
        desc: "100% de manteca, ideal para acompañar con el mate, rellenas con crema y dulce de leche. También ofrecemos rellenas con jamón cocido y queso",
        query: "french croissant"
    },
    {
        name: "Semitas",
        price: 459,
        desc: "Masa hojaldrada que se deshacen en la boca, crocantes por fuera y suaves por dentro",
        query: "bread rolls bakery"
    },
    {
        name: "Alfajores",
        price: 1500,
        desc: "Clásicos, de Pistacho, Limón Crunch, Coco Crunch y Frutilla Deliciosa.",
        query: "alfajores dulce de leche"
    },
    {
        name: "Tartas",
        price: 8000,
        desc: "Lemon pie, frutilla (pulpa de frutilla), durazno, cabsha, cheesecake",
        query: "fruit tart bakery"
    },
    {
        name: "Tortas Especiales",
        price: 12000,
        desc: "Rellenas con crema de frutilla, chips de chocolate y dulce de leche tentación, la misma trae doble relleno y recubierta con crema Chantilly",
        query: "chocolate cake bakery"
    }
];

async function addProducts() {
    console.log("Iniciando carga de productos...");

    for (const product of products) {
        console.log(`Procesando: ${product.name}...`);
        try {
            // 1. Fetch image from Pexels
            const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${product.query}&per_page=1`, {
                headers: { Authorization: PEXELS_API_KEY }
            });
            const pexelsData = await pexelsRes.json();

            let assetId = null;
            if (pexelsData.photos && pexelsData.photos.length > 0) {
                const imageUrl = pexelsData.photos[0].src.large;

                // 2. Download image
                const imgRes = await fetch(imageUrl);
                const imgBuffer = await imgRes.arrayBuffer();

                // 3. Upload to Sanity
                console.log(`  Subiendo imagen para ${product.name}...`);
                const asset = await client.assets.upload('image', Buffer.from(imgBuffer), { filename: `${product.name}.jpg` });
                assetId = asset._id;
            }

            // 4. Create document
            const doc: any = {
                _type: 'product',
                name: product.name,
                price: product.price,
                desc: product.desc,
                isAvailable: true,
            };

            if (assetId) {
                doc.image = {
                    _type: 'image',
                    asset: { _ref: assetId }
                };
            }

            const createdObj = await client.create(doc);
            console.log(`  ✅ Producto creado: ${product.name} (ID: ${createdObj._id})`);
        } catch (err) {
            console.error(`  ❌ Error procesando ${product.name}:`, err);
        }
    }

    console.log("¡Carga finalizada!");
}

addProducts();
