import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";

// Cria o contexto de autenticação com valor inicial (user nulo)
const AuthContext = createContext({ user: null });

// Componente que irá envolver toda a aplicação para prover o contexto de autenticação
export function AuthProvider({ children }) {
  // Estado que armazena o usuário autenticado
  const [user, setUser] = useState(undefined);

  // Obtém a instância de autenticação do Firebase
  const auth = getAuth();

  // useEffect para monitorar mudanças no estado de autenticação do Firebase
  useEffect(() => {
    // Função do Firebase que escuta as mudanças de autenticação (login, logout, etc.)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Atualiza o estado com o usuário atual (ou null se deslogado)
    });

    // Cleanup: remove o listener quando o componente for desmontado
    return () => unsubscribe();
  }, [auth]); // Executa esse efeito sempre que o objeto auth mudar

  // Enquanto o estado `user` ainda está indefinido (carregando), exibe uma mensagem
  if (user === undefined) {
    return <p>Carregando...</p>;
  }

  // Fornece o valor `user` para todos os componentes filhos via o contexto
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
}

// Hook personalizado que permite acessar o valor do contexto de autenticação
export function useAuthValue() {
  return useContext(AuthContext);
}
