import React, { useState } from 'react';

import ProductCalculator from '../components/ProductCalculator';
import PersonCalculator from '../components/PersonCalculator';
import SocialMediaLinks from '../components/SocialMediaLinks'; // Importando o componente de redes sociais
import styles from '../styles/HomePage.module.css'; // Importando os estilos específicos da página

export default function Home() {
  const [showProductCalculator, setShowProductCalculator] = useState(true);

  // Função para rolar até o meio da página com animação suave
  const scrollToMiddle = () => {
    const targetPosition = window.innerHeight / 1.5; // Rolando até a metade da tela
    const startPosition = window.pageYOffset; // Posição atual da rolagem
    const distance = targetPosition - startPosition; // Distância a ser percorrida
    const duration = 1000; // Tempo em milissegundos para a rolagem (1 segundo, por exemplo)
    let startTime = null;

    // Função para animar a rolagem
    const animateScroll = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1); // Evita ultrapassar 100%

      window.scrollTo(0, startPosition + distance * progress);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll); // Continua a animação até a duração
      }
    };

    requestAnimationFrame(animateScroll); // Inicia a animação
  };

  return (
    <div className={styles.pageContainer}>
      {/* Título da página */}
     

      {/* Componente de Redes Sociais */}
      
      <SocialMediaLinks /> {/* Coloque ele aqui para exibir no topo */}
      <h6 className={styles.nomecliente}>COLOCAR O NOME DO CLIENTE</h6>
      {/* Botões para alternar entre as calculadoras */}
      <div className={styles.buttonGroup}>
        <button 
          onClick={() => {
            setShowProductCalculator(true); 
            scrollToMiddle(); // Chama a função de rolagem suave
          }} 
          className={styles.button}>
          Calculadora de Produto
        </button>
        <button 
          onClick={() => {
            setShowProductCalculator(false);
            scrollToMiddle(); // Chama a função de rolagem suave
          }} 
          className={styles.button}>
          Calculadora de Pessoa
        </button>
      </div>

      {/* Contêiner das calculadoras */}
      <div className={styles.calculatorContainer}>
        {showProductCalculator ? <ProductCalculator /> : <PersonCalculator />}
      </div>
    </div>
  );
}
