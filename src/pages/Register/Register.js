// Hook de autenticação (cria usuários, faz login, etc.)
import { useAuthentication } from '../../hooks/useAuthentication';
import styles from './Register.module.css';

import {useState, useEffect, use} from 'react'

const Register = () => {
    // Estados controlados do formulário
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState ("");
  const [password, setPassword] = useState ("");
  const [confirmPassword, setConfirmPassword] = useState ("");
  const [error, setError] = useState (""); // erro de validação/local

  // Desestrutura funções/valores do hook de autenticação
  // • createUser → função assíncrona que cadastra no Firebase/Auth
  // • authError  → mensagem de erro vinda do back-end
  // • loading    → flag booleana enquanto a requisição está em andamento
  const {createUser, error: authError, loading} = useAuthentication();

  // Submissão do formulário
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(""); // limpa erro local

    const user = {
      displayName,
      email,
      password
    }

    // Validação: senhas devem coincidir
    if(password !== confirmPassword){
      setError("As senhas precisam ser iguais!")
      return;
    }

    // Chama o método de criação e aguarda resultado
    const res = await createUser(user)

    console.log(res); // opcional: ver resposta/erro no console
  }

  // Sincroniza erro do back-end com estado local
  useEffect(() => {

    if(authError) {
      setError(authError)
    }

  }, [authError])

  return (
    <div className={styles.register}>
      <h1>Cadastre-se para postar</h1>
      <p>Crie seu usuário e compartilhe suas histórias</p>
      
      <form onSubmit={handleSubmit}>
        {/* Nome de exibição */}
          <label>
            <span>Nome:</span>
            <input
            type="text"
            name='DisplayName'
            required
            placeholder='Nome do usuário'
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>

          {/* E-mail */}
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

           {/* Senha */}
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

          {/* Confirmação de senha */}
          <label>
            <span>Confirmação de senha: </span>
            <input
            type="password"
            name='confirmPassword'
            required
            placeholder='Confirme sua senha'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          {/* Botão mutável conforme estado de loading */}
          {!loading && <button className='btn'>Cadastrar</button>}
          {loading && (
            <button className='btn'>
            Aguarde...
          </button>
          )} 

           {/* Mensagem de erro, se houver */}
          {error && <p className='error'>{error}</p>}
      </form>
    </div>
  );
};

export default Register
