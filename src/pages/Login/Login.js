import styles from './Login.module.css'

// Hook customizado que contém as funções de autenticação (login, register, etc.)
import { useAuthentication } from '../../hooks/useAuthentication';
import {useState, useEffect, use} from 'react'

const Login = () => {
  // ─── Estados controlados do formulário ────────────────────
    const [email, setEmail] = useState ("");
    const [password, setPassword] = useState ("");

    // Estado para mensagem de erro local (validações, auth, etc.)
    const [error, setError] = useState ("");
  
    // Desestrutura o hook de autenticação
    // • login      → função assíncrona que tenta logar no back-end
    // • authError  → erro devolvido pelo back-end
    // • loading    → flag booleana enquanto a requisição de login está em andamento
    const {login, error: authError, loading} = useAuthentication();
  
    //Submissão do formulário 
    const handleSubmit = async (e) => {
      e.preventDefault() // Evita reload da página
      setError(""); // Limpa erro local antes de tentar logar
  
      // Monta o objeto com as credenciais
      const user = {
        email,
        password
      }
  
      // Aguarda o resultado da função login
      const res = await login(user)
  
      console.log(res);  // Opcional: visualizar resposta no console

      // Limpa os campos do formulário (boa UX)
      setEmail("");
      setPassword("");
    
    }
  
    // Sincroniza o erro do back-end com o erro local
    useEffect(() => {
  
      if(authError) {
        setError(authError)
      }
  
    }, [authError])

  return (
    <div className={styles.login}>
      <h1>Entrar</h1>
      <p>Faça o login para utilizar o sistema</p>

      <form onSubmit={handleSubmit}>
        {/* Campo de e-mail */}
          <label>
          <span>E-mail: </span>
            <input
            type="email"
            name='email'
            required
            placeholder='E-mail do usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          {/* Campo de senha */}
          <label>
            <span>Senha: </span>
            <input
            type="password"
            name='password'
            required
            placeholder='Insira sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {/* Botão: muda texto/disabled conforme estado de loading */}
          {!loading && <button className='btn'>Entrar</button>}
          {loading && (
            <button className='btn'>
            Aguarde...
          </button>
          )} 

          {/* Mensagem de erro, se existir */}
          {error && <p className='error'>{error}</p>}
      </form>
    </div>
  )
}

export default Login
