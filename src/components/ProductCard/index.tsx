import { Link } from "@tanstack/react-router"
import type { Product } from "../../interfaces/product"
import { MdAddShoppingCart } from "react-icons/md"
import { useContext } from "react"
import { CartContext } from "../../contexts/CartContext/CartContext"
import { formatCurrency } from "../../utils/format-currency"

interface ProductCardProps {
    product: Product
}

export const ProductCard = ({ product }: ProductCardProps) => {

    const { addToCart } = useContext(CartContext);

    return (
        <div className="rounded-2xl shadow-md bg-white">
            <Link to="/products/$productId" params={{ productId: String(product.id) }}>
                {product.images && Array.isArray(product.images) && product.images.length > 0 ? (
                    <img className="w-full max-h-100 object-cover rounded-t-2xl mb-2"
                        src={product.images[0]}
                        alt={product.name} />
                ) : (
                    <div className="w-full h-100 bg-gray-200 rounded-t-2xl mb-2 flex items-center justify-center text-gray-400">Sem imagem</div>
                )}
            </Link>

            <div className="text-black p-4 pt-0">
                <Link to="/products/$productId"
                    params={{ productId: String(product.id) }}
                    className="hover:underline">
                    <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                </Link>

                <p className="text-sm text-gray-500">{product.colors && product.colors.length > 0 ? product.colors[0] : (product.color || "Sem cor")}</p>

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