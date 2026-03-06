import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../sanity/client';

export const Catalog = () => {
    const [products, setProducts] = useState<any[]>([]);

    useEffect(() => {
        // Query Sanity backend for all documents of type 'product'
        client.fetch(`*[_type == "product" && isAvailable == true] | order(price asc) {
            _id,
            name,
            price,
            desc,
            image
        }`).then(res => setProducts(res)).catch(console.error);
    }, []);

    return (
        <section id="catalog" className="w-full py-24 px-6 md:px-16 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark mb-16 text-center">Nuestras Especialidades</h2>

                {products.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 animate-pulse">
                        Cargando catálogo en vivo desde Sanity CMS...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product, index) => (
                            <motion.div
                                key={product._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2, duration: 0.5 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                            >
                                <div className="h-64 overflow-hidden relative group">
                                    {product.image && (
                                        <img
                                            src={urlFor(product.image).url()}
                                            alt={product.name}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                        />
                                    )}
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <h3 className="text-2xl font-serif font-bold text-dark leading-tight">{product.name}</h3>
                                    </div>
                                    <p className="text-gray-600 mb-6 min-h-[48px]">{product.desc}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-xl font-sans font-bold text-accent">${product.price?.toLocaleString('es-AR')}</span>
                                        <a
                                            href="#order"
                                            className="text-sm font-semibold uppercase tracking-wider text-primary-hover hover:text-dark transition-colors duration-200"
                                        >
                                            Encargar
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};
