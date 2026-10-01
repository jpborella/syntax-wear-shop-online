import type { Product } from "../../interfaces/product";

export interface ProductCart extends Product {
    quantity: number;
}

export const mergeCartItems = (guestCart: ProductCart[], accountCart: ProductCart[]): ProductCart[] => {
    const mergedCart = new Map<number, ProductCart>();

    for (const item of [...guestCart, ...accountCart]) {
        const existingItem = mergedCart.get(item.id);

        if (!existingItem) {
            mergedCart.set(item.id, { ...item });
            continue;
        }

        mergedCart.set(item.id, {
            ...existingItem,
            ...item,
            quantity: existingItem.quantity + item.quantity,
        });
    }

    return Array.from(mergedCart.values()).sort((a, b) => a.id - b.id);
};
