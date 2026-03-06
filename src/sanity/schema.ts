export const productSchema = {
    name: 'product',
    title: 'Productos',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre del Producto',
            type: 'string',
        },
        {
            name: 'price',
            title: 'Precio AR$',
            type: 'number',
        },
        {
            name: 'desc',
            title: 'Descripción',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Foto del Producto',
            type: 'image',
            options: { hotspot: true },
        },
        {
            name: 'isAvailable',
            title: '¿Hay stock?',
            type: 'boolean',
            initialValue: true,
        }
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'price',
            media: 'image',
        },
        prepare(selection: any) {
            const { title, subtitle, media } = selection
            return {
                title: title,
                subtitle: `Precio: $${subtitle}`,
                media: media
            }
        }
    }
}
