// Dentro de studio/schemas/servico.ts

export default {
  name: 'servico',
  title: 'Serviço',
  type: 'document',
  fields: [ // A lista de campos começa aqui
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
      name: 'destaque',
      title: 'Serviço em Destaque?',
      type: 'boolean',
      description: 'Marque esta opção se este serviço deve aparecer na lista inicial da página principal.',
      initialValue: false,
    },
    {
      name: 'icone',
      title: 'Ícone do Serviço',
      type: 'image',
      description: 'O ícone que representa o serviço.',
    },
    // ... outros campos como nome, descricaoCurta, icone ...
{
  name: 'landingPageAssociada',
  title: 'Landing Page Associada',
  type: 'reference',
  to: [{ type: 'landingPage' }],
  description: 'Selecione a Landing Page para a qual este serviço irá apontar.',
}
  ], // A lista de campos termina aqui
  preview: {
    select: {
      title: 'nome',
      media: 'icone',
    },
  },
}