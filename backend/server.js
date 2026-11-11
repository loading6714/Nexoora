
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const pool = require('./database');
const { enviarNotificacaoOrcamento } = require('./email');

const app = express();
const PORT = process.env.PORT || 3001;

// Configuração do servidor
app.use(express.json({ limit: '20kb' }));

app.use(cors({
  origin: 'http://localhost:5173'
}));

// Verificar o funcionamento da API
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API da Nexoora funcionando!',
    status: 'online'
  });
});

// Receber e salvar solicitações de orçamento
app.post('/api/orcamentos', async (req, res) => {
  try {
    const { nome, email, servico, mensagem } = req.body || {};

    // Validar os tipos recebidos
    if (
      typeof nome !== 'string' ||
      typeof email !== 'string' ||
      typeof servico !== 'string' ||
      typeof mensagem !== 'string'
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Preencha todos os campos corretamente.'
      });
    }

    // Limpar os valores recebidos
    const nomeLimpo = nome.trim();
    const emailLimpo = email.trim();
    const servicoLimpo = servico.trim();
    const mensagemLimpa = mensagem.trim();

    // Validar o conteúdo
    if (
      nomeLimpo.length < 2 ||
      nomeLimpo.length > 150 ||
      emailLimpo.length > 255 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailLimpo) ||
      !['web', 'sistemas', 'automacao'].includes(servicoLimpo) ||
      mensagemLimpa.length < 10 ||
      mensagemLimpa.length > 5000
    ) {
      return res.status(400).json({
        sucesso: false,
        mensagem: 'Verifique os dados informados.'
      });
    }

    // Salvar orçamento no PostgreSQL
    const sql = `
      INSERT INTO public.orcamentos
        (nome, email, servico, mensagem)
      VALUES
        ($1, $2, $3, $4)
      RETURNING id, status, criado_em
    `;

    const valores = [
      nomeLimpo,
      emailLimpo,
      servicoLimpo,
      mensagemLimpa
    ];

    const resultado = await pool.query(sql, valores);
    const registro = resultado.rows[0];

    const orcamento = {
      id: registro.id,
      nome: nomeLimpo,
      email: emailLimpo,
      servico: servicoLimpo,
      mensagem: mensagemLimpa,
      status: registro.status,
      criado_em: registro.criado_em
    };

    // Tentar enviar notificação por e-mail
    try {
      await enviarNotificacaoOrcamento(orcamento);

      console.log(
        `Notificação enviada para o orçamento #${orcamento.id}`
      );
    } catch (erroEmail) {
      console.error(
        `Falha ao notificar orçamento #${orcamento.id}:`,
        erroEmail.message
      );
    }

    // Responder mesmo se a notificação falhar,
    // pois o orçamento já está salvo no banco.
    return res.status(201).json({
      sucesso: true,
      mensagem: 'Orçamento cadastrado com sucesso!',
      orcamento: {
        id: orcamento.id,
        status: orcamento.status,
        criado_em: orcamento.criado_em
      }
    });

  } catch (erro) {
    console.error('Erro ao salvar orçamento:', erro);

    return res.status(500).json({
      sucesso: false,
      mensagem: 'Erro interno ao registrar o orçamento.'
    });
  }
});

// Inicializar o servidor
app.listen(PORT, () => {
  console.log(
    `Servidor da Nexoora rodando em http://localhost:${PORT}`
  );
});
