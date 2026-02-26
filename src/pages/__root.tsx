import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'

// Define a rota raiz (__root__).
// Ela é o ponto de entrada da árvore de rotas e envolve todas as rotas filhas.
export const Route = createRootRoute({
    component: RootComponent,
})

function RootComponent() {
    return (
        <React.Fragment>
            {/*
            Outlet é o “slot” onde o TanStack Router renderiza a rota filha ativa.
            Ex.: quando a URL for '/', o componente da rota index será exibido aqui.
            */}
            <Outlet />
        </React.Fragment>
    )
}
