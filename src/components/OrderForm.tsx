import { useState } from 'react';
import { MessageCircle } from 'lucide-react';

export const OrderForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        notes: ''
    });

    const [products, setProducts] = useState<Record<string, number>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const selectedProductsList = Object.entries(products)
            .filter(([_, qty]) => qty > 0)
            .map(([name, qty]) => `• ${qty}x ${name}`)
            .join('%0A');

        if (!selectedProductsList) {
            alert('Por favor, selecciona al menos un producto.');
            return;
        }

        // WhatsApp Formatting Logic (Zero-Leakage & Structured Routing)
        const phoneNumber = "5492644626824"; // Updated with actual number
        const text = `¡Hola El Gourmet Panadería! 👋%0A%0AMi nombre es *${formData.name}* y quiero hacerles un encargo:%0A%0A📦 *Productos seleccionados:*%0A${selectedProductsList}%0A%0A📅 *Fecha de Retiro:* ${formData.date}%0A📝 *Notas:* ${formData.notes || 'Ninguna'}%0A%0A¿Me confirman disponibilidad? ¡Gracias!`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
        window.open(whatsappUrl, '_blank');
    };

    const availableProducts = [
        'Bizcochuelo Clásico de Vainilla',
        'Bizcochuelo Relleno de Dulce de Leche',
        'Torta Artesanal de Chocolate'
    ];

    return (
        <section id="order" className="w-full py-24 px-6 md:px-16 bg-white">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">

                {/* Left Info */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark mb-6">Haz tu encargo.</h2>
                    <p className="text-lg text-gray-600 mb-8 font-serif">
                        Completa este breve formulario para estructurar tu pedido. Al finalizar, te redirigiremos a WhatsApp con un mensaje pre-armado para confirmar los detalles rápidamente.
                    </p>
                    <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100">
                        <h4 className="font-bold text-dark mb-2">📍 ¿Dónde Retiro?</h4>
                        <p className="text-gray-600 mb-4">Plaza Cruce Sanmartiniano.<br />Martín Güemes Sur 1450 (Frente al Basualdo), San Juan.</p>
                        <h4 className="font-bold text-dark mb-2">🕒 Horarios</h4>
                        <p className="text-gray-600">Lunes a viernes de 08:00hs a 13:00 hs y de 17:00hs a 21:00hs.<br />Sábados de 09:00hs a 14:00hs.</p>
                    </div>
                </div>

                {/* Right Form */}
                <div className="w-full md:w-1/2">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">Tu Nombre y Apellido</label>
                            <input required type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Ej: María Gómez" />
                        </div>

                        <div className="space-y-3">
                            <label className="block text-sm font-semibold text-dark">¿Qué deseas llevar?</label>
                            {availableProducts.map(item => (
                                <div key={item} className="flex items-center justify-between p-3 border border-gray-100 rounded-xl bg-[#FAFAFA] hover:border-primary/50 transition-colors">
                                    <span className="font-medium text-dark/80 text-sm leading-tight pr-4">{item}</span>
                                    <input
                                        type="number"
                                        min="0"
                                        defaultValue="0"
                                        onChange={(e) => {
                                            const qty = parseInt(e.target.value) || 0;
                                            setProducts(prev => ({ ...prev, [item]: qty }))
                                        }}
                                        className="w-16 px-2 py-2 rounded-lg border border-gray-200 focus:border-primary outline-none text-center flex-shrink-0"
                                    />
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">Fecha de Retiro</label>
                            <input required type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">Aclaraciones (Opcional)</label>
                            <textarea rows={3} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none resize-none" placeholder="¿Algún detalle especial o dedicatoria?"></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 bg-[#25D366] hover:bg-[#1DA851] text-white font-bold rounded-xl flex justify-center items-center gap-2 transition-colors duration-300 shadow-lg shadow-[#25D366]/30">
                            <MessageCircle size={20} />
                            Enviar pedido por WhatsApp
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};
