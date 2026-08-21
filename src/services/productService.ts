import type { Product } from "../interfaces/product";

const API_BASE_URL = "http://localhost:3000";
// Limite padrão compatível com a API (máximo 50)
const DEFAULT_LIMIT = 3;

interface GetProductParams {
    page: number;
    limit?: number;
    gender?: string;
    isOutlet?: boolean;
}

interface ProductResponse {
    data: Product[];
    total: number;
    page: number;
    limit: number;
}

export async function getProducts({ page, limit = DEFAULT_LIMIT, gender, isOutlet }: GetProductParams): Promise<ProductResponse> {
    const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
    });

    if (gender) params.append('gender', gender);
    if (isOutlet !== undefined) params.append('isOutlet', isOutlet.toString());

    const url = `${API_BASE_URL}/products?${params.toString()}`;

    try {
        const response = await fetch(url);

        if (!response.ok) throw new Error(`Erro ao buscar produtos: ${response.statusText}`);

        return await response.json();
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
    
    if (paginationParams?.gender) params.append('gender', paginationParams.gender);
    if (paginationParams?.isOutlet !== undefined) params.append('isOutlet', paginationParams.isOutlet.toString());

    const response = await fetch(`${API_BASE_URL}/products?${params.toString()}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar produtos por categoria: ${response.statusText}`);
    }

    return await response.json();
}

export async function getProductBySection(section: string, paginationParams?: GetProductParams): Promise<ProductResponse> {
    const params: GetProductParams = { ...paginationParams, page: paginationParams?.page || 1 };
    
    if (section.toLowerCase() === 'masculino') params.gender = 'MASCULINO';
    else if (section.toLowerCase() === 'feminino') params.gender = 'FEMININO';
    else if (section.toLowerCase() === 'outlet') params.isOutlet = true;

    return getProducts(params);
}

export async function getProductById(id: number): Promise<Product> {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);

    if (!response.ok) {
        throw new Error(`Erro ao buscar produto: ${response.statusText}`);
    }

    return await response.json();
}