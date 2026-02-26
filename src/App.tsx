import { RouterProvider, createRouter } from "@tanstack/react-router"
import { routeTree } from "./router-tree-gen"

// Cria a instância principal do roteador usando a árvore de rotas gerada automaticamente.
const router = createRouter({ routeTree });

// Registra o tipo do roteador no TanStack Router para habilitar tipagem forte em links,
// navegação e uso de parâmetros de rota em toda a aplicação.
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
};

function App() {

  // Injeta o roteador na aplicação React; a partir daqui as rotas passam a controlar
  // qual página/componente será renderizada de acordo com a URL atual.
  return <RouterProvider router={router} />

}

export default App

