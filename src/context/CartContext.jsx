import { createContext, useContext, useState, useEffect } from 'react';
import { getCart, addToCart, removeFromCart } from '../api/cartApi';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const { user } = useAuth();
    const { showToast } = useToast();

    useEffect(() => {
        if (user) fetchCart();
        else setCartItems([]);
    }, [user]);

    const fetchCart = async () => {
        try {
            const res = await getCart();
            setCartItems(res.data);
        } catch (err) {
            console.error('Failed to fetch cart', err);
        }
    };

    const addItem = async (sneakerId, quantity, size) => {
        await addToCart({ sneakerId, quantity, size });
        fetchCart();
        showToast('Added to cart');
    };

    const removeItem = async (sneakerId) => {
        await removeFromCart(sneakerId);
        fetchCart();
        showToast('Removed from cart', 'info');
    };

    const clearCart = () => setCartItems([]);

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart, cartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);