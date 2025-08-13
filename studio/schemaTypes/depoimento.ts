// Dentro de studio/schemaTypes/depoimento.ts

export default {
  name: 'depoimento',
  title: 'Depoimento',
  type: 'document',
  fields: [
    {
      name: 'texto',
      title: 'Texto do Depoimento',
      type: 'text',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'nomeCliente',
      title: 'Nome do Cliente',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'empresaCliente',
      title: 'Empresa do Cliente',
      type: 'string',
      description: 'Ex: Delícias da Jô Bolos Caseiros',
    },
  ],
  preview: {
    select: {
      title: 'nomeCliente',
      subtitle: 'texto',
    },
  },
}