// Dentro de studio/schemaTypes/diferencial.ts

export default {
  name: 'diferencial',
  title: 'Diferencial',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título do Diferencial',
      type: 'string',
      description: 'Ex: Especialistas em GBP',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descricao',
      title: 'Descrição',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'codigoIcone',
      title: 'Código SVG do Ícone',
      type: 'text',
      description: 'Cole o código SVG completo do ícone aqui.',
    },
  ],
  preview: {
    select: {
      title: 'titulo',
    },
  },
}