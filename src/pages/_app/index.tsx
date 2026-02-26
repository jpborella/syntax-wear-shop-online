import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '../../components/Hero';
import { Categories } from '../../components/Categories';
import { Gallery } from '../../components/Gallery';

// Define a rota de arquivo '/_app/' (equivalente à página inicial '/').
// Quando esta rota estiver ativa, o TanStack Router renderiza RouteComponent.
export const Route = createFileRoute('/_app/')({
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <main className="py-10">
                <Hero />

                <Categories />
                
                <Gallery />
            </main>
        </>
    )
}
