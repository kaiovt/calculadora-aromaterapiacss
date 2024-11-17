import { useState } from 'react';
import GeneratePDF from './GeneratePDF'; // Importe no começo do arquivo
import '../styles/HomePage.module.css';

const ProductCalculator = () => {
    const [compositions, setCompositions] = useState([
        {
            oil: '',
            quantity: "", // Valores predefinidos: 5ml, 10ml, 15ml
            price: "",
            dilution: "",
            totalDrops: "", // 5ml * 20 gotas/ml
            usedDrops: 0,
            valuePerDrop: 0,
            totalComposition: 0,
        },
    ]);

    const [extras, setExtras] = useState([
        { name: 'Vidro', value: 0 },
        { name: 'Rótulo', value: 0 },
    ]);

    const [profitPercentage, setProfitPercentage] = useState(0);

    // Funções de cálculo
    const calculateTotalDrops = (quantity) => quantity * 20; // 1 ml = 20 gotas
    const calculateUsedDrops = (quantity, dilution) => quantity * dilution * 0.25; // 0.25% para calcular gotas usadas
    const calculateValuePerDrop = (price, totalDrops) => (totalDrops ? price / totalDrops : 0); // Decimal fixo
    const calculateTotalComposition = (usedDrops, valuePerDrop) => (usedDrops * valuePerDrop); // Decimal fixo
    const calculateTotalCompositions = () =>
        compositions.reduce((total, comp) => total + parseFloat(comp.totalComposition), 0); // Decimal fixo
    const calculateTotalExtras = () =>
        extras.reduce((total, extra) => total + extra.value, 0); // Decimal fixo
    const calculateTotalCost = () =>
        (parseFloat(calculateTotalCompositions()) + parseFloat(calculateTotalExtras())); // Decimal fixo
    const calculateFinalValue = (totalCost, profitPercentage) => {
        return totalCost + (totalCost * profitPercentage) / 100;
    };

    // Adicionar/remover composições e extras
    const handleAddComposition = () => {
        setCompositions([
            ...compositions,
            {
                oil: '',
                quantity: 5,
                price: 0,
                dilution: 0,
                totalDrops: 100,
                usedDrops: 0,
                valuePerDrop: 0,
                totalComposition: 0,
            },
        ]);
    };

    const handleRemoveComposition = (index) => {
        setCompositions(compositions.filter((_, i) => i !== index));
    };

    const handleAddExtra = () => {
        setExtras([...extras, { name: '', value: 0 }]);
    };

    const handleRemoveExtra = (index) => {
        setExtras(extras.filter((_, i) => i !== index));
    };

    // Atualizar os campos de entrada
    const handleFieldChange = (index, field, value) => {
        const updatedCompositions = [...compositions];
        updatedCompositions[index][field] = value;

        // Calcular os campos automaticamente
        if (['quantity', 'dilution', 'price'].includes(field)) {
            const { quantity, dilution, price } = updatedCompositions[index];
            const totalDrops = calculateTotalDrops(quantity);
            const usedDrops = calculateUsedDrops(quantity, dilution);
            const valuePerDrop = calculateValuePerDrop(price, totalDrops);
            const totalComposition = calculateTotalComposition(usedDrops, valuePerDrop);

            updatedCompositions[index].totalDrops = totalDrops;
            updatedCompositions[index].usedDrops = usedDrops;
            updatedCompositions[index].valuePerDrop = parseFloat(valuePerDrop); // Salva como número
            updatedCompositions[index].totalComposition = parseFloat(totalComposition); // Salva como número
        }

        setCompositions(updatedCompositions);
    };

    return (
        <div className="calculatorContainer">
            <h2>BLEND</h2>
            <input
                className="blendInput"
                type="text"
                placeholder="Nome ou Descrição do Blend"
                onChange={(e) => handleFieldChange(0, 'blend', e.target.value)}
            />

            <h3>COMPOSIÇÕES</h3>
            {compositions.map((composition, index) => (
                <div key={index} className="compositionItem">
                    <h4>Composição {index + 1}</h4>

                    <label className="compositionLabel">Óleo:</label>
                    <input
                        className="compositionInput"
                        type="text"
                        value={composition.oil}
                        placeholder="Nome do Óleo"
                        onChange={(e) => handleFieldChange(index, 'oil', e.target.value)}
                    />

                    <label className="compositionLabel">Quantidade de Óleo Vegetal (em ml):</label>
                    <input
                        className="compositionInput"
                        type="number"
                        value={composition.quantity || ''}
                        onChange={(e) => handleFieldChange(index, 'quantity', Number(e.target.value))}
                        min="1"
                    />

                    <label className="compositionLabel">Preço Total do Frasco:</label>
                    <input
                        className="compositionInput"
                        type="number"
                        value={composition.price}
                        onChange={(e) => handleFieldChange(index, 'price', Number(e.target.value))}
                        min="0"
                    />

                    <label className="compositionLabel">Porcentagem de Diluição de Óleo Essencial (%):</label>
                    <input
                        className="compositionInput"
                        type="number"
                        value={composition.dilution}
                        onChange={(e) => handleFieldChange(index, 'dilution', Number(e.target.value))}
                        min="0.1"
                        max="100"
                    />

<label className="compositionLabel">Número Total de Gotas no Frasco:</label>
    <span className="totais">{composition.totalDrops || 0}</span>

    <label className="compositionLabel">Gotas Utilizadas:</label>
    <span className="totais">{composition.usedDrops || 0}</span>

    <label className="compositionLabel">Valor por Gota:</label>
    <span className="totais">{composition.valuePerDrop ? composition.valuePerDrop.toFixed(2) : '0.00'}</span>

    <label className="compositionLabel">Total Composição {index + 1}:</label>
    <span className="totais">{composition.totalComposition.toFixed(2)}</span>
    
    <button className="buttonRemove" type="button" onClick={() => handleRemoveComposition(index)}>REMOVER</button>
    <button className="buttonAdd" type="button" onClick={handleAddComposition}>ADICIONAR</button>
  </div>
))}


            <div className="compositionItem">
            <h3>EXTRAS</h3>
            {extras.map((extra, index) => (
                <div key={index} className="compositionInput">
                    <label className="compositionLabel">{extra.name}</label>
                    <input
                        className="extraInput"
                        type="text"
                        value={extra.name}
                        onChange={(e) => {
                            const updatedExtras = [...extras];
                            updatedExtras[index].name = e.target.value;
                            setExtras(updatedExtras);
                        }}
                    />

                    <label className="compositionLabel">Valor:</label>
                    <input
                        className="extraInput"
                        type="number"
                        value={extra.value}
                        onChange={(e) => {
                            const updatedExtras = [...extras];
                            updatedExtras[index].value = Number(e.target.value);
                            setExtras(updatedExtras);
                        }}
                    />

                    <button className="buttonRemove" type="button" onClick={() => handleRemoveExtra(index)}>REMOVER</button>
                    <button className="buttonAdd" type="button" onClick={handleAddExtra}>ADICIONAR</button>
           
                </div>
            ))}

            </div>
            <div className="compositionItem">
                <h3>TOTAL</h3>

                <label className="compositionLabel">Total Composições:</label>
                <span className="totais">{calculateTotalCompositions().toFixed(2)}</span>

                <label className="compositionLabel">Total Extras:</label>
                <span className="totais">{calculateTotalExtras().toFixed(2)}</span>

                <label className="compositionLabel">Total Final de Custo do Blend:</label>
                <span className="totais">{calculateTotalCost().toFixed(2)}</span>

                <label className="compositionLabel">Porcentagem de Lucro (%):</label>
                <input
                    className="compositionInput"
                    type="number"
                    value={profitPercentage}
                    onChange={(e) => setProfitPercentage(Number(e.target.value))}
                    min="0.1"
                    max="100"
                />

                <label className="compositionLabel">Valor Final do Blend:</label>
                <span className="totais">{calculateFinalValue(calculateTotalCost(), profitPercentage).toFixed(2)}</span>
            </div>

            <GeneratePDF 
                compositions={compositions}
                extras={extras}
                profitPercentage={profitPercentage}
                totalCost={calculateTotalCost()}
                totalCompositions={calculateTotalCompositions()}
                totalExtras={calculateTotalExtras()}
            />
        </div>
    );
};

export default ProductCalculator;
