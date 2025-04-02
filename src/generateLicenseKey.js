const crypto = require('crypto');

// Configurações
const LICENSE_SECRET = 'my-secret-key-123'; // Deve ser a mesma chave secreta usada no main.js
const identifier = 'ativ'; // Identificador único
const expirationDate = '2025-12-31'; // Data de expiração no formato YYYY-MM-DD

// Função para gerar a chave de licença
function generateLicenseKey(identifier, expirationDate) {
  const data = `${identifier}:${expirationDate}`;
  const hash = crypto.createHmac('sha256', LICENSE_SECRET).update(data).digest('hex');
  return `${identifier}:${expirationDate}:${hash}`;
}

// Gerar a chave
const licenseKey = generateLicenseKey(identifier, expirationDate);
console.log('Chave de Licença Gerada:', licenseKey);