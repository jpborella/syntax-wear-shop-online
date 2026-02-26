import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

// Cria a rota de layout '/_app'.
// Essa rota atua como “casca” compartilhada para as rotas filhas dentro de /_app.
export const Route = createFileRoute("/_app")({
    component: AppLayout,
});

function AppLayout() {
    return (
        <div>
            <Header />
            {/* Renderiza a rota filha ativa (por exemplo, a rota index '/'). */}
            <Outlet />
            <Footer />
        </div>
    );
}