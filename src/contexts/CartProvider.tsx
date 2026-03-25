import { useEffect, useState } from "react";
import type { Product } from "../interfaces/product";
import { CartContext } from "./CardContext";

interface CartProviderProps {
    children: React.ReactNode;
}

export interface ProductCart extends Product {
    quantity: number;
}

export const localStorageKey = "@SyntaxWear:cart"

export const CartProvider = ({ children }: CartProviderProps) => {
    const [cart, setCart] = useState<ProductCart[]>(() => {
        const cartFromLocalStorage = localStorage.getItem(localStorageKey);
        return cartFromLocalStorage !== null ? JSON.parse(cartFromLocalStorage) : [];
    });

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify(cart));
    }, [cart]);
    
    function addToCart(product: Product): void {
        const productsExistsIntoCart = cart.find((itemInCart) => itemInCart.id === product.id);

        let newCart;

        if (productsExistsIntoCart) {
            newCart = cart.map((itemInCart) =>
                itemInCart.id === product.id
                    ? { ...itemInCart, quantity: itemInCart.quantity + 1 }
                    : itemInCart
            );
        } else {
            newCart = [...cart, { ...product, quantity: 1 }];
        }
        setCart(newCart);
    }

    function removeFromCart(productId: number): void {
        setCart(cart.filter((itemInCart) => itemInCart.id !== productId));
    }

    function incrementInCart(product: ProductCart): void {
        updateProductQuantity(product, product.quantity + 1);
    }

    function decrementFromCart(product: ProductCart): void {
        updateProductQuantity(product, product.quantity - 1);
    }

    function updateProductQuantity(product: ProductCart, newQuantity: number): void{
        if (newQuantity <= 0) return;
        
        const productsExistsIntoCart = cart.find((itemInCart) => itemInCart.id === product.id);

        if (!productsExistsIntoCart) return; 

        
            const newCart = cart.map((itemInCart) =>
                itemInCart.id === product.id
                    ? { ...itemInCart, quantity: newQuantity }
                    : itemInCart
            );
        setCart(newCart);
        }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            incrementInCart,
            decrementFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
};