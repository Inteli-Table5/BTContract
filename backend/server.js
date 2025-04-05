// Arquivo: server.js
const express = require('express');
const bodyParser = require('body-parser');
const { generateLightningContract } = require('./lightningContractGenerator');

// Inicializar o aplicativo Express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para processar JSON no corpo das requisições
app.use(bodyParser.json());

/**
 * Endpoint para gerar um contrato Lightning Network baseado nos parâmetros do comprador e vendedor
 * 
 * Espera receber um objeto JSON com:
 * - buyerPublicKey: Chave pública do comprador
 * - buyerNodeId: ID do nó Lightning do comprador
 * - sellerPublicKey: Chave pública do vendedor
 * - sellerNodeId: ID do nó Lightning do vendedor
 * - amount: Valor da transação em satoshis
 */
app.post('/api/generate-lightning-contract', (req, res) => {
  try {
    // Extrair parâmetros da requisição
    const { 
      buyerPublicKey, 
      buyerNodeId, 
      sellerPublicKey, 
      sellerNodeId, 
      amount 
    } = req.body;
    
    // Validar os parâmetros recebidos
    if (!buyerPublicKey || !buyerNodeId || !sellerPublicKey || !sellerNodeId || !amount) {
      return res.status(400).json({ 
        error: 'Parâmetros incompletos. Todos os campos são obrigatórios.' 
      });
    }
    
    // Validar que o amount é um número positivo
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        error: 'O valor da transação deve ser um número positivo.' 
      });
    }
    
    // Gerar o contrato Lightning
    const contract = generateLightningContract({
      buyerPublicKey,
      buyerNodeId,
      sellerPublicKey,
      sellerNodeId,
      amount
    });
    
    // Retornar o contrato gerado
    return res.status(200).json({
      success: true,
      contract: contract
    });
    
  } catch (error) {
    console.error('Erro ao gerar contrato Lightning:', error);
    return res.status(500).json({ 
      error: 'Erro interno ao gerar o contrato Lightning.', 
      details: error.message 
    });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});