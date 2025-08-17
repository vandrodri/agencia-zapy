// O código COMPLETO e CORRETO para o arquivo studio/schemaTypes/index.ts

import diferencial from './diferencial'
import blockContent from './blockContent'
import configuracoes from './configuracoes'
import paginaInicial from './paginaInicial'
import servico from './servico'
import membroEquipe from './membroEquipe'
import landingPage from './landingPage'
import depoimento from './depoimento' // <-- NOSSA NOVA LINHA
import topicoPillar from './topicoPillar'     // <-- NOVA LINHA
import secaoPillar from './secaoPillar'       // <-- NOVA LINHA
import pillarPage from './pillarPage'         // <-- NOVA LINHA

export const schemaTypes = [
    blockContent, 
    configuracoes, 
    paginaInicial,
    servico,
    membroEquipe,
    landingPage,
    depoimento, 
    diferencial,
     topicoPillar,    // <-- NOVA LINHA
  secaoPillar,      // <-- NOVA LINHA
  pillarPage,       // <-- NOVA LINHA
] // Apenas UM colchete para fechar a lista.