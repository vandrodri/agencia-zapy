import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    open: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        contato: resolve(__dirname, 'contato.html'),
        'pillar-page': resolve(__dirname, 'pillar-page.html'),
        'lp-agendamentos': resolve(__dirname, 'lp-agendamentos.html'),
        'lp-ai-overviews': resolve(__dirname, 'lp-ai-overviews.html'),
        'lp-cardapios-inteligentes': resolve(__dirname, 'lp-cardapios-inteligentes.html'),
        'lp-chat-ia': resolve(__dirname, 'lp-chat-ia.html'),
        'lp-consultoria-seo': resolve(__dirname, 'lp-consultoria-seo.html'),
        'lp-gestao-avaliacoes': resolve(__dirname, 'lp-gestao-avaliacoes.html'),
        'lp-gestao-direta': resolve(__dirname, 'lp-gestao-direta.html'),
        'lp-listagem-produtos': resolve(__dirname, 'lp-listagem-produtos.html'),
        'lp-otimizacao-gbp': resolve(__dirname, 'lp-otimizacao-gbp.html'),
        'lp-perguntas-respostas': resolve(__dirname, 'lp-perguntas-respostas.html'),
        'lp-posts-estrategicos': resolve(__dirname, 'lp-posts-estrategicos.html'),
        'lp-recursos-visuais': resolve(__dirname, 'lp-recursos-visuais.html'),
        'lp-redes-sociais': resolve(__dirname, 'lp-redes-sociais.html'),
        'lp-relatorios': resolve(__dirname, 'lp-relatorios.html'),
        'lp-tour-360': resolve(__dirname, 'lp-tour-360.html'),
      }
    }
  }
})