import { useEffect, useState } from "react";
import type { Product } from "../../interfaces/product";
import { CartContext } from "./CartContext";
import { useAuth } from "../AuthContext/AuthContext";

interface CartProviderProps {
    children: React.ReactNode;
}

export interface ProductCart extends Product {
    quantity: number;
}

export const localStorageKey = "@SyntaxWear:cart";

const CART_API_URL = "http://localhost:3000/cart";

interface ApiCartItem {
    product: Product;
    quantity: number;
}

interface ApiCartResponse {
    items: ApiCartItem[];
}

const readGuestCart = (): ProductCart[] => {
    const storedCart = localStorage.getItem(localStorageKey);
    if (!storedCart) return [];

    try {
        return JSON.parse(storedCart) as ProductCart[];
    } catch {
        localStorage.removeItem(localStorageKey);
        return [];
    }
};

const toProductCart = ({ product, quantity }: ApiCartItem): ProductCart => ({
    ...product,
    quantity,
});

export const CartProvider = ({ children }: CartProviderProps) => {
    const { isAuthenticated, isLoading: isAuthLoading, user } = useAuth();
    const [cart, setCart] = useState<ProductCart[]>(readGuestCart);
    const [loadedCartUserId, setLoadedCartUserId] = useState<string | null>(null);
    const currentUserId = user?.id ?? null;

    useEffect(() => {
        if (isAuthLoading || !isAuthenticated || !currentUserId || loadedCartUserId !== currentUserId) return;

        void fetch(CART_API_URL, {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ items: cart.map(({ id, quantity }) => ({ productId: id, quantity })) }),
        });
    }, [cart, currentUserId, isAuthenticated, isAuthLoading, loadedCartUserId]);

    useEffect(() => {
        if (isAuthLoading || !isAuthenticated || !currentUserId) return;

        let cancelled = false;
        const loadAccountCart = async () => {
            const response = await fetch(CART_API_URL, { credentials: "include" });
            if (!response.ok) throw new Error("Não foi possível carregar o carrinho.");

            const data = (await response.json()) as ApiCartResponse;

            if (!cancelled) {
                setCart(data.items.map(toProductCart));
                setLoadedCartUserId(currentUserId);
            }
        };

        void loadAccountCart().catch(() => {
            if (!cancelled) {
                setCart([]);
                setLoadedCartUserId(currentUserId);
            }
        });
        return () => {
            cancelled = true;
        };
    }, [currentUserId, isAuthenticated, isAuthLoading]);

    useEffect(() => {
        if (!isAuthenticated && !isAuthLoading) {
            localStorage.setItem(localStorageKey, JSON.stringify(cart));
        }
    }, [cart, isAuthenticated, isAuthLoading]);
    
    function addToCart(product: Product): void {
        setCart((currentCart) => {
            const existingProduct = currentCart.find((item) => item.id === product.id);

            if (existingProduct) {
                return currentCart.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
                );
            }

            return [...currentCart, { ...product, quantity: 1 }];
        });
    }

    function removeFromCart(productId: number): void {
        setCart((currentCart) => currentCart.filter((item) => item.id !== productId));
    }

    function clearCart(): void {
        setCart([]);
    }

    function incrementInCart(product: ProductCart): void {
        updateProductQuantity(product.id, product.quantity + 1);
    }

    function decrementFromCart(product: ProductCart): void {
        updateProductQuantity(product.id, product.quantity - 1);
    }

    function updateProductQuantity(productId: number, quantity: number): void {
        if (quantity <= 0) return;

        setCart((currentCart) => currentCart.map((item) =>
            item.id === productId ? { ...item, quantity } : item,
        ));
    }

    return (
        <CartContext.Provider value={{
            cart,
            addToCart,
            removeFromCart,
            clearCart,
            incrementInCart,
            decrementFromCart
        }}>
            {children}
        </CartContext.Provider>
    );
};