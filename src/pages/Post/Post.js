import styles from './Post.module.css'

//hooks
import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument';

const Post = () => {
  // Pega o parâmetro dinâmico da rota (ex.: /posts/:id)
  // Se a rota for /posts/abc123 -> id === "abc123"
    const {id} = useParams();

    // Hook customizado que busca UM documento da coleção "posts" com o id fornecido
    // • post → objeto com os dados do post ou null enquanto carrega/erro
    const {document: post, loading} = useFetchDocument("posts", id)

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando posts...</p>}
      {post && (
        <>
            <h1>{post.title}</h1>


            <div className={styles.post_content}>
              <img src={post.image} alt={post.title} />
              <p className={styles.b}>{post.body}</p>
              <p className={styles.b}>Criado por: <span>{post.createBy}</span></p>
              <h3>Este post trata sobre: </h3>
              <div className={styles.tags}>
                {Array.isArray(post.tagsArray) && post.tagsArray.map((tag) => (
                    <p key={tag}>
                      <span>#</span>{tag}
                    </p>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Post
