// Importa o componente Link para navegação entre rotas sem recarregar a página
import { Link } from 'react-router-dom'
import styles from './About.module.css'

// Importa o contexto de autenticação para verificar se o usuário está logado
import { useAuthValue } from '../../context/AuthContext'

// Componente funcional About
const About = () => {

  // Obtém o usuário logado a partir do contexto de autenticação
  const { user } = useAuthValue();

  return (
    <div className={styles.about}>
      <h1>Sobre o Mini <span>Blog</span></h1>

       {/* Descrição do projeto */}
      <p>Este projeto consiste em um blog feito com React no Front-end e FireBase no Back-end.</p>

      {/* Se o usuário estiver logado, mostra link para criar um post */}
      {user && (
        <Link to='/post/create' className='btn'>Criar Post</Link>
      )}

      {/* Se o usuário NÃO estiver logado, redireciona para login ao tentar criar um post */}
      {!user && (
        <Link to='/login' className='btn'>Criar Post</Link>
      )}
    </div>
  )
}

export default About
