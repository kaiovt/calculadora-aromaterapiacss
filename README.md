Calculadora Aromaterapia
Visão Geral
O projeto Calculadora Aromaterapia é uma aplicação web interativa desenvolvida com Next.js que oferece duas funcionalidades principais para cálculo de dosagens de óleos essenciais em aromaterapia:

Calculadora por Pessoa: Calcula a dosagem de óleo essencial com base na faixa etária.
Calculadora por Produto: Calcula o custo de produtos a partir de valores de óleo essencial.
Além disso, a aplicação permite gerar um relatório em PDF com as informações inseridas nas calculadoras.

Estrutura do Projeto
Caminho do Repositório
bash
Copiar código
C:\Projetos\calculadora-aromaterapia
Diretórios e Arquivos Principais
pages/: Contém os arquivos de página do Next.js.

pages/_app.js: Configuração global do aplicativo.
pages/index.js: Página principal com as calculadoras.
components/: Componentes principais da aplicação.

PersonCalculator.js: Calculadora de aromaterapia baseada em faixa etária.
ProductCalculator.js: Calculadora de aromaterapia baseada em valor por ml.
GeneratePDF.js: Componente responsável pela geração do PDF.
SocialMediaLinks.js: Links para redes sociais.
GeneratePDFSC.js: Funções auxiliares para gerar o PDF.
public/: Arquivos públicos, como imagens e ícones.

images/: Contém a logo do projeto e ícones.
arom-logo.png: Logo do projeto.
person-placeholder.png: Imagem placeholder para representar uma pessoa.
favicon.ico: Ícone do site.
styles/: Arquivos CSS para o projeto.

globals.css: Estilos globais aplicados a toda a aplicação.
HomePage.module.css: Estilos específicos para a página inicial.
SocialMediaLinks.module.css: Estilos específicos para os links sociais.
utils/: Funções auxiliares.

pdfUtils.js: Funções auxiliares para a criação do PDF.
package.json: Gerencia dependências e scripts do projeto.

README.md: Documentação do projeto.

.gitignore: Arquivos a serem ignorados pelo Git.

Funcionalidades Implementadas
1. Página Principal (pages/index.js)
Exibe a Calculadora por Pessoa como padrão.
Permite alternar entre Calculadora por Pessoa e Calculadora por Produto.
A interface é dinâmica e alterna as calculadoras conforme a seleção do usuário.
Ao selecionar a faixa etária na calculadora por pessoa, os campos de Gotas de Óleo Essencial e Diluição Máxima (%) são preenchidos automaticamente.
2. Componente PersonCalculator.js
Exibe a Calculadora por Pessoa.
Permite ao usuário selecionar uma faixa etária, preenchendo automaticamente as informações de Gotas de Óleo Essencial e Diluição Máxima (%) com base na escolha.
3. Componente ProductCalculator.js
Exibe a Calculadora por Produto.
Permite ao usuário inserir dados como preço do frasco, quantidade de óleo vegetal, número de gotas no frasco, e outras informações relacionadas ao produto (a lógica de cálculo ainda está em desenvolvimento).
4. Componente GeneratePDF.js
Responsável pela geração de um relatório em PDF com os dados inseridos nas calculadoras.
O PDF inclui as informações sobre as dosagens, valores e totais calculados.
5. Funções Auxiliares (utils/pdfUtils.js)
Contém funções auxiliares para gerar e formatar o PDF com as informações inseridas nas calculadoras.
Como Rodar o Projeto
Clone o repositório:

bash
Copiar código
git clone <URL_DO_REPOSITORIO>
Navegue até o diretório do projeto:

bash
Copiar código
cd calculadora-aromaterapia
Instale as dependências:

bash
Copiar código
npm install
Rode a aplicação em modo de desenvolvimento:

bash
Copiar código
npm run dev
Isso irá rodar a aplicação localmente no endereço http://localhost:3000.

Como Gerar o Build para Produção
Para gerar o build, execute:

bash
Copiar código
npm run build
Para exportar o projeto como uma aplicação estática:

bash
Copiar código
npx next export
O conteúdo exportado será gerado na pasta out/, que pode ser enviado para o servidor ou integrado ao WordPress.

Dependências
Next.js: Framework React para aplicações full-stack.
React: Biblioteca para construção de interfaces de usuário.
jspdf: Biblioteca para gerar arquivos PDF.
jspdf-autotable: Complemento do jspdf para criar tabelas no PDF.
eslint: Ferramenta de linting para garantir a qualidade do código.
Estilos e Layout
1. globals.css
Estilos globais que incluem um reset universal, fontes padrão e estilos básicos para todos os elementos.
Aplica box-sizing: border-box para garantir um layout consistente.
2. HomePage.module.css
Responsável pela estrutura e layout da página inicial.
Utiliza flexbox para garantir que os elementos sejam centralizados de forma responsiva.
3. SocialMediaLinks.module.css
Estilos específicos para a seção de links de redes sociais.
Usa ícones das redes sociais com classes como fa-facebook, fa-twitter, etc.
Resumo de Propriedades Usadas
border-radius: Borda arredondada para um visual mais suave.
box-shadow: Sombra suave para dar profundidade.
transition: Animações suaves para interatividade.
hover e active: Efeitos de interação para melhorar a experiência do usuário.
flexbox: Layout flexível para garantir responsividade.


Observação: Pasta /out é a importação para html statico(subir em wordpress)

Estrutura do Projeto
calculadora-aromaterapia/
│
├── pages/
│   ├── _app.js               # Configuração global do aplicativo (Next.js)
│   ├── index.js              # Página principal com as calculadoras
│
├── components/
│   ├── PersonCalculator.js   # Calculadora para aromaterapia por pessoa (faixa etária)
│   ├── ProductCalculator.js  # Calculadora para aromaterapia por produto (valor por ml)
│   ├── GeneratePDF.js        # Componente para gerar o PDF com os resultados
│   ├── SocialMediaLinks.js   # Links de redes sociais
│   ├── GeneratePDFSC.js      # Funções auxiliares para geração do PDF
│
├── public/
│   ├── person-placeholder.jpg # Imagem placeholder para representar a pessoa
│   ├── favicon.ico            # Ícone do site
│   └── images/               # Pasta contendo imagens usadas no site
│         ├── arom-logo.png    # Logo do projeto
│         ├── person-placeholder.png # Imagem placeholder para pessoas
│         └── favicon.ico      # Ícone do site
│
├── styles/
│   ├── globals.css           # Estilos globais para o projeto
│   ├── HomePage.module.css   # Estilos específicos para a página inicial
│   └── SocialMediaLinks.module.css # Estilos para a seção de redes sociais
│
├── utils/
│   └── pdfUtils.js           # Funções auxiliares para gerar o PDF
│
├── package.json              # Gerencia dependências e scripts do projeto
├── README.md                 # Informações sobre o projeto
├── package-lock.json         # Dependências bloqueadas para o projeto
└── .gitignore                # Arquivos a serem ignorados pelo Git


