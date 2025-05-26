import styles from './Navbar.module.css'

// Importa o hook customizado para autenticação (ex: login, logout)
import { useAuthentication } from '../hooks/useAuthentication'

// Importa o hook que fornece o valor do contexto de autenticação (usuário logado)
import { useAuthValue } from '../context/AuthContext'

// Importa NavLink do react-router-dom para navegação entre rotas com estilo ativo
import { NavLink } from 'react-router-dom'

import ThemeToggle from '../hooks/ThemeToggle' // Importa o componente de troca de tema

// Componente funcional Navbar que representa a barra de navegação do app
const Navbar = () => {

  // Pega o objeto user do contexto de autenticação (informa se tem usuário logado)
  const { user } = useAuthValue();
   // Pega a função logout para deslogar o usuário quando chamado
  const { logout } = useAuthentication();




  return (
    <div>
      <nav className={styles.navbar}>

         {/* Link para a página principal '/' com a marca do blog */}
        <NavLink to='/' className={styles.brand}>
            Mini <span>Blog</span>
        </NavLink>

        {/* Lista de links da navegação */}
        <ul className={styles.links_list}>

           {/* Link para Home */}
            < li>
                {/* NavLink usa uma função para definir a classe 'active' quando a rota está ativa */}
                <NavLink to='/' className={({isActive}) => (isActive ? styles.active : "")}>Home</NavLink>
            </li>

            {/* Se não houver usuário logado (user == null), mostra links Entrar e Cadastrar */}
            {!user && (
              <>
               <li>
                  <NavLink to='/login' className={({isActive}) => (isActive ? styles.active : "")}>Entrar</NavLink>
                </li>
                <li>
                  <NavLink to='/register' className={({isActive}) => (isActive ? styles.active : "")}>Cadastrar</NavLink> 
                </li>
              </>
              )}

            {/* Se houver usuário logado, mostra links Novo Post e Dashboard */}
            {user && (
              <>
              <li>
                <NavLink to='/posts/create' className={({isActive}) => (isActive ? styles.active : "")}>Novo Post</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard' className={({isActive}) => (isActive ? styles.active : "")}>Dashboard</NavLink>
              </li>
              </>
            )}

            {/* Link para página Sobre */}
            <li>
                <NavLink to='/about' className={({isActive}) => (isActive ? styles.active : "")}>Sobre</NavLink>
            </li>

            {/* Se usuário está logado, mostra botão para sair (logout) */}
            {user &&(
            <li>
              <button onClick={logout}>Sair</button>
            </li>
            )
            }
        </ul>
      </nav>
    </div>
  )
}

// Exporta o componente Navbar para ser usado em outras partes do app
export default Navbar
