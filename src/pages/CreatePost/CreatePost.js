import styles from './CreatePost.module.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'


const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const handleSubmite = (e) => {
    e.prevenDefult();
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form action={handleSubmite}>
        <label>
          <span>Titulo:</span>
          <input 
            type="text" 
            name='title' 
            required 
            placeholder='Pense num bom título...'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input 
            type="text" 
            name='image' 
            required 
            placeholder='Insira uma imagem que represente seu post'
            onChange={(e) => setImage(e.target.value)}
            value={Image}
          />
        </label>
        <label>
          <span>Conteúdo:</span>
          <textarea 
          name="body"
          required
          placeholder='Insira o conteúdo do post'
          onChange={(e) => setBody(e.target.value)}
          value={body}
          ></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input 
            type="text" 
            name='Tags' 
            required 
            placeholder='Insira as tags separadas por vígulas'
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        <button className='btn'>Cadastrar</button>
        {/*!loading && <button className='btn'>Cadastrar</button>}
          {loading && (
            <button className='btn'>
            Aguarde...
          </button>
          )} 
          {error && <p className='error'>{error}</p>*/}
      </form>
    </div>
  )
}

export default CreatePost
