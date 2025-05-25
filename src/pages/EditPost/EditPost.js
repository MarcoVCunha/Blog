import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";

// Navegação entre páginas
import { useParams, useNavigate } from "react-router-dom";

// Hook personalizado que fornece os dados do usuário logado
import { useAuthValue } from "../../context/AuthContext";

// Hook personalizado para inserir documentos no Firestore
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  // Estados para controlar os valores dos campos do formulário
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState(""); // Estado para erros de validação

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = Array.isArray(post.tagsArray)
        ? post.tagsArray.join(", ")
        : "";

      setTags(textTags);
    }
  }, [post]);

  const { user } = useAuthValue(); // Obtém o usuário logado via contexto

  const { updateDocument, response } = useUpdateDocument("posts");
  // Hook que insere um documento na coleção "posts" do Firestore
  // `response` contém o estado da operação (loading, error)

  const navigate = useNavigate(); // Permite redirecionar programaticamente para outra página

  // Função que lida com o envio do formulário
  const handleSubmite = (e) => {
    e.preventDefault();
    setFormError("");

    // validade image URL
    try {
      new URL(image); // Tenta construir uma URL com a string
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
      return; // Impede o envio se for inválida
    }

    // Cria um array de tags a partir da string, separando por vírgulas
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // Verifica se todos os campos foram preenchidos
    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!");
    }

    // Chama o hook para inserir o post no Firestore
    updateDocument(id, {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid, // ID do usuário logado
      createBy: user.displayName, // Nome do usuário logado
    });

    // redirect to home page
    navigate("/dashboard");
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editando post: {post.title}</h2>
          <p>Altere os dados do post como desejar</p>

          <form onSubmit={handleSubmite}>
            {/* Campo do título */}
            <label>
              <span>Titulo:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Pense num bom título..."
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>

            {/* Campo da imagem */}
            <label>
              <span>URL da imagem:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que represente seu post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual:</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />

            {/* Campo do conteúdo */}
            <label>
              <span>Conteúdo:</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>

            {/* Campo das tags */}
            <label>
              <span>Tags:</span>
              <input
                type="text"
                name="Tags"
                required
                placeholder="Insira as tags separadas por vígulas"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>

            {/* Botões: mostra "Cadastrar" ou "Aguarde..." dependendo do estado do request */}
            {!response.loading && <button className="btn">Editar</button>}
            {response.loading && <button className="btn">Aguarde...</button>}

            {/* Exibição de erros */}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
