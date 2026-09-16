#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'teste.html'), 'utf8');
const css = fs.readFileSync(path.join(dir, 'style.css'), 'utf8');
const js = fs.readFileSync(path.join(dir, 'script.js'), 'utf8');

const jsEscaped = js.replace(/<\/script/gi, '<\\/script');

const linkCss = '    <link rel="stylesheet" href="style.css">';
const styleInline = '    <style>\n' + css + '\n    </style>';

const scriptSrc = '    <script src="script.js"></script>';
const scriptInline = '    <script>\n' + jsEscaped + '\n    </script>';

const saida = html
    .replace(linkCss, styleInline)
    .replace(scriptSrc, scriptInline);

const caminhoSaida = path.join(dir, 'teste_unico.html');
fs.writeFileSync(caminhoSaida, saida, 'utf8');

const okCss = saida.includes(styleInline) && !saida.includes(linkCss);
const okJs = saida.includes(scriptInline) && !saida.includes(scriptSrc);

console.log('Arquivo gerado: teste_unico.html');
console.log('  Tamanho:', (fs.statSync(caminhoSaida).size / 1024).toFixed(1), 'KB');
console.log('  CSS inline:', okCss ? 'OK' : 'FALHOU');
console.log('  JS inline:', okJs ? 'OK' : 'FALHOU');
