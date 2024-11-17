import React, { useState } from 'react';

import ProductCalculator from '../components/ProductCalculator';
import PersonCalculator from '../components/PersonCalculator';
import SocialMediaLinks from '../components/SocialMediaLinks'; // Importando o componente de redes sociais
import styles from '../styles/HomePage.module.css'; // Importando os estilos específicos da página


export default function Home() {
  const [showProductCalculator, setShowProductCalculator] = useState(true);

  return (
    <div className={styles.pageContainer}>
      {/* Título da página */}
      <p className={styles.companyname}>COLOCAR O NOME DO CLIENTE</p>

      {/* Componente de Redes Sociais */}
      <SocialMediaLinks /> {/* Coloque ele aqui para exibir no topo */}

      {/* Botões para alternar entre as calculadoras */}
      <div className={styles.buttonGroup}>
        <button onClick={() => setShowProductCalculator(true)} className={styles.button}>
          Calculadora de Produto
        </button>
        <button onClick={() => setShowProductCalculator(false)} className={styles.button}>
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
