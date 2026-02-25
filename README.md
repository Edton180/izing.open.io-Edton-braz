# Plataforma de Atendimento Omnichannel com Painel SaaS

Sistema para gestão centralizada de atendimento multicanal, com recursos de automação, IA, CRM, integrações e operação multiempresa.

Usuários padrão de ambiente de desenvolvimento:

- Painel SaaS: `super@izing.io` / `123456`
- Usuário padrão: `admin@izing.io` / `123456`

**IMPORTANTE**: não garantimos que a utilização desta ferramenta não irá gerar bloqueio nas contas utilizadas. São bots que em sua maioria utilizam APIs secundárias para comunicação com fornecedores dos serviços. Use com responsabilidade.

<br/>

## Principais recursos do sistema

### 🏢 Estrutura SaaS
- Painel SaaS para gerenciar empresas, usuários, planos e configurações em um único painel.
- White Label com personalização de marca, cores e identidade visual.
- Gestão de planos comerciais.
- Integrações bancárias para recebimento de planos:
  - Efi
  - Mercado Pago
  - Asaas
  - InfinitePay
  - Stripe
  - PayPal
  - Pagar.me
  - PagBank
- Formas de pagamento: PIX, cartão e boleto.
- Menu de ajuda com acesso rápido a tutoriais e suporte.
- Multi idioma: Português, Inglês e Espanhol.
- Controle de horário de login para restringir acesso fora do expediente.
- Horário de atendimento configurável por empresa, canal ou fila (com feriados).
- Suporte a armazenamento S3 para mídias e arquivos em servidor externo compatível.

### 💬 Atendimento e gestão
- Tela de atendimento com filtros avançados.
- Lista de protocolos.
- Mensagens separadas por filas.
- Fechamento e exclusão em massa.
- Motivo de encerramento obrigatório.
- Anotações internas.
- Relatórios de tickets.
- Exportação de atendimento em PDF.
- Avaliação de atendimento.
- CRM visual.
- Tarefas.
- Follow-up automático.

### ⚡ Produtividade e mensagens
- Mensagens rápidas com anexos.
- Mensagens rápidas por fila.
- Mensagem de despedida por usuário.
- Mensagem de despedida por fila.
- Importação de mensagens do celular.
- Importação de contatos.

### 📅 Agendamento
- Repetição de envios:
  - Diário
  - Trimestral
  - Semestral
  - Anual
- Envio para até 5 contatos simultaneamente.

### 🤖 Bots e automação
- Construtor de bot estilo ChatFlow.
- Recursos de bot:
  - Delay
  - Áudios
  - Arquivos
  - Webhooks
  - Figurinhas
  - Localização
  - Botões (API Oficial)
  - Listas (API Oficial e API Plus)
- Bot por palavra-chave.
- Envio automático de mensagens.
- Transferência para ChatBot.
- Simulação de digitação e gravação.

### 🧠 Recepção Inteligente com IA
A Recepção Inteligente é um módulo avançado de atendimento automático com Inteligência Artificial.

Ela realiza o primeiro atendimento do cliente, entende o contexto da conversa e toma decisões automaticamente, reduzindo o trabalho manual da equipe.

O que pode fazer:
- ✅ Responder dúvidas automaticamente
- ✅ Classificar o atendimento
- ✅ Adicionar ou remover etiquetas
- ✅ Mover no Kanban
- ✅ Transferir para fila específica
- ✅ Transferir para usuário específico
- ✅ Enviar PIX automaticamente
- ✅ Enviar arquivos
- ✅ Finalizar atendimento
- ✅ Encaminhar para atendimento humano quando necessário
- ✅ Suporte a áudio via ElevenLabs

Compatível com múltiplas IAs:
- OpenAI (ChatGPT)
- Groq
- Gemini
- DeepSeek
- Grok

Benefícios:
- Atendimento 24 horas
- Redução de tempo de resposta
- Organização automática das filas
- Escalabilidade para alto volume
- Redução de custos operacionais
- Ideal para empresas que desejam escalar o atendimento sem aumentar equipe

### 🧠 Outras integrações com IA
- Transcrição automática de áudio.
- Integração de IA para melhorar e sugerir mensagens no atendimento.

### 🧾 Integrações ERP (provedores)
- IXC Soft: 2ª via de boletos e desbloqueio de confiança.
- TSMX SGP: 2ª via de boletos e desbloqueio de confiança.
- HubSoft: 2ª via de boletos e desbloqueio de confiança.
- Atlaz: 2ª via de boletos, desbloqueio de confiança, abertura de chamados e disparo WhatsApp.
- ReceitaNET: 2ª via de boletos.

### 📲 Canais suportados
- WhatsApp API Oficial (direto ou via HUB).
- API não oficial Plus (listas e botões).
- Webchat.
- Facebook.
- Instagram.
- Telegram.
- Wavoip (chamadas WhatsApp).
- Discador SIP (WebRTC).
- Transferência de chamadas SIP.
- Chat interno.

### 🔗 Integrações e API
- API própria.
- WebHook.
- TypeBot.
- N8N.
- PerfexCRM.
- WooCommerce.
- 2ª via de boleto Asaas.
- GLPI.

### 🆓 Versão grátis
- Exibição de anúncios na plataforma.
- Propaganda automática em:
  - Primeira mensagem
  - API
  - Agendamentos
  - Follow-ups
  - Campanhas

<br/>

## Instalando
Links úteis:
- [Como Instalar o IZING AAPANEL - Vídeo](https://www.youtube.com/watch?v=pw5KMtdVw0s)
- [Como Instalar o IZING - Vídeo](https://youtu.be/-Woqu4W5Zzs?si=jcZYX3yPL60XkAd)
- [Como Instalar o IZING - Vídeo opção 2](https://youtu.be/bZ-jXRtcGyc?si=B8oQxv0V0V36fgrF)
- [Como Instalar o IZING VPS - Texto - Ubuntu 20/22](docs/INSTALL_VPS_UBUNTU_20_22.md)

<br/>

## Atualizando
Existe o script `update-izing` para facilitar atualização (quando instalado na pasta esperada):

```bash
sh update-izing
```

**IMPORTANTE**: verifique sempre o `.env.example` e ajuste seu `.env` antes de atualizar, pois novas variáveis podem ser adicionadas.

<br/>

## Fique atento
A utilização desta ferramenta é feita por sua conta e risco. O código é aberto e todos podem contribuir.

Este projeto não é afiliado, associado, autorizado, endossado por, ou de qualquer forma oficialmente ligado ao WhatsApp, ou a qualquer uma das suas filiais ou afiliadas. O website oficial do WhatsApp pode ser encontrado em <https://whatsapp.com>. “WhatsApp”, bem como nomes, marcas, emblemas e imagens relacionadas, são marcas registradas dos seus respectivos proprietários.
