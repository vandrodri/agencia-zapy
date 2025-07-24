import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'servicos',
  title: 'Serviços',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do Serviço',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição Curta',
      type: 'text',
      description: 'Uma breve descrição do serviço para a página principal.',
      rows: 3,
    }),
    defineField({
        name: 'mainImage',
        title: 'Imagem Principal',
        type: 'image',
        options: {
          hotspot: true,
        },
        description: 'Imagem que representa o serviço.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    },
  },
})