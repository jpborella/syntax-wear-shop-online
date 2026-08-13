import { Link } from "@tanstack/react-router";

const menus = [
    { title: "Masculino", items: [
        { label: "Casual", href: "/products/category/casual?gender=MASCULINO" },
        { label: "Esporte", href: "/products/category/esporte?gender=MASCULINO" },
        { label: "Moderno", href: "/products/category/moderno?gender=MASCULINO" },
        { label: "Futurista", href: "/products/category/futurista?gender=MASCULINO" }
    ] },
    { title: "Feminino", items: [
        { label: "Casual", href: "/products/category/casual?gender=FEMININO" },
        { label: "Esporte", href: "/products/category/esporte?gender=FEMININO" },
        { label: "Moderno", href: "/products/category/moderno?gender=FEMININO" },
        { label: "Futurista", href: "/products/category/futurista?gender=FEMININO" }
    ] },
    { title: "Outlet", items: [
        { label: "Masculino", href: "/products/category/outlet" },
        { label: "Feminino", href: "/products/category/outlet" }
    ] },
    { title: "Sobre", items: [
        { label: "Quem Somos", href: "/about" },
        { label: "Missão", href: "/about" }
    ] },
]

export const MenuItens = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-8">
            {menus.map(({ title, items }) => (
                <nav key={title}>
                    <ul className="flex flex-col gap-4">
                        <li>
                            <p className="font-normal text-surface-alt text-xl">{title}</p>
                        </li>
                        {items.map((item) => (
                            <li key={item.label}>
                                <Link to={item.href} className="font-medium hover:text-text-tertiary transition-colors text-xl">
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            ))}
        </div>
    );
}