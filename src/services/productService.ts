import type { Product } from "../interfaces/product";

const API_BASE_URL = "http://localhost:3000";
const DEFAULT_LIMIT = 3;

interface GetProductParams {
    page: number;
    limit?: number;
}

interface ProductResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
}

/**
 * Normalizes product data from the API.
 * The API might return images and colors as strings instead of arrays.
 */
function normalizeProduct(product: any): Product {
    return {
        ...product,
        // Ensure images is an array
        images: Array.isArray(product.images) 
            ? product.images 
            : (typeof product.images === 'string' && product.images.trim() !== '' ? [product.images] : []),
        // Ensure colors is an array (splitting by space if it's a string)
        colors: Array.isArray(product.colors)
            ? product.colors
            : (typeof product.colors === 'string' && product.colors.trim() !== '' ? product.colors.split(' ') : [])
    };
}

export async function getProducts({ page, limit = DEFAULT_LIMIT }: GetProductParams): Promise<ProductResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    });

    const url = `${API_BASE_URL}/products?${params.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Erro ao buscar produtos: ${response.statusText}`);

        const result = await response.json();
        
        return {
            ...result,
            data: result.data.map(normalizeProduct)
        };
    } catch (error) {
        if (error instanceof Error) throw error;

        throw new Error('Erro desconhecido ao buscar produtos.');
    }
}

export async function getProductByCategoryId(categoryId: number, paginationParams?: GetProductParams): Promise<ProductResponse> {
    const params = new URLSearchParams({
        page: paginationParams?.page.toString() || '1',
        limit: (paginationParams?.limit || DEFAULT_LIMIT).toString(),
        categoryId: categoryId.toString()
    });
    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar produtos por categoria: ${response.statusText}`);
    }

    const result = await response.json();
    
    return {
        ...result,
        data: result.data.map(normalizeProduct)
    };
}