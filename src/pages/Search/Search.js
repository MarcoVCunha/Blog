import styles from './Search.module.css'

//hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments' // busca Firestore
import { useQuery } from '../../hooks/useQuery' // lê ?q= da URL

//components
import PostDetail from '../../components/PostDetail'

import { Link } from 'react-router-dom'

const Search = () => {
  // Hook que converte a query-string (?q=algo) em objeto URLSearchParams
    const query = useQuery()

    // Extrai o valor de ?q
    // Ex.: /search?q=javascript  →  search === "javascript"
    const search = query.get("q")

  /**
   * Busca no Firestore:
   * - Coleção: "posts"
   * - Termo de pesquisa: search
   * O hook é implementado de forma que, quando recebe o segundo argumento,
   * ele filtra os documentos (ex.: onde array "tags" contém 'search').
   */
    const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div className={styles.search_container}>
      <h2>Search</h2>

      <div>
        {/* Nenhum resultado encontrado */}
        {posts && posts.length === 0 && (
            <div className={styles.noposts}>
                <p>Não foram encontrado posts...</p>
                <Link to="/" className='btn btn-dark'>Voltar</Link>
            </div>
        )}

         {/* Renderiza cada post retornado */}
        {posts && posts.map((post) => (
            <PostDetail key={post.id} post={post}/>
        ))}
      </div>
    </div> 
  )
}

export default Search
