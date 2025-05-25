// Importa o contexto de autenticação para verificar se o usuário está logado
import { useAuthValue } from "../context/AuthContext";

// Importa o componente de navegação do React Router para redirecionar usuários
import { Navigate } from "react-router-dom";

// - Componente que protege rotas com base na autenticação
// - requireAuth: se a rota exige autenticação
// - component: o componente que será renderizado se a condição for atendida
const ProtectedRoute = ({ requireAuth, component: Component }) => {
   // Obtém o usuário atual do contexto
  const { user } = useAuthValue();

  // Se a rota exige autenticação E o usuário NÃO está logado → redireciona para o login
  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }

  // Se a rota NÃO exige autenticação E o usuário está logado → redireciona para a home
  // (Ex: impedir que usuário logado acesse login ou cadastro)
  if (!requireAuth && user) {
    return <Navigate to="/" />;
  }

  // Se todas as condições forem atendidas → renderiza o componente da rota
  return <Component />;
};

// Exporta o componente para ser usado nas rotas protegidas do app
export default ProtectedRoute;
