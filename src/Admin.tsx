import { Studio } from 'sanity'
import sanityConfig from './sanity/sanity.config'

export default function Admin() {
    return (
        // Esto oculta toda nuestra página y nos muestra únicamente el panel de control oficial
        <div style={{ height: '100vh', width: '100vw' }}>
            <Studio config={sanityConfig} />
        </div>
    )
}
