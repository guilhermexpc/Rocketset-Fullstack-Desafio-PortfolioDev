const fs = require("fs");
const path = require("path");

// Obtém o nome do arquivo passado como argumento
const nomeArquivo = process.argv[2];

if (!nomeArquivo) {
  console.error("❌ Informe o nome do arquivo CSS. Ex: node criar-css.js projects.css");
  process.exit(1);
}

// Garante extensão .css
const nomeComExtensao = nomeArquivo.endsWith(".css") ? nomeArquivo : `${nomeArquivo}.css`;

// Caminhos
const pastaStyles = path.join(__dirname, "styles");
const caminhoNovoArquivo = path.join(pastaStyles, nomeComExtensao);
const caminhoIndexCSS = path.join(pastaStyles, "index.css");
const linhaImport = `@import url(${nomeComExtensao});`;

// 1. Garante que a pasta styles/ existe
if (!fs.existsSync(pastaStyles)) {
  fs.mkdirSync(pastaStyles);
  console.log("📁 Pasta styles/ criada.");
}

// 2. Cria o novo arquivo .css se não existir
if (!fs.existsSync(caminhoNovoArquivo)) {
  fs.writeFileSync(caminhoNovoArquivo, "/* Novo CSS */\n");
  console.log(`✔ Arquivo ${nomeComExtensao} criado em /styles.`);
} else {
  console.log(`⚠ O arquivo ${nomeComExtensao} já existe.`);
}

// 3. Lê e modifica o index.css
let conteudoIndex = fs.existsSync(caminhoIndexCSS) ? fs.readFileSync(caminhoIndexCSS, "utf8") : "";

if (!conteudoIndex.includes(linhaImport)) {
  // Adiciona a linha ao final (com quebra de linha, se necessário)
  const novaLinhaFinal = conteudoIndex.endsWith("\n") ? linhaImport : `\n${linhaImport}`;
  fs.writeFileSync(caminhoIndexCSS, conteudoIndex + novaLinhaFinal + "\n");
  console.log(`✔ Importação adicionada ao final do index.css`);
} else {
  console.log(`⚠ index.css já contém o import.`);
}
