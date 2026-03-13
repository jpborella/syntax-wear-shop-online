import { createContext } from "react";
import type { ProductCart } from "./CartProvider";
import type { Product } from "../interfaces/product";

export interface CartContextType {
    cart: ProductCart[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    increment: (product: ProductCart) => void;
    decrement: (product: ProductCart) => void;
}

export const CartContext = createContext({} as CartContextType);