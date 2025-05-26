import styles from './ImgPosts.module.css'

// Importa o componente Link do React Router para navegação entre páginas
import { Link } from 'react-router-dom'

// Componente funcional que recebe uma `post` como prop
const ImgPost = ({post}) => {
  return (

    <div className={styles.container}>
      {/* Div principal com a classe de estilo 'post_detail' */}
      <div className={styles.post_detail}>
        <Link to={`/posts/${post.id}`}>
         <img src={post.image} alt={post.title} />
        </Link>
        <div className={styles.imageText}>
          {post.title}
          </div>
      </div>
    </div>
  )
}

export default ImgPost
