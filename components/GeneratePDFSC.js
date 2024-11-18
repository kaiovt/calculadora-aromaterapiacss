import { jsPDF } from "jspdf";
import React from "react";

const GeneratePDFSC = ({ ageRange, essentialOilDrops, maxDilution }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Definindo o fundo com uma cor suave
    doc.setFillColor(230, 184, 246); // Cor de fundo suave
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F");

    // Adicionando uma imagem corretamente centralizada
    const imageUrl = '/images/arom-logo.png';
    const imgWidth = 50;
    const imgHeight = 50;
    const xPosition = (doc.internal.pageSize.width - imgWidth) / 2;
    const yPosition = 40;
    doc.addImage(imageUrl, 'PNG', xPosition, yPosition, imgWidth, imgHeight);

    // Adicionando o título
    const title = "RELATÓRIO DE CÁLCULOS DE AROMATERAPIA";
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);  // Texto branco
    const titleWidth = doc.getTextWidth(title);
    const titleX = (doc.internal.pageSize.width - titleWidth) / 2;
    doc.text(title, titleX, 100);

    // Criando a tabela com as informações
    const tableData = [
      ["FAIXA ETÁRIA", ageRange],
      ["GOTAS DE ÓLEO ESSENCIAL", essentialOilDrops],
      ["DILUIÇÃO MÁXIMA (% DE ESSÊNCIA)", maxDilution]
    ];

    // Definindo a posição para a tabela
    const rowHeight = 10;
    const colWidths = [100, 100]; // Largura das colunas
    const tableWidth = colWidths[0] + colWidths[1]; // Largura total da tabela
    const startX = (doc.internal.pageSize.width - tableWidth) / 2; // Centralizando a tabela
    const startY = 130;

    // Definindo as cores para a tabela
    const headerColor = [163, 108, 200]; // Cor do cabeçalho (paleta)
    const rowColor = [246, 241, 250];    // Cor das linhas alternadas

    // Adicionando cabeçalho da tabela
    doc.setFillColor(...headerColor);
    doc.rect(startX, startY, tableWidth, rowHeight, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.text("DESCRIÇÃO", startX + 2, startY + 7);
    doc.text("DADOS", startX + colWidths[0] + 2, startY + 7);

    // Adicionando dados da tabela
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    let currentY = startY + rowHeight;
    tableData.forEach((row, index) => {
      doc.setFillColor(...(index % 2 === 0 ? rowColor : headerColor));  // Linhas alternadas
      doc.rect(startX, currentY, tableWidth, rowHeight, "F");
      doc.setTextColor(0, 0, 0);
      doc.text(row[0], startX + 2, currentY + 7);
      doc.text(row[1], startX + colWidths[0] + 2, currentY + 7);
      currentY += rowHeight;
    });

    // Rodapé com uma cor suave
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const footer = '© 2024 Aromaterapia Inc.';
    doc.text(footer, (doc.internal.pageSize.width - doc.getTextWidth(footer)) / 2, doc.internal.pageSize.height - 10);

    // Salvando o PDF
    doc.save("calculadora-aromaterapia.pdf");

    // Rolando para o topo após gerar o PDF
    window.scrollTo(0, 0);  // Rola para o topo da página
  };

  return (
    <div className="buttonContainer">
      <button className="generatePdfButton" onClick={generatePDF}>Gerar PDF</button>
    </div>
  );
};

export default GeneratePDFSC;
