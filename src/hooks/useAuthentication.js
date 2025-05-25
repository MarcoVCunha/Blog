// Importa as configurações do Firebase (app e banco de dados)
import{app, db} from '../Firebase/config'

// Importa funções do Firebase Auth para autenticação
import{
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
}   from 'firebase/auth'

import { useState, useEffect} from 'react'

// Hook personalizado que encapsula toda a lógica de autenticação
export const useAuthentication = () => {
    const [error, setError] = useState(null)     // Armazena mensagens de erro
    const [loading, setLoading] = useState(null) // Indica se está carregando alguma operação (ex: login)
    
    // cleanup
    // deal with memory leak
    const [cancelled, setCancelled] = useState(false) // Controle para evitar que operações assíncronas sejam executadas após desmontar o componente (evita memory leak)

    const auth = getAuth() // Obtém a instância de autenticação do Firebase

    // Função que impede execução de código se o componente já foi desmontado
    function checkIfCancelled() {
        if(cancelled) {
            return;
        }
    }

//Register
    const createUser = async (data) =>{
        checkIfCancelled()

        setLoading(true);
        setError(null)

        try {
            // Cria o usuário com e-mail e senha
            const {user} = await createUserWithEmailAndPassword (
                auth,
                data.email,
                data.password
            )

            // Atualiza o nome do usuário (displayName)
            await updateProfile(user, {
                displayName: data.displayName
            })

            setLoading(false);

            // Retorna o usuário criado
            return user
            
        } catch (error) {
            
            console.log(error.message) // Log para debug
            console.log(typeof error.message);

            let systemErrorMessage

            // Verifica o tipo de erro retornado e traduz para o usuário
            if(error.message.includes("Password")){
                systemErrorMessage = "A senha precisa conter pelo menos 6 caracteres."
            } else if(error.message.includes("auth/email-already-in-use")){
                systemErrorMessage = "Email ja cadastrado."
            } else {
                systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde."
            }

            setLoading(false)
            setError(systemErrorMessage)

        }

        
    };

// Logout - Sing out
    const logout = () => {

        checkIfCancelled();

        signOut(auth);

    }

// Login - Sing In

const login = async(data) => {

    checkIfCancelled()

    setLoading(true)
    setError(false)

    try {
        
        // Autentica o usuário com e-mail e senha
        await signInWithEmailAndPassword(   
            auth, 
            data.email, 
            data.password)
        
        setLoading(false);

    } catch (error) {

        let systemErrorMessage;

        // Verifica o tipo de erro e trata mensagens para o usuário
        if (error.message.includes("Password")) {
            systemErrorMessage = "Usuário não encontrado."
        } else if(error.message.includes("wrong-password")) {
            systemErrorMessage = "Senha incorreta. Tente novamente!"
        } else {
            systemErrorMessage = "Ocorreu um erro, por favor tente mais tarde"
        }

        setError(systemErrorMessage);
        setLoading(false);

    }
}

    // useEffect é executado uma vez ao montar o componente e garante que o hook saiba quando ele for desmontado
    useEffect(() => {
        return () => setCancelled(true);
    }, [])

    // Retorna os métodos e variáveis que outros componentes vão usar
    return{
        auth, 
        createUser,
        error,
        loading,
        logout,
        login,
    }
}