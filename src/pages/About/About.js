import { Link } from 'react-router-dom'
import styles from './About.module.css'

import { useAuthValue } from '../../context/AuthContext'

const About = () => {

  const { user } = useAuthValue();

  return (
    <div className={styles.about}>
      <h1>Sobre o Mini <span>Blog</span></h1>
      <p>Este projeto consiste em um blog feito com React no Front-end e FireBase no Back-end.</p>
      {user && (
        <Link to='/post/create' className='btn'>Criar Post</Link>
      )}
      {!user && (
        <Link to='/login' className='btn'>Criar Post</Link>
      )}
    </div>
  )
}

export default About
