import React from "react";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Certifique-se de importar a dependência de autoTable

const GeneratePDF = ({ compositions, extras, profitPercentage, totalCost, totalCompositions, totalExtras }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Definindo as cores da paleta
    const headerColor = [255, 255, 255]; // Branco para os títulos
    const backgroundColor = [230, 184, 246]; // Cor de fundo suave
    const primaryTextColor = [88, 82, 109]; // #58526d
    const accentColor = [202, 146, 228]; // #ca92e4
    const tableHeaderColor = [163, 108, 200]; // Cor para o cabeçalho das tabelas (ex: #a36cc8)
    const tableRowColor = [246, 241, 250]; // Cor suave para as linhas das tabelas (ex: #f6f1fa)

    // Definindo o fundo com uma cor suave
    doc.setFillColor(...backgroundColor); // Cor de fundo suave
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, "F"); // Preenchendo o fundo do PDF

    // Caminho relativo para a imagem dentro da pasta public
    const imageUrl = '/images/arom-logo.png'; // Caminho correto para a pasta images dentro de public

    // Centralizando a imagem no PDF
    const imageWidth = 50; // Largura da imagem
    const imageHeight = 50; // Altura da imagem
    const x = (doc.internal.pageSize.width - imageWidth) / 2; // Posição X centralizada
    const y = 10; // Posição Y para a imagem (um pouco afastado do topo)

    // Adicionando a imagem no PDF
    doc.addImage(imageUrl, 'PNG', x, y, imageWidth, imageHeight); // x, y, largura, altura

    // Título do relatório
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...headerColor);  // Títulos em branco
    doc.text("RELATÓRIO DE CÁLCULOS DE AROMATERAPIA", 20, 80);

    // Função para verificar se é necessário adicionar nova página
    const addPageIfNeeded = (yPosition) => {
      if (yPosition > doc.internal.pageSize.height - 30) {
        doc.addPage();
        return 20; // Retorna uma nova posição Y inicial após adicionar a página
      }
      return yPosition;
    };

    // Função para centralizar o texto na página
    const centerText = (text, fontSize) => {
      const textWidth = doc.getTextWidth(text); // Calcula a largura do texto
      const pageWidth = doc.internal.pageSize.width; // Largura da página
      const x = (pageWidth - textWidth) / 2; // Calcula a posição central
      return x;
    };

    // Detalhes das Composições
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...headerColor);  // Títulos em branco
    const compositionsTitleX = centerText("COMPOSIÇÕES:", 16); // Centralizando o título de Composições
    doc.text("COMPOSIÇÕES:", compositionsTitleX, 100);

    let currentY = 110; // Posição Y inicial para Composições

    // Criando a tabela de composições
    doc.autoTable({
      startY: currentY,
      head: [['Composição', 'Óleo', 'Quantidade', 'Preço Total', 'Total Composição']], // Cabeçalho da tabela
      body: compositions.map((composition, index) => [
        `Composição ${index + 1}`,
        composition.oil || 'Não informado',
        composition.quantity ? `${composition.quantity}ml` : 'Não informado',
        composition.price ? `R$ ${composition.price.toFixed(2)}` : 'Não informado',
        composition.totalComposition ? `R$ ${composition.totalComposition.toFixed(2)}` : 'Não informado',
      ]),
      theme: 'grid',
      headStyles: { fillColor: tableHeaderColor },
      styles: {
        fontSize: 12,
        cellPadding: 5,
        halign: 'center',
        fillColor: tableRowColor,
      },
    });

    currentY = doc.lastAutoTable.finalY + 10; // Ajustando a posição Y após a tabela de composições

    // Detalhes dos Extras
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...headerColor);  // Títulos em branco
    const extrasTitleX = centerText("EXTRAS:", 16); // Centralizando o título de Extras
    doc.text("EXTRAS:", extrasTitleX, currentY);

    currentY += 20;

    // Criando a tabela de extras
    doc.autoTable({
      startY: currentY,
      head: [['Nome', 'Valor']], // Cabeçalho da tabela de extras
      body: extras.map(extra => [
        extra.name || 'Não informado',
        extra.value ? `R$ ${extra.value.toFixed(2)}` : 'Não informado',
      ]),
      theme: 'grid',
      headStyles: { fillColor: tableHeaderColor },
      styles: {
        fontSize: 12,
        cellPadding: 5,
        halign: 'center',
        fillColor: tableRowColor,
      },
    });

    currentY = doc.lastAutoTable.finalY + 10; // Ajustando a posição Y após a tabela de extras

    // Tabela de Totais
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...headerColor);  // Títulos em branco
    const totalsTitleX = centerText("TOTAIS:", 16); // Centralizando o título de Totais
   

    currentY += 20;

    // Criando a tabela de totais
    doc.autoTable({
      startY: currentY,
      head: [['Descrição', 'Valor']], // Cabeçalho da tabela de totais
      body: [
        ['TOTAL COMPOSIÇÕES', `R$ ${totalCompositions ? totalCompositions.toFixed(2) : 'Não informado'}`],
        ['TOTAL EXTRAS', `R$ ${totalExtras ? totalExtras.toFixed(2) : 'Não informado'}`],
        ['TOTAL DE CUSTO', `R$ ${totalCost ? totalCost.toFixed(2) : 'Não informado'}`],
        ['PORCENTAGEM DE LUCRO', profitPercentage !== undefined ? `${profitPercentage}%` : 'Não informado'],
        ['VALOR FINAL', (totalCost && profitPercentage !== undefined) ? `R$ ${(totalCost * (1 + profitPercentage / 100)).toFixed(2)}` : 'Não informado'],
      ],
      theme: 'grid',
      headStyles: { fillColor: tableHeaderColor },
      styles: {
        fontSize: 12,
        cellPadding: 5,
        halign: 'center',
        fillColor: tableRowColor,
      },
    });

    // Salvando o PDF
    doc.save("relatorio-aromaterapia.pdf");

    // Rolando para o topo após gerar o PDF
    window.scrollTo(0, 0);  // Rola para o topo da página
  };

  return (
    <div className="buttonContainer">
      <button className="generatePdfButton" onClick={generatePDF}>Gerar PDF</button>
    </div>
  );
};

export default GeneratePDF;
