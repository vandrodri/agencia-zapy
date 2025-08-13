// Dentro de studio/schemaTypes/topicoPillar.ts
export default {
  name: 'topicoPillar',
  title: 'Tópico da Pillar Page',
  type: 'object', // Importante: é um 'object', não um 'document'
  fields: [
    { name: 'titulo', title: 'Título do Tópico', type: 'string' },
    { name: 'descricao', title: 'Descrição', type: 'text' },
    { name: 'link', title: 'Link (ex: lp-chat-ia.html)', type: 'string' },
  ],
}