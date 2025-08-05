// Dentro de studio/schemas/membroEquipe.ts

export default {
  name: 'membroEquipe',
  title: 'Membro da Equipe',
  type: 'document',
  fields: [
    {
      name: 'nome',
      title: 'Nome',
      type: 'string',
    },
    {
      name: 'cargo',
      title: 'Cargo',
      type: 'string',
      description: 'Ex: Diretor de IA, Especialista em SEO, etc.',
    },
    {
      name: 'foto',
      title: 'Foto',
      type: 'image',
      options: {
        hotspot: true, // Permite focar na parte mais importante da foto
      },
    },
  ],
  preview: {
    select: {
      title: 'nome',
      subtitle: 'cargo',
      media: 'foto',
    },
  },
}