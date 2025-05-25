import styles from './PostDetail.module.css'

// Importa o componente Link do React Router para navegação entre páginas
import { Link } from 'react-router-dom'

// Componente funcional que recebe uma `post` como prop
const PostDetail = ({post}) => {
  return (

    // Div principal com a classe de estilo 'post_detail'
    <div className={styles.post_detail}>

      {/* Exibe a imagem do post */}
      <img src={post.image} alt={post.title} />

      {/* Título do post */}
      <h2>{post.title}</h2>

      {/* Nome do autor do post, com estilo aplicado */}
      <a href=" " className={styles.createdby}>@{post.createBy}</a>

      {/* Lista de tags relacionadas ao post */}
      <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
               // Cada tag é exibida com um # na frente. A `key` é obrigatória para listas no React.
                <p key={tag}>
                    <span>#</span>
                    {tag}
                </p>
            ))}
      </div>

      {/* Link que leva o usuário à página de detalhes do post */}
      <Link to={`/posts/${post.id}`} className='btn btn-outline'>
      Ler
      </Link>
    </div>
  )
}

export default PostDetail
