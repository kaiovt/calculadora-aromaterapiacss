import { jsPDF } from "jspdf";
import React from "react";

const GeneratePDFSC = ({ ageRange, essentialOilDrops, maxDilution }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Caminho relativo para a imagem dentro da pasta public
    const imageUrl = '/images/arom-logo.png'; // Caminho correto para a pasta images dentro de public

    // Tamanho da imagem
    const imgWidth = 50;
    const imgHeight = 50;

    // Posição da imagem no canto superior direito
    const xPosition = doc.internal.pageSize.width - imgWidth - 15;
    const yPosition = 10;

    // Adicionando o círculo ao redor da imagem
    doc.setFillColor(255, 255, 255); // Cor de fundo (branco)
    doc.circle(xPosition + imgWidth / 2, yPosition + imgHeight / 2, imgWidth / 2, 'F'); // Desenha o círculo

    // Adicionando a imagem dentro do círculo
    doc.addImage(imageUrl, 'PNG', xPosition, yPosition, imgWidth, imgHeight);

    // Centralizando o título
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    const title = "Relatório de Cálculos de Aromaterapia";
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 80);

    // Detalhes da Faixa Etária
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    const labelWidth = doc.getTextWidth("Faixa Etária:");
    const labelX = (doc.internal.pageSize.width - labelWidth) / 2;
    doc.text("Faixa Etária:", labelX, 100);

    const ageRangeWidth = doc.getTextWidth(ageRange);
    const ageRangeX = (doc.internal.pageSize.width - ageRangeWidth) / 2;
    doc.text(ageRange, ageRangeX, 110);

    // Gotas de Óleo Essencial
    const dropsLabel = "Gotas de Óleo Essencial:";
    const dropsLabelWidth = doc.getTextWidth(dropsLabel);
    const dropsLabelX = (doc.internal.pageSize.width - dropsLabelWidth) / 2;
    doc.text(dropsLabel, dropsLabelX, 120);

    const dropsWidth = doc.getTextWidth(essentialOilDrops);
    const dropsX = (doc.internal.pageSize.width - dropsWidth) / 2;
    doc.text(essentialOilDrops, dropsX, 130);

    // Diluição Máxima
    const dilutionLabel = "Diluição Máxima (% de essência):";
    const dilutionLabelWidth = doc.getTextWidth(dilutionLabel);
    const dilutionLabelX = (doc.internal.pageSize.width - dilutionLabelWidth) / 2;
    doc.text(dilutionLabel, dilutionLabelX, 140);

    const dilutionWidth = doc.getTextWidth(maxDilution);
    const dilutionX = (doc.internal.pageSize.width - dilutionWidth) / 2;
    doc.text(maxDilution, dilutionX, 150);

    // Rodapé
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const footer = '© 2024 Aromaterapia Inc.';
    const footerWidth = doc.getTextWidth(footer);
    const footerX = (doc.internal.pageSize.width - footerWidth) / 2;
    doc.text(footer, footerX, doc.internal.pageSize.height - 10);

    // Salvando o PDF com um nome específico
    doc.save("calculadora-aromaterapia.pdf");
  };

  return (
    <div className="buttonContainer">
      <button className="generatePdfButton" onClick={generatePDF}>Gerar PDF</button>
    </div>
  );
};

export default GeneratePDFSC;
