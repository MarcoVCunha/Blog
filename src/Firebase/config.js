
// Importa a função que inicializa o Firebase no app
import { initializeApp } from "firebase/app";

// Importa a função para acessar o Firestore (banco de dados do Firebase)
import { getFirestore } from "firebase/firestore"

// Importa a função para lidar com autenticação de usuários
import {getAuth} from 'firebase/auth'


// Objeto de configuração do Firebase (gerado no console do Firebase para seu projeto)
// Contém credenciais e identificadores do seu app
const firebaseConfig = {
  apiKey: "AIzaSyBhPKc3Zx5o6-ssbTyIQTP8ZW_vqJmtz_w",     // Chave de API (pública)
  authDomain: "miniblogs-ff70e.firebaseapp.com",        // Domínio de autenticação
  projectId: "miniblogs-ff70e",                         // ID do projeto
  storageBucket: "miniblogs-ff70e.firebasestorage.app", // Bucket de armazenamento (para arquivos)
  messagingSenderId: "1014050351372",                   // ID do serviço de mensagens  
  appId: "1:1014050351372:web:dbd464374d5431c5794129"   // ID da aplicação
};

// Inicializa o app Firebase com a configuração acima
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore com a instância do app Firebase
const db = getFirestore (app);

// Inicializa o sistema de autenticação com a instância do app Firebase
const auth = getAuth(app);

// Exporta as instâncias de Firestore e Auth para serem usadas em outros arquivos do projeto
export { db, auth };