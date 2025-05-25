import styles from './Home.module.css'

//hooks
import { useNavigate, Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchDocuments } from "../../hooks/useFetchDocuments" // busca Firestore

//components que exibe um post isolado
import PostDetail from "../../components/PostDetail"

const Home = () => {
  // Estado do campo de pesquisa de tags
  const [query, setQuery] = useState("")

  // Busca todos os documentos da coleção "posts" em tempo real
  //  • posts   → array de posts retornados
  //  • loading → flag booleana enquanto o Firestore ainda responde
  const {documents: posts, loading} = useFetchDocuments("posts")

   // Permite redirecionar programaticamente
  const navigate = useNavigate()

  // Enviado ao submeter o formulário de busca
  const handleSubmit = (e) => {
    e.preventDefault();// evita reload da página

    // Se o usuário digitou algo, vai para rota /search
    // Ex: /search?q=javascript
    if(query) {
      return navigate(`/search?q=${query}`)
    }
  }

  return (
    <div className={styles.home}>
      <h1>Veja os posts mais recentes</h1>

       {/* Formulário de busca por tag */}
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input 
          type="text"
          placeholder='Ou busque por tags...'
          onChange={(e) => setQuery(e.target.value)} // atualiza estado de busca
        />
        <button className="btn btn-dark">Pesquisar</button>
      </form>

      {/* Área de listagem de posts */}
      <div>

        {/* 1. Enquanto carrega do Firestore */}
        {loading && <p>Carregando...</p>}

        {/* 2. Quando há posts: renderiza PostDetail para cada um */}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className="noposts">
            {/* 3. Quando não há posts */}
            <p>Não foram encontrado posts</p>

            {/* Link para criar o primeiro post */}
            <Link to="/posts/create" className='btn'>
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
