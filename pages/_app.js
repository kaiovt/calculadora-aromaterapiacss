import 'font-awesome/css/font-awesome.min.css'; // Importando o CSS do Font Awesome
import '../styles/globals.css'; // Estilos globais
import styles from '../styles/HomePage.module.css'; // Importando os estilos específicos

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.container}>
      {/* Cabeçalho */}
      <header>
        
        <div className={styles.sky}>
    
    
    <div className={styles.cloudsmallcloud1}></div>
    
    <div className={styles.cloudsmallcloud3}></div>
    <div className={styles.cloudsmallcloud2}></div>
    <h1>TÍTULO DO CLIENTE</h1>
</div>

      </header>

      {/* Imagem de logo no topo */}
      <div className={styles.profileImageContainer}>
        <img
          src="/images/arom-logo.png" // Caminho relativo para a imagem
          alt="Logo Aromaterapia"
          className={styles.profileImage}
        />
     
      </div>

      {/* Componente da página */}
      <Component {...pageProps} />

      {/* Rodapé */}
      <footer className={styles.footer}>
        <p>&copy; 2024 Aromaterapia Inc.</p>
       



<div class={styles.rosegarden}>
  <div class={styles.cssrosestem}></div>
  <div class={styles.cssrosestem}></div>
  <div class={styles.cssrosestem}></div>
  <div class={styles.cssrosestem}></div>
  <div class={styles.cssrosestem}></div>
  <div class={styles.cssrosestem}></div>
  <div class={styles.cssrosestem}></div>
</div>

      </footer>
    </div>
  );
}

export default MyApp;
