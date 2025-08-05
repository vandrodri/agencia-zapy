// All'interno di studio/schemas/servico.ts

export default {
  name: 'servico',
  title: 'Serviço',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome do Serviço',
      type: 'string',
      description: 'O nome principal do serviço (ex: Consultoria SEO).',
    },
    {
      name: 'descricaoCurta',
      title: 'Descrição Curta',
      type: 'text',
      description: 'Uma breve descrição que aparece na lista de serviços.',
    },
    {
      name: 'icone',
      title: 'Ícone do Serviço',
      type: 'image',
      description: 'O ícone que representa o serviço.',
    },
  ],
  preview: {
    select: {
      title: 'nome',
      media: 'icone',
    },
  },
}