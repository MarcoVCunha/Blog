import { useState, useEffect } from "react";

// Importa a instância do Firestore configurada no Firebase
import { db } from '../Firebase/config'

// Funções do Firestore para buscar um documento específico
import { 
    doc, getDoc
} from "firebase/firestore";

// Hook personalizado para buscar um único documento de uma coleção no Firestore
export const useFetchDocument = (docCollection, id) => {

    const [document, setDocument] = useState([])      // Guarda o documento retornado
    const [error, setError] = useState(null)          // Guarda erro, se ocorrer
    const [loading,setLoading] = useState(null)       // Indica o status de carregamento

   // Estado para prevenir vazamento de memória se o componente for desmontado durante a requisição
   const [cancelled, setCancelled] = useState(false)

    // useEffect para buscar o documento ao montar o componente ou quando os parâmetros mudarem
   useEffect(() =>{

     // Função assíncrona para buscar o documento
    async function loadDocument () {
        if (cancelled) return; // Se o componente já foi desmontado, interrompe

        setLoading(true); // Começa o carregamento

        try {
             // Cria a referência ao documento usando a coleção e o ID fornecidos
            const docRef = await doc(db, docCollection, id)
            
            // Busca o documento no Firestore
            const docSnap = await getDoc(docRef)

            // Salva os dados do documento no estado
            setDocument(docSnap.data())

            setLoading(false); // Finaliza o carregamento

        } catch (error) {
            console.log(error);

            setError(error.message); // Salva a mensagem de erro

            setLoading(false); // (provavelmente aqui seria setLoading(false))
        }

    }

    loadDocument(); // Executa a função assim que o efeito é chamado


   }, [docCollection, id, cancelled]) // Reexecuta quando a coleção, id ou o estado "cancelled" mudar

   useEffect(() => {
    return () => setCancelled(true);  // Marca o componente como desmontado
   }, []);

   // Retorna os dados para o componente que estiver utilizando o hook
   return {document, loading, error};
}