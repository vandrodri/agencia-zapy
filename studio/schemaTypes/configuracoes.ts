// Dentro de studio/schemas/configuracoes.ts

export default {
  name: 'configuracoes',
  title: 'Configurações Globais',
  type: 'document',
  fields: [
    {
      name: 'numeroWhatsapp',
      title: 'Número do WhatsApp',
      type: 'string',
      description: 'Número completo com código do país. Ex: 5511999998888',
    },
    {
      name: 'emailContato',
      title: 'Email de Contato',
      type: 'string',
      description: 'O endereço de email principal para contato.',
    },
  ],
}