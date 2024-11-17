import { jsPDF } from "jspdf";
import React from "react";

const GeneratePDF = ({ compositions, extras, profitPercentage, totalCost, totalCompositions, totalExtras }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Caminho relativo para a imagem dentro da pasta public
    const imageUrl = '/images/arom-logo.png'; // Caminho correto para a pasta images dentro de public

    // Adicionando a imagem no PDF (com posicionamento e tamanho definidos)
    doc.addImage(imageUrl, 'PNG', 15, 10, 50, 50); // x, y, largura, altura

    // Título do relatório
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório de Cálculos de Aromaterapia", 20, 80);

    // Detalhes das Composições
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Composições:", 20, 100);

    compositions.forEach((composition, index) => {
      const yPosition = 110 + index * 30;
      doc.text(`Composição ${index + 1}:`, 20, yPosition);
      doc.text(`Óleo: ${composition.oil || 'Não informado'}`, 20, yPosition + 10); // Verifica se "oil" está vazio
      doc.text(`Quantidade: ${composition.quantity ? `${composition.quantity}ml` : 'Não informado'}`, 20, yPosition + 20); // Verifica se "quantity" está vazio
      doc.text(`Preço Total: R$ ${composition.price ? composition.price.toFixed(2) : 'Não informado'}`, 20, yPosition + 30); // Verifica se "price" está vazio
      doc.text(`Total Composição: R$ ${composition.totalComposition ? composition.totalComposition.toFixed(2) : 'Não informado'}`, 20, yPosition + 40); // Verifica se "totalComposition" está vazio
    });

    // Detalhes dos Extras
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Extras:", 20, 150 + compositions.length * 30);
    extras.forEach((extra, index) => {
      const yPosition = 160 + index * 10 + compositions.length * 30;
      doc.text(`${extra.name || 'Não informado'}: R$ ${extra.value ? extra.value.toFixed(2) : 'Não informado'}`, 20, yPosition); // Verifica se "name" ou "value" estão vazios
    });

    // Totais e lucros
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Composições: R$ ${totalCompositions ? totalCompositions.toFixed(2) : 'Não informado'}`, 20, 170 + extras.length * 10 + compositions.length * 30); // Verifica se "totalCompositions" está vazio
    doc.text(`Total Extras: R$ ${totalExtras ? totalExtras.toFixed(2) : 'Não informado'}`, 20, 180 + extras.length * 10 + compositions.length * 30); // Verifica se "totalExtras" está vazio
    doc.text(`Total de Custo: R$ ${totalCost ? totalCost.toFixed(2) : 'Não informado'}`, 20, 190 + extras.length * 10 + compositions.length * 30); // Verifica se "totalCost" está vazio
    doc.text(`Porcentagem de Lucro: ${profitPercentage !== undefined ? profitPercentage + '%' : 'Não informado'}`, 20, 200 + extras.length * 10 + compositions.length * 30); // Verifica se "profitPercentage" está vazio
    doc.text(`Valor Final: R$ ${(totalCost && profitPercentage !== undefined) ? (totalCost * (1 + profitPercentage / 100)).toFixed(2) : 'Não informado'}`, 20, 210 + extras.length * 10 + compositions.length * 30); // Verifica se "totalCost" ou "profitPercentage" estão vazios

    // Salvando o PDF
    doc.save("relatorio-aromaterapia.pdf");
  };

  return (
    <div className="buttonContainer">
      <button className="generatePdfButton" onClick={generatePDF}>Gerar PDF</button>
    </div>
  );
};

export default GeneratePDF;
