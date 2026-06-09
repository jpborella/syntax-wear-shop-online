import type { Product } from "../../interfaces/product"
import { ProductCard } from "../ProductCard"

interface ProductListProps {
    products: Product[]
}

export const ProductList = ({ products } : ProductListProps) => {
    return (
        <section className="grid gap-4 grid-cols-[repeat(auto-fill,minmax(min(350px,100%),1fr))] xl:grid-cols-3 mb-10 w-full">
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </section>
    )
}