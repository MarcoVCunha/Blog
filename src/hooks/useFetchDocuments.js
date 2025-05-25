import { useState, useEffect } from "react";
import { db } from "../Firebase/config";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  QuerySnapshot,
} from "firebase/firestore";

// Hook personalizado para buscar múltiplos documentos com filtro opcional
export const useFetchDocuments = (docCollection, search = null, uid = null) => {
  const [documents, setDocuments] = useState(null); // Estado que armazena os documentos retornados
  const [error, setError] = useState(null); // Estado que armazena mensagens de erro
  const [loading, setLoading] = useState(null); // Estado de carregamento

  // deal with memory leak
  const [cancelled, setCancelled] = useState(false); // Previne vazamento de memória

  useEffect(() => {
    async function loadData() {
      if (cancelled) return; // Se cancelado (desmontado), interrompe

      setLoading(true); // Inicia o carregamento

      const collectionRef = await collection(db, docCollection); // Referência à coleção

      try {
        let q;

        // Se há uma pesquisa (ex: busca por uma tag específica)
        if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search), // Filtra por array que contém a tag
            orderBy("createdAt", "desc")
          ); // Ordena pela data de criação
        } 
        // Se há um usuário logado, filtra os documentos por UID
        else if (search) {
          q = query(
            collectionRef,
            where("tagsArray", "array-contains", search),
            orderBy("createdAt", "desc")
          );
        } else if (uid) {
          q = query(
            collectionRef,
            where("uid", "==", uid),
            orderBy("createdAt", "desc")
          );
        }
        // Sem filtros: apenas ordena pela data
        else {
          q = query(
            collectionRef, 
            orderBy("createdAt", "desc")
        );
        }

         // onSnapshot escuta mudanças em tempo real
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
          setDocuments(
            querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          );
        });

        setLoading(false); // Finaliza o carregamento

        // Cleanup do listener
        return () => unsubscribe();

      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }

    loadData(); // Executa a função ao montar o componente

  }, [cancelled, docCollection, search, uid]); 

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documents, loading, error };
};
