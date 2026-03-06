export const productSchema = {
    name: 'product',
    title: 'Producto',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Nombre',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'price',
            title: 'Precio',
            type: 'number',
            validation: (Rule: any) => Rule.required().min(0),
        },
        {
            name: 'desc',
            title: 'Descripción',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Imagen',
            type: 'image',
            options: {
                hotspot: true, // Enables UI for selecting what areas of an image should always be cropped
            },
        },
        {
            name: 'isAvailable',
            title: 'Disponible',
            type: 'boolean',
            initialValue: true,
        },
    ],
};
