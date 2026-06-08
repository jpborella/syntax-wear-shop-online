import { Link } from "@tanstack/react-router"
import type { Product } from "../../interfaces/product"
import { MdAddShoppingCart } from "react-icons/md"
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext"
import { formatCurrency } from "../../utils/format-currency"

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {

    const { addToCart } = useContext(CartContext);

    return (
        <div className="rounded-2xl shadow-md">
            <Link to="/products/$productId" params={{ productId: String(product.id) }}>
                {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                    <img className="w-full max-h-100 object-cover rounded-md mb-2" src={product.images[0]} alt={product.name} />
                ) : (
                    <div className="w-full max-h-100 bg-gray-300 rounded-md mb-2" />
                )}
            </Link>

            <div className="text-black rounded-2xl p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>

                <p>{product.colors && product.colors.length > 0 ? product.colors[0] : "Sem cor"}</p>

                <div className="flex justify-between mt-2.5">
                    <p className="font-bold">{formatCurrency(product.price)}</p>

                    <button className="cursor-pointer" onClick={() => addToCart(product)}>
                        <MdAddShoppingCart className="h-7 w-7" />
                    </button>
                </div>
            </div>
        </div>
    )
}