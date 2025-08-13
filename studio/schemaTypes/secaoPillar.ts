// Dentro de studio/schemaTypes/secaoPillar.ts
export default {
  name: 'secaoPillar',
  title: 'Seção da Pillar Page',
  type: 'object',
  fields: [
    { name: 'titulo', title: 'Título da Seção', type: 'string' },
    {
      name: 'topicos',
      title: 'Tópicos',
      type: 'array',
      of: [{ type: 'topicoPillar' }], // Um array de tópicos que definimos acima
    },
  ],
}