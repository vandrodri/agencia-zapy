// O arquivo COMPLETO studio/schemas/paginaInicial.ts

export default {
  name: 'paginaInicial',
  title: 'Página Inicial',
  type: 'document',
  fields: [
    // --- Seção Hero (Já existia) ---
    {
      name: 'tituloHero',
      title: 'Título Principal (Hero)',
      type: 'string',
      description: 'O texto grande que aparece no topo da página.',
    },
    {
      name: 'subtituloHero',
      title: 'Subtítulo (Hero)',
      type: 'text',
      description: 'O texto de apoio que aparece abaixo do título principal.',
    },
    {
      name: 'imagemHero',
      title: 'Imagem de Fundo (Hero)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },

    // --- Seção de Serviços (Nova Adição) ---
    {
      name: 'tituloServicos',
      title: 'Título da Seção de Serviços',
      type: 'string',
      description: 'Ex: Nossos Serviços',
    },
    {
      name: 'listaServicos',
      title: 'Lista de Serviços',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: {type: 'servico'},
        },
      ],
      description: 'Adicione aqui os serviços que devem aparecer na página inicial.',
    },
  ],
}