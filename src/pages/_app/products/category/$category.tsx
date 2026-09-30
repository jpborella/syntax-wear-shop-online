import { createFileRoute, Link } from "@tanstack/react-router";
import { ProductList } from "../../../../components/ProductList";
import { getProductByCategoryId, getProductBySection } from "../../../../services/productService";
import { getCategoryByName } from "../../../../services/categoryService";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "../../../../interfaces/product";
import { z } from "zod";

export const Route = createFileRoute("/_app/products/category/$category")({
    validateSearch: z.object({
        gender: z.enum(["MASCULINO", "FEMININO", "UNISSEX"]).optional(),
    }),
    loader: async ({ params }) => {
        const isSection = ['masculino', 'feminino', 'outlet'].includes(params.category.toLowerCase());
        
        if (isSection) {
            return { category: null, section: params.category };
        }

        try {
            const category = await getCategoryByName(params.category);
            return { category, section: null };
        } catch {
            return { category: null, section: null, notFound: true };
        }
    },
    component: RouteComponent,
    head: () => ({
        meta: [{ title: "Produtos - SyntaxWear" }],
    }),
});

function RouteComponent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { category, section, notFound } = Route.useLoaderData();
    const { category: routeCategory } = Route.useParams();
    const search = Route.useSearch();
    const categoryId = category?.id;

    const fetchKeyRef = useRef<string | null>(null);
    const isLoadingRef = useRef(false);
    const hasMoreRef = useRef(true);
    const pageRef = useRef(1);
    const requestIdRef = useRef(0);

    const loadMore = useCallback(async (pageToLoad?: number, reset = false) => {
        if ((!reset && (isLoadingRef.current || !hasMoreRef.current)) || notFound) return;

        const requestId = reset ? ++requestIdRef.current : requestIdRef.current;
        isLoadingRef.current = true;
        setLoading(true);
        const currentPage = pageToLoad ?? pageRef.current;

        try {
            let filteredProducts;

            if (section) {
                filteredProducts = await getProductBySection(section, { page: currentPage, gender: search.gender });
            } else if (categoryId) {
                filteredProducts = await getProductByCategoryId(categoryId, { page: currentPage, gender: search.gender });
            } else {
                hasMoreRef.current = false;
                setHasMore(false);
                return;
            }

            if (requestId !== requestIdRef.current) return;

            setProducts((prev) => {
                if (reset) return filteredProducts.data;

                const combined = [...prev, ...filteredProducts.data];
                const map = new Map<number, typeof combined[number]>();
                for (const product of combined) {
                    map.set(product.id, product);
                }

                return Array.from(map.values());
            });

            if (filteredProducts.data.length < filteredProducts.limit) {
                hasMoreRef.current = false;
                setHasMore(false);
            } else {
                pageRef.current = currentPage + 1;
            }
        } catch (error) {
            if (requestId !== requestIdRef.current) return;

            console.error("Erro ao carregar produtos:", error);
            hasMoreRef.current = false;
            setHasMore(false);
        } finally {
            if (requestId === requestIdRef.current) {
                isLoadingRef.current = false;
                setLoading(false);
            }
        }
    }, [categoryId, notFound, search.gender, section]);

    useEffect(() => {
        const key = `${routeCategory ?? ''}|${categoryId ?? ''}|${search.gender ?? ''}|${section ?? ''}|${notFound ?? false}`;
        if (fetchKeyRef.current === key) return;
        fetchKeyRef.current = key;

        setProducts([]);
        pageRef.current = 1;
        requestIdRef.current += 1;
        setHasMore(true);
        hasMoreRef.current = true;
        void loadMore(1, true);
    }, [categoryId, loadMore, notFound, routeCategory, search.gender, section]);

    if (notFound) {
        return (
            <section className="container pt-44 text-center text-black min-h-[80vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold mb-4">Categoria não encontrada</h1>
                <Link to="/products" className="underline">
                    Voltar para produtos
                </Link>
            </section>
        );
    }

    return (
        <section className="container pt-44 md:pt-54 pb-10 md:px-10 mb-10 text-black min-h-[80vh] flex flex-col items-center justify-center">
            <h1 className=" text-3xl text-center mb-3">
                {section ? `Seção ${section.charAt(0).toUpperCase() + section.slice(1)}` : `Lista de produtos`}
            </h1>

            <h2 className="text-center mb-10 p-4">
                Conforto expecional para suas aventuras do dia-a-dia
            </h2>

            {loading && products.length === 0 ? (
                <div className="flex justify-center items-center min-h-100">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#212A2F]"></div>
                </div>
            ) : products.length === 0 ? (
                <>
                    <p className="text-center">
                        Nenhum produto encontrado para esta {section ? 'seção' : 'categoria'}.
                    </p>
                    <Link
                        to="/products"
                        className="text-accent hover:text-accent-hover underline"
                    >
                        Voltar para produtos
                    </Link>
                </>
            ) : (
                <>
                    <ProductList products={products} />

                    {hasMore && (
                        <button
                            className="bg-[#212A2F] py-3.5 px-7 rounded-xl cursor-pointer mx-auto text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => loadMore()}
                            disabled={loading}
                        >
                            {loading ? "Carregando..." : "Carregar mais"}
                        </button>
                    )}
                </>
            )}
        </section>
    );
}
