import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    updateQuantity: (id: string, name: string, price: number, delta: number) => void;
    totalAmount: number;
    totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const updateQuantity = (id: string, name: string, price: number, delta: number) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === id);
            if (existing) {
                const newQuantity = existing.quantity + delta;
                if (newQuantity <= 0) {
                    return prev.filter(item => item.id !== id);
                }
                return prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item);
            } else if (delta > 0) {
                return [...prev, { id, name, price, quantity: delta }];
            }
            return prev;
        });
    };

    const totalAmount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ items, updateQuantity, totalAmount, totalItems }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
