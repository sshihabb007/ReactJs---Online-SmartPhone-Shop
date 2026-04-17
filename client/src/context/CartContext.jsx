import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import API from '../api';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const { user } = useAuth();

    const fetchCart = useCallback(async () => {
        if (!user) { setItems([]); setTotal(0); setCartCount(0); return; }
        try {
            const res = await API.get('/cart');
            setItems(res.data.items);
            setTotal(res.data.total);
            setCartCount(res.data.items.reduce((sum, i) => sum + i.Quantity, 0));
        } catch { setItems([]); setTotal(0); setCartCount(0); }
    }, [user]);

    useEffect(() => { fetchCart(); }, [fetchCart]);

    const addToCart = async (productId, quantity) => {
        const res = await API.post('/cart', { productId, quantity });
        await fetchCart();
        return res.data;
    };

    const removeFromCart = async (cartId) => {
        await API.delete(`/cart/${cartId}`);
        await fetchCart();
    };

    return (
        <CartContext.Provider value={{ items, total, cartCount, addToCart, removeFromCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
