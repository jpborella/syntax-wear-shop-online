import { createFileRoute, Link } from "@tanstack/react-router";
import { formatCurrency } from "../../../utils/format-currency";
import { CartContext } from "../../../contexts/CartContext/CartContext";
import { useContext, useEffect, useState } from "react";
import { CEPForm } from "../../../components/CEPForm";
import { getProductById } from "../../../services/productService";
import type { Product } from "../../../interfaces/product";

export const Route = createFileRoute("/_app/products/$productId")({
  component: RouteComponent,
  head: () => ({ meta: [{ title: "Produto - Produtos - SyntaxWear" }] }),
});

function RouteComponent() {
  const { addToCart } = useContext(CartContext);

  const { productId } = Route.useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setNotFound(false);

    const id = Number(productId);
    getProductById(id)
      .then((p) => {
        if (!mounted) return;
        setProduct(p as Product);
        document.title = `${p.name} - Produtos - SyntaxWear`;
      })
      .catch((err) => {
        console.error('Erro ao buscar produto:', err);
        if (!mounted) return;
        setNotFound(true);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [productId]);

  if (loading)
    return (
      <section className="container mb-10 pt-44 md:pt-54 pb-10 md:px-10 text-center text-black min-h-[80vh] flex flex-col items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#212A2F]"></div>
      </section>
    );

  if (notFound || !product)
    return (
      <section className="container mb-10 pt-44 md:pt-54 pb-10 md:px-10 text-center text-black min-h-[80vh] flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">Produto não encontrado</h1>
        <p className="mb-6">O produto que você está procurando não existe ou foi removido.</p>
        <Link to="/products" className="text-accent hover:text-accent-hover underline">
          Voltar para produtos
        </Link>
      </section>
    );

  const originalPrice = product?.price ?? 0;

  const discountPrice = originalPrice * 0.9;

  const inInstallmentsPrice = originalPrice / 6;

  return (
    <section className="container mb-10 pt-44 md:pt-54 pb-10 md:px-10">
      <nav className="text-black text-sm mb-15 ml-5">
        <Link to="/">Home</Link> / <Link to="/products">Produtos</Link> /{" "}
        <span className="font-semibold">{product?.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row justify-center gap-10">
        <img src={product?.images?.[0]} alt={product?.name} className="w-full md:w-125 bg-white rounded-2xl object-cover" />

        <div className="text-black flex-1">
          <h1 className="text-4xl font-bold mb-1">{product?.name}</h1>

          <p className="mb-2">Cor: {product?.colors?.[0] || product?.color || "Não especificada"}</p>

          <p className="line-through text-sm text-[#878787]">{formatCurrency(originalPrice)}</p>

          <p className="text-3xl font-bold mb-2">{formatCurrency(discountPrice)} no PIX</p>

          <p className="text-sm text-[#878787]">Você economiza: <span className="font-semibold">10%</span></p>

          <p className="mb-2">ou <span className="text-[#38373A] font-semibold">6X</span> de <span className="text-[#38373A] font-semibold">{formatCurrency(inInstallmentsPrice)}</span></p>

          <p className="max-w-125 my-5">{product?.description}</p>

          <div className="mb-6">
            <p className="text-sm">Calcular o prazo de entrega</p>

            <CEPForm />
          </div>

          <button
            className="bg-black text-white rounded-md p-5 w-full cursor-pointer hover:bg-gray-800"
            onClick={() => addToCart(product)}
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </section>
  );
}
