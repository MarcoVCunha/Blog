import styles from './Footer.module.css'

// Define o componente funcional Footer
const Footer = () => {
  return (
    // Aplica a classe CSS 'footer' ao <div> principal do rodapé
    <div className={styles.footer}>
        <h3>Escreva sobre o que você tem interesse!</h3>
        <p>Mini blog &copy; 2025</p>
    </div>
  )
}

export default Footer
