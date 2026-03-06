import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { client, urlFor } from '../sanity/client';
import { useCart } from '../context/CartContext';
import { Plus, Minus } from 'lucide-react';

export const Catalog = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { items, updateQuantity } = useCart();

    useEffect(() => {
        // Query Sanity backend for all documents of type 'product'
        client.fetch(`*[_type == "product" && isAvailable == true] | order(price asc) {
            _id,
            name,
            price,
            desc,
            image
        }`).then(res => setProducts(res)).catch((err) => {
            console.error(err);
            setError(err.message || "Error de conexión");
        });
    }, []);

    return (
        <section id="catalog" className="w-full py-24 px-6 md:px-16 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark mb-16 text-center">Nuestras Especialidades</h2>

                {error ? (
                    <div className="text-center py-10 max-w-2xl mx-auto bg-red-50 rounded-2xl p-6 border border-red-100">
                        <p className="text-red-500 font-bold mb-2">Error cargando los productos: {error}</p>
                        <p className="text-sm text-gray-600">
                            <strong>¿Estás probando desde tu celular en la misma red WiFi?</strong><br />
                            Sanity bloquea por seguridad las conexiones desde IPs locales (ej. 192.168.x.x) a menos que las autorices.<br />
                            Entrá a <a href="https://manage.sanity.io" target="_blank" rel="noreferrer" className="text-primary underline">manage.sanity.io</a>, seleccioná tu proyecto, andá a <strong>API</strong> {'>'} <strong>CORS Origins</strong> y agregá la IP completa que aparece arriba en el navegador de tu celular (ej. <code>http://192.168.0.X:5173</code>) marcando "Allow credentials".
                        </p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="text-center text-gray-500 py-10 animate-pulse">
                        Cargando catálogo en vivo desde Sanity CMS...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {products.map((product, index) => {
                            const quantity = items.find(i => i.id === product._id)?.quantity || 0;
                            return (
                                <motion.div
                                    key={product._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.2, duration: 0.5 }}
                                    className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border ${quantity > 0 ? 'border-primary ring-2 ring-primary/20' : 'border-gray-100'}`}
                                >
                                    <div className="h-64 overflow-hidden relative group">
                                        {product.image && (
                                            <img
                                                src={urlFor(product.image).url()}
                                                alt={product.name}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />
                                        )}
                                        {quantity > 0 && (
                                            <div className="absolute top-4 right-4 bg-primary text-white font-bold h-8 w-8 rounded-full flex items-center justify-center shadow-lg transform scale-in">
                                                {quantity}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <div className="flex justify-between items-start mb-4">
                                            <h3 className="text-2xl font-serif font-bold text-dark leading-tight">{product.name}</h3>
                                        </div>
                                        <p className="text-gray-600 mb-6 min-h-[48px]">{product.desc}</p>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-xl font-sans font-bold text-accent">${product.price?.toLocaleString('es-AR')}</span>

                                            {quantity === 0 ? (
                                                <button
                                                    onClick={() => updateQuantity(product._id, product.name, product.price, 1)}
                                                    className="text-sm font-semibold uppercase tracking-wider text-primary hover:text-primary-hover transition-colors duration-200"
                                                >
                                                    Agregar
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-3 bg-gray-50 rounded-full border border-gray-200 p-1">
                                                    <button
                                                        onClick={() => updateQuantity(product._id, product.name, product.price, -1)}
                                                        className="h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:bg-white hover:shadow-sm hover:text-dark transition-all"
                                                    >
                                                        <Minus size={16} />
                                                    </button>
                                                    <span className="font-bold text-dark min-w-[1.5rem] text-center">{quantity}</span>
                                                    <button
                                                        onClick={() => updateQuantity(product._id, product.name, product.price, 1)}
                                                        className="h-8 w-8 rounded-full flex items-center justify-center bg-primary text-white shadow-md hover:bg-primary-hover transition-all"
                                                    >
                                                        <Plus size={16} />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                )}
            </div>
        </section>
    );
};
