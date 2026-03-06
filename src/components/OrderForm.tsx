import { useState } from 'react';
import { MessageCircle, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const OrderForm = () => {
    const { items, updateQuantity, totalAmount } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        date: '',
        notes: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (items.length === 0) {
            alert('¡El carrito está vacío! Por favor, selecciona al menos un producto del catálogo.');
            return;
        }

        const selectedProductsList = items
            .map(item => `• ${item.quantity}x ${item.name} ($${(item.price * item.quantity).toLocaleString('es-AR')})`)
            .join('%0A');

        // WhatsApp Formatting Logic (Zero-Leakage & Structured Routing)
        const phoneNumber = "5492644626824";
        const totalString = `$${totalAmount.toLocaleString('es-AR')}`;
        const text = `¡Hola El Gourmet Panadería! 👋%0A%0AMi nombre es *${formData.name}* y quiero confirmar este encargo:%0A%0A📦 *Productos seleccionados:*%0A${selectedProductsList}%0A%0A💰 *Total a pagar:* ${totalString}%0A%0A📅 *Fecha de Retiro:* ${formData.date}%0A📝 *Notas:* ${formData.notes || 'Ninguna'}%0A%0A¿Me confirman disponibilidad y métodos de pago? ¡Gracias!`;

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
        window.open(whatsappUrl, '_blank');
    };

    return (
        <section id="order" className="w-full py-24 px-6 md:px-16 bg-white">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-16">

                {/* Left Info & Local Cart Summary */}
                <div className="w-full md:w-1/2 flex flex-col justify-between">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-sans font-bold text-dark mb-6">Confirma tu pedido.</h2>
                        <p className="text-lg text-gray-600 mb-8 font-serif">
                            Revisa los productos que elegiste arriba. Al finalizar, vamos a armar tu resumen y derivarte directamente a nuestro WhatsApp oficial para coordinar el pago.
                        </p>
                    </div>

                    <div className="p-6 bg-[#FAFAFA] rounded-2xl border border-gray-100 flex-1 flex flex-col">
                        <h4 className="font-bold text-dark mb-4 flex items-center gap-2">
                            <ShoppingBag className="text-primary" size={20} />
                            Resumen de Compra
                        </h4>

                        {items.length === 0 ? (
                            <p className="text-gray-500 italic text-sm text-center my-auto py-8">Aún no agregaste productos a tu carrito.</p>
                        ) : (
                            <div className="flex flex-col gap-3 mb-6 flex-1 overflow-y-auto max-h-48 pr-2 custom-scrollbar">
                                {items.map(item => (
                                    <div key={item.id} className="flex items-center justify-between text-sm py-2 border-b border-gray-100 last:border-0">
                                        <div className="flex-1 pr-2">
                                            <p className="font-semibold text-dark truncate" title={item.name}>{item.name}</p>
                                            <p className="text-gray-500">${item.price.toLocaleString('es-AR')} c/u</p>
                                        </div>
                                        <div className="flex items-center gap-2 bg-white rounded-full border border-gray-200 px-1 py-0.5">
                                            <button type="button" onClick={() => updateQuantity(item.id, item.name, item.price, -1)} className="text-gray-500 hover:text-dark w-5 h-5 flex items-center justify-center">
                                                <Minus size={12} />
                                            </button>
                                            <span className="font-bold text-dark w-4 text-center">{item.quantity}</span>
                                            <button type="button" onClick={() => updateQuantity(item.id, item.name, item.price, 1)} className="text-primary hover:text-primary-hover w-5 h-5 flex items-center justify-center">
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="pt-4 border-t border-gray-200 mt-auto">
                            <div className="flex justify-between items-center px-1">
                                <span className="font-bold text-gray-600">Total</span>
                                <span className="text-2xl font-bold text-accent">${totalAmount.toLocaleString('es-AR')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Form */}
                <div className="w-full md:w-1/2 flex items-center">
                    <form onSubmit={handleSubmit} className="space-y-6 w-full">
                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">Tu Nombre y Apellido</label>
                            <input required type="text" onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all" placeholder="Ej: María Gómez" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">Fecha Estimada de Retiro</label>
                            <input required type="date" onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none text-gray-600" />
                            <p className="text-xs text-gray-500 mt-2">Retiros por: Plaza Cruce Sanmartiniano (Martín Güemes Sur 1450, San Juan).</p>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-dark mb-2">Aclaraciones (Opcional)</label>
                            <textarea rows={3} onChange={(e) => setFormData({ ...formData, notes: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary outline-none resize-none" placeholder="¿Algún detalle especial o dedicatoria?"></textarea>
                        </div>

                        <button
                            type="submit"
                            disabled={items.length === 0}
                            className={`w-full py-4 font-bold rounded-xl flex justify-center items-center gap-2 transition-all duration-300 shadow-lg ${items.length > 0 ? 'bg-[#25D366] hover:bg-[#1DA851] text-white shadow-[#25D366]/30' : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'}`}
                        >
                            <MessageCircle size={20} />
                            Enviar pedido por WhatsApp
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
};
