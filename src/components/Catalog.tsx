import { motion } from 'framer-motion';

const products = [
    {
        id: 1,
        name: 'Bizcochuelo Clásico de Vainilla',
        price: '$8.500',
        desc: 'Esponjoso, alto y de miga suave. El sabor tradicional, horneado a la perfección para acompañar tus tardes.',
        image: '/bizcochuelo_vainilla.png'
    },
    {
        id: 2,
        name: 'Bizcochuelo de Dulce de Leche',
        price: '$12.000',
        desc: 'Esponjoso, alto y relleno en el centro. Una doble capa generosa del mejor dulce de leche repostero artesanal.',
        image: '/bizcochuelo_dulce_de_leche.png'
    },
    {
        id: 3,
        name: 'Torta Artesanal de Chocolate',
        price: '$14.500',
        desc: 'Intensa, húmeda y cubierta por completo. Bañada en una brillante reducción de ganache de chocolate semi-amargo.',
        image: '/torta_chocolate.png'
    }
];

export const Catalog = () => {
    return (
        <section id="catalog" className="w-full py-24 px-6 md:px-16 bg-[#FAFAFA]">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark mb-16 text-center">Nuestras Especialidades</h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2, duration: 0.5 }}
                            className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
                        >
                            <div className="h-64 overflow-hidden relative group">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                />
                            </div>
                            <div className="p-8">
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-2xl font-serif font-bold text-dark leading-tight">{product.name}</h3>
                                </div>
                                <p className="text-gray-600 mb-6 min-h-[48px]">{product.desc}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-sans font-bold text-accent">{product.price}</span>
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
            </div>
        </section>
    );
};
