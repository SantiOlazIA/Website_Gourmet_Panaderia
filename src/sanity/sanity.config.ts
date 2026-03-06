import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { productSchema } from './schema'

export default defineConfig({
    name: 'el-gourmet-admin',
    title: 'Panel de Administración - El Gourmet',

    // IMPORTANTE: Estos datos los sacás cuando creás tu cuenta en Sanity.io
    projectId: 'kuqzj6h2',
    dataset: 'production',

    // Esto asegura que cargue desde la ruta /admin
    basePath: '/admin',

    // Plugins básicos para el panel
    plugins: [deskTool()],

    schema: {
        types: [productSchema],
    },
})
