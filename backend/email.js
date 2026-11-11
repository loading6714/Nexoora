
require('dotenv').config();

const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Testar envio de e-mail
async function enviarEmailTeste() {
  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_DESTINO,
    subject: 'Nexoora - Teste de notificação',
    text: 'O sistema de notificações da Nexoora está funcionando!'
  });
}

// Notificar um novo orçamento cadastrado
async function enviarNotificacaoOrcamento(orcamento) {
  const servicos = {
    web: 'Desenvolvimento Web',
    sistemas: 'Sistemas Personalizados',
    automacao: 'Automação de Processos'
  };

  const nomeServico =
    servicos[orcamento.servico] || orcamento.servico;

  const conteudo = [
    'NOVA SOLICITAÇÃO DE ORÇAMENTO - NEXOORA',
    '',
    `Número: ${orcamento.id}`,
    `Cliente: ${orcamento.nome}`,
    `E-mail: ${orcamento.email}`,
    `Serviço: ${nomeServico}`,
    `Status: ${orcamento.status}`,
    '',
    'Mensagem do cliente:',
    orcamento.mensagem,
    '',
    'Consulte o PostgreSQL para acompanhar a solicitação.'
  ].join('\n');

  return transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_DESTINO,
    subject: `Nexoora - Novo orçamento #${orcamento.id}`,
    text: conteudo
  });
}

module.exports = {
  enviarEmailTeste,
  enviarNotificacaoOrcamento
};
