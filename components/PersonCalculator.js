import React, { useState } from 'react';
import GeneratePDFSC from './GeneratePDFSC';

const PersonCalculator = () => {
  const [ageRange, setAgeRange] = useState('');
  const [essentialOilDrops, setEssentialOilDrops] = useState('');
  const [maxDilution, setMaxDilution] = useState('');

  // Tabela de dados com base na faixa etária
  const ageData = {
    "De 3 à 12 meses": { drops: "1 a 3 gotas", dilution: "até 1% de essência" },
    "De 1 a 5 anos": { drops: "1 a 5 gotas", dilution: "até 3% de essência" },
    "De 5 à 12 anos": { drops: "1 a 7 gotas", dilution: "até 3% de essência" },
    "De 12 à 18 anos": { drops: "1 a 11 gotas", dilution: "até 5% de essência" },
    "Mais de 18 anos": { drops: "1 a 44 gotas", dilution: "até 20% de essência" },
  };

  // Função para preencher os campos com base na faixa etária selecionada
  const handleAgeChange = (e) => {
    const age = e.target.value;
    setAgeRange(age);

    // Atualiza os campos com base na faixa etária
    if (ageData[age]) {
      setEssentialOilDrops(ageData[age].drops);
      setMaxDilution(ageData[age].dilution);
    } else {
      setEssentialOilDrops('');
      setMaxDilution('');
    }
  };

  // Dados para o PDF (Exemplo)
  const compositions = [
    { oil: 'Óleo de Lavanda', quantity: 10, price: 50, totalComposition: 100 },
    { oil: 'Óleo de Hortelã', quantity: 5, price: 30, totalComposition: 60 },
  ];

  const extras = [
    { name: 'Frasco', value: 5 },
    { name: 'Embalagem', value: 2 },
  ];

  const profitPercentage = 20;
  const totalCost = 160;
  const totalCompositions = 160;
  const totalExtras = 7;

  return (
    <div>
      <h3>Calculadora de Aromaterapia - Kaio Valério</h3>

      {/* Dropdown para selecionar faixa etária */}
      <label className="compositionLabel2" htmlFor="ageRange">Selecione a Faixa Etária:</label>
      <select className="compositionInput"
        id="ageRange"
        value={ageRange} 
        onChange={handleAgeChange}
      >
        <option value="" disabled>Selecione a Faixa Etária</option>
        {Object.keys(ageData).map((age) => (
          <option key={age} value={age}>{age}</option>
        ))}
      </select>

      {/* Exibição das Gotas de Óleo Essencial e Diluição Máxima */}
      {ageRange && (
        <div>
          <h4>Gotas de Óleo Essencial</h4>
          <p>{essentialOilDrops}</p>

          <h4>Diluição Máxima (% de essência)</h4>
          <p>{maxDilution}</p>
        </div>
      )}

      {/* Chamando o componente GeneratePDF e passando as props necessárias */}
      <GeneratePDFSC 
        ageRange={ageRange}
        essentialOilDrops={essentialOilDrops}
        maxDilution={maxDilution}
      />
    </div>
  );
};

export default PersonCalculator;
