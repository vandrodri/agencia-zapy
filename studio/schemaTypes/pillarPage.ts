// Dentro de studio/schemaTypes/pillarPage.ts
export default {
  name: 'pillarPage',
  title: 'Pillar Page',
  type: 'document',
  fields: [
    { name: 'titulo', title: 'Título Principal (H1)', type: 'string' },
    { name: 'subtitulo', title: 'Subtítulo', type: 'text' },
    {
      name: 'slug',
      title: 'URL (Slug)',
      type: 'slug',
      options: { },
    },
    {
      name: 'secoes',
      title: 'Seções de Conteúdo',
      type: 'array',
      of: [{ type: 'secaoPillar' }], // Um array de seções
    },
    // Adicionando a seção de CTA no final
    { name: 'ctaTitulo', title: 'Título do CTA Final', type: 'string' },
    { name: 'ctaTexto', title: 'Texto do CTA Final', type: 'text' },
    { name: 'ctaLinkBotao', title: 'Link do Botão do CTA', type: 'string' },
    { name: 'ctaTextoBotao', title: 'Texto do Botão do CTA', type: 'string' },
  ],
}