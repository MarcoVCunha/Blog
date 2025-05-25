// Importa o hook useLocation do react-router-dom para acessar a URL atual
import { useLocation } from "react-router-dom";

// Importa o hook useMemo do React para memorizar valores calculados
import { useMemo } from "react";

// Hook customizado que retorna os parâmetros de consulta (query params) da URL
export function useQuery() {
    // Extrai apenas a parte da URL que contém os parâmetros de busca (ex: ?user=1)
    const {search} = useLocation();

    // Memoriza a criação do objeto URLSearchParams para evitar recriar a cada render
     return useMemo(
        () => new URLSearchParams(search), // Converte a string da query em um objeto manipulável
        [search] // Recalcula apenas se 'search' mudar
        );
}