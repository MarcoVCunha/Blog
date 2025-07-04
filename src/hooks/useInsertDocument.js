import { useState, useEffect, useReducer } from "react";
import {db} from '../Firebase/config'
import { collection, addDoc, Timestamp } from "firebase/firestore";

// Estado inicial do reducer: não está carregando nem com erro
const initialState = {
    loading: null,
    error: null
}

// Reducer para gerenciar os estados da inserção (loading, sucesso, erro)
const insertReducer = (state, action) => {
    switch(action.type) {
        case "LOADING":
            // Define estado para carregando e sem erro
            return {loading: true, error: null}
        case "iNSERTED_DOC": 
            // Estado para inserção concluída com sucesso, sem erro
            return {loading: false, error: null}
        case "ERROR":
             // Estado para erro: loading false e armazena mensagem de erro
            return {loading:false, error: action.payload}
        default:
            // Retorna estado atual caso ação desconhecida
            return state;
    }
}

// Hook customizado para inserir documento em uma coleção do Firestore
export const useInsertDocument = (docCollection) => {

    // useReducer para controlar o estado da operação de inserção
    const [response, dispatch] = useReducer(insertReducer, initialState)

    // Estado para controlar se o componente foi desmontado, prevenindo vazamento de memória
    const [cancelled, setCancelled] = useState(false)

    // Função que só despacha ações se o componente ainda estiver montado
    const checkCancelBeforeDispatch = (action) => {
        if(!cancelled){
            dispatch(action)
        }
    }

    // Função assíncrona para inserir documento no Firestore
    const insertDocument = async(document) =>{
        // Dispara ação para setar loading true antes da operação
        checkCancelBeforeDispatch({
            type: "LOADING",
        })
    

        try {
            // Cria novo documento adicionando timestamp de criação
            const newDocument = {...document, createdAt: Timestamp.now()}

            // Adiciona documento na coleção passada como parâmetro
            const InsertedDocument = await addDoc(
                collection(db, docCollection),
                newDocument
            );

            // Dispara ação de sucesso informando que inserção foi concluída
            checkCancelBeforeDispatch({
                type: "INSERTED_DOC",
                payload: InsertedDocument,
            });

        } catch (error) {
             // Caso ocorra erro, despacha ação com a mensagem de erro
            checkCancelBeforeDispatch({
                type: "ERROR",
                payload: error.message,
            })
            
        }
    }

    // useEffect para atualizar o estado "cancelled" quando o componente desmonta
    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    // Retorna a função para inserir documento e o estado da operação
    return {insertDocument, response}
    }

