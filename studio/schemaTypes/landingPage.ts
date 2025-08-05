// Dentro de studio/schemaTypes/landingPage.ts

export default {
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título da Página',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: {
        source: 'titulo', // Gera a URL a partir do título
        maxLength: 96,
      },
      description: 'Esta será a URL da página. Ex: /consultoria-seo',
    },
    {
      name: 'conteudo',
      title: 'Conteúdo Principal',
      type: 'blockContent',
    },
  ],
}