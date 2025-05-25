import { useState, useEffect, useReducer } from "react";
import { db } from "../Firebase/config";
import { doc, deleteDoc } from "firebase/firestore";

// Estado inicial do reducer: não está carregando nem com erro
const initialState = {
  loading: null,
  error: null,
};

// Reducer para gerenciar os estados da inserção (loading, sucesso, erro)
const deleteReducer = (state, action) => {
  switch (action.type) {
    case "LOADING":
      // Define estado para carregando e sem erro
      return { loading: true, error: null };
    case "DELETED_DOC":
      // Estado para inserção concluída com sucesso, sem erro
      return { loading: false, error: null };
    case "ERROR":
      // Estado para erro: loading false e armazena mensagem de erro
      return { loading: false, error: action.payload };
    default:
      // Retorna estado atual caso ação desconhecida
      return state;
  }
};

// Hook customizado para inserir documento em uma coleção do Firestore
export const useDeleteDocument = (docCollection) => {
  // useReducer para controlar o estado da operação de inserção
  const [response, dispatch] = useReducer(deleteReducer, initialState);

  // Estado para controlar se o componente foi desmontado, prevenindo vazamento de memória
  const [cancelled, setCancelled] = useState(false);

  // Função que só despacha ações se o componente ainda estiver montado
  const checkCancelBeforeDispatch = (action) => {
    if (!cancelled) {
      dispatch(action);
    }
  };

  // Função assíncrona para inserir documento no Firestore
  const deleteDocument = async (id) => {
    // Dispara ação para setar loading true antes da operação
    checkCancelBeforeDispatch({
      type: "LOADING",
    });

    try {
      const deleteDocument = await deleteDoc(doc(db, docCollection, id));

      // Dispara ação de sucesso informando que inserção foi concluída
      checkCancelBeforeDispatch({
        type: "DELETED_DOC",
        payload: deleteDocument,
      });
    } catch (error) {
      // Caso ocorra erro, despacha ação com a mensagem de erro
      checkCancelBeforeDispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  // useEffect para atualizar o estado "cancelled" quando o componente desmonta
  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  // Retorna a função para inserir documento e o estado da operação
  return { deleteDocument, response };
};
