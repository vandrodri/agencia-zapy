// =============================================================
//  1. CONFIGURAÇÃO DO CLIENTE SANITY
// =============================================================
import { createClient } from 'https://esm.sh/@sanity/client';
import { toHTML } from 'https://esm.sh/@portabletext/to-html';
import imageUrlBuilder from 'https://esm.sh/@sanity/image-url'; // <-- Linha 1 (Importar)

const sanityClient = createClient({
  projectId: 'nt3spre6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-08-06',
});

// Inicializa o construtor de URLs de imagem
const builder = imageUrlBuilder(sanityClient); // <-- Linha 2 (Inicializar)

// =============================================================
//  2. DEFINIÇÃO DAS FUNÇÕES QUE BUSCAM DADOS
// =============================================================

// Função para buscar os serviços (para a página inicial)
// Função para buscar os serviços (para a página inicial) - VERSÃO CORRIGIDA
async function getServices() {
  const servicesGrid = document.querySelector('.services-grid');
  if (!servicesGrid) return;

  // Consulta atualizada para buscar o slug da landing page associada
  const query = `*[_type == "servico"]{
    nome,
    descricaoCurta,
    "slugDaLp": landingPageAssociada->slug.current
  }`;
  
  try {
    const services = await sanityClient.fetch(query);

    // Se não houver serviços, mostra uma mensagem e para.
    if (!services || services.length === 0) {
      servicesGrid.innerHTML = '<p>Nenhum serviço cadastrado no momento.</p>';
      return;
    }

    // Limpa a mensagem de "carregando"
    servicesGrid.innerHTML = ''; 

    services.forEach(service => {
      const card = document.createElement('a');
      card.classList.add('service-card');
      
      // Lógica para criar o link:
      // Se um slug foi associado no Sanity, cria o link para o .html.
      // Se não, cria um link morto para evitar erros.
      if (service.slugDaLp) {
        card.href = `${service.slugDaLp}.html`;
      } else {
        card.href = '#';
        console.warn(`Serviço "${service.nome}" não tem uma Landing Page associada.`);
      }

      card.innerHTML = `<h3>${service.nome}</h3><p>${service.descricaoCurta}</p>`;
      servicesGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
    servicesGrid.innerHTML = '<p>Ocorreu um erro ao carregar os serviços.</p>';
  }
}

// Função GENÉRICA para carregar conteúdo de Landing Pages
// Função GENÉRICA para carregar conteúdo de Landing Pages
async function getPaginaGenerica(slug) {
  // O try...catch deve começar AQUI, dentro da função
  try {
    const tituloPagina = document.querySelector('.pagina-titulo');
    const conteudoPagina = document.querySelector('.pagina-conteudo');

    // Se os elementos não existirem na página, não faz nada.
    if (!tituloPagina || !conteudoPagina) {
      return;
    }

    const query = `*[_type == "paginaGenerica" && slug.current == $slug][0]`;
    const params = { slug };
    const pagina = await sanityClient.fetch(query, params);

    if (pagina) {
      document.title = `${pagina.titulo} | Zapy`;
      tituloPagina.textContent = pagina.titulo;
      if (pagina.conteudo) {
        conteudoPagina.innerHTML = toHTML(pagina.conteudo);
      } else {
        conteudoPagina.innerHTML = ''; // Limpa o conteúdo se não houver nada no Sanity
      }
    } else {
      console.warn(`Nenhum conteúdo encontrado para a página com slug: ${slug}`);
    }
  } // A chave do 'try' fecha aqui
  catch (error) { // E o 'catch' vem logo em seguida
    console.error(`ERRO AO BUSCAR DADOS PARA A PÁGINA ${slug}:`, error);
  }
} // A função inteira termina aqui
// Função para buscar e aplicar as configurações globais
async function carregarConfiguracoesGlobais() {
  const query = `*[_type == "configuracoes"][0]`;
  try {
    const config = await sanityClient.fetch(query);
    if (config) {
      const whatsappButton = document.querySelector('.whatsapp-button');
      if (whatsappButton && config.numeroWhatsapp) {
        whatsappButton.href = `https://wa.me/${config.numeroWhatsapp}?text=Olá!`;
      }
    }
  } catch (error) {
    console.error('ERRO AO BUSCAR CONFIGURAÇÕES GLOBAIS:', error);
  }
}

// Função para buscar e exibir os depoimentos
async function carregarDepoimentos() {
  const depoimentosGrid = document.querySelector('.testimonials-grid');
  if (!depoimentosGrid) return;

  const query = `*[_type == "depoimento"]`;
  try {
    const depoimentos = await sanityClient.fetch(query);
    if (depoimentos && depoimentos.length > 0) {
      depoimentosGrid.innerHTML = '';
      depoimentos.forEach(depoimento => {
        const card = document.createElement('article');
        card.classList.add('testimonial-card');
        card.innerHTML = `
          <span class="testimonial-card-icon">“</span>
          <blockquote>${depoimento.texto}</blockquote>
          <cite>
            ${depoimento.nomeCliente}
            <span>${depoimento.empresaCliente}</span>
          </cite>
        `;
        depoimentosGrid.appendChild(card);
      });
    }
  } catch (error) {
    console.error('ERRO AO BUSCAR DEPOIMENTOS:', error);
  }
}
// Função para buscar e exibir os membros da equipe
// Função para buscar e exibir os membros da equipe - VERSÃO OTIMIZADA
async function carregarEquipe() {
  const equipeGrid = document.querySelector('.team-grid');
  if (!equipeGrid) return;

  // 1. Consulta atualizada: agora pedimos o objeto 'foto' inteiro
  const query = `*[_type == "membroEquipe"]{
    nome,
    cargo,
    foto 
  }`;
  
  try {
    const equipe = await sanityClient.fetch(query);

    if (equipe && equipe.length > 0) {
      equipeGrid.innerHTML = '';

      equipe.forEach(membro => {
        const card = document.createElement('article');
        card.classList.add('team-card');

        // 2. A MÁGICA ACONTECE AQUI:
        // Usamos o 'builder' para criar uma URL de imagem otimizada
        // Pedimos uma imagem com 400px de largura, 400px de altura e formato 'webp' (super leve)
        const urlFotoOtimizada = builder.image(membro.foto).width(400).height(400).format('webp').url();

        // 3. Usamos a nova URL otimizada na tag <img>
        card.innerHTML = `
          <img src="${urlFotoOtimizada}" alt="Foto de ${membro.nome}" width="400" height="400">
          <h3>${membro.nome}</h3>
          <p>${membro.cargo}</p>
        `;

        equipeGrid.appendChild(card);
      });
    }
  } catch (error) {
    console.error('ERRO AO BUSCAR EQUIPE:', error);
  }
}
// Função para buscar e exibir os diferenciais
async function carregarDiferenciais() {
  // 1. Encontra o container onde os cards dos diferenciais ficarão
  const diferenciaisGrid = document.querySelector('.features-grid');
  
  // Se a página não tiver uma grade de diferenciais, a função para.
  if (!diferenciaisGrid) return;

  // 2. A consulta para buscar TODOS os documentos do tipo "diferencial"
  const query = `*[_type == "diferencial"]{
    titulo,
    descricao,
    codigoIcone
  }`;
  
  try {
    const diferenciais = await sanityClient.fetch(query);

    if (diferenciais && diferenciais.length > 0) {
      // 3. Limpa o conteúdo estático do HTML
      diferenciaisGrid.innerHTML = '';

      // 4. Para cada diferencial, cria um card e o insere na página
      diferenciais.forEach(diferencial => {
        const card = document.createElement('article');
        card.classList.add('feature-card');

        // Monta o conteúdo HTML do card
        card.innerHTML = `
          <div class="feature-icon">
            ${diferencial.codigoIcone || ''}
          </div>
          <div>
            <h3>${diferencial.titulo}</h3>
            <p>${diferencial.descricao}</p>
          </div>
        `;

        // Adiciona o card recém-criado ao grid
        diferenciaisGrid.appendChild(card);
      });
    }
  } catch (error) {
    console.error('ERRO AO BUSCAR DIFERENCIAIS:', error);
  }
}
// Função para buscar e construir a Pillar Page
async function carregarPillarPage() {
  // 1. Encontra o container principal da página. Se não existir, não estamos na pillar page.
  const mainContainer = document.querySelector('.pillar-content-section .container');
  if (!mainContainer) return;

  // 2. A consulta GROQ para buscar a pillar page com todas as suas seções e tópicos
  const query = `*[_type == "pillarPage" && slug.current == "pillar-page"][0]{
    titulo,
    subtitulo,
    secoes[]{ // O '[]' indica que queremos todos os itens do array 'secoes'
      titulo,
      topicos[]{ // E dentro de cada seção, todos os itens do array 'topicos'
        titulo,
        descricao,
        link
      }
    },
    ctaTitulo,
    ctaTexto,
    ctaLinkBotao,
    ctaTextoBotao
  }`;
  
  try {
    const pagina = await sanityClient.fetch(query);

    if (pagina) {
      // 3. Preenche o cabeçalho (hero section)
      document.querySelector('.pillar-hero-section h1').textContent = pagina.titulo;
      document.querySelector('.pillar-hero-section .subtitle').textContent = pagina.subtitulo;

      // 4. Limpa o conteúdo estático do container principal
      mainContainer.innerHTML = '';

      // 5. Constrói cada seção dinamicamente
      pagina.secoes.forEach(secao => {
        // Cria o título da seção
        const secaoTitulo = document.createElement('h2');
        secaoTitulo.textContent = secao.titulo;
        mainContainer.appendChild(secaoTitulo);

        // Cria a grade para os tópicos
        const pillarGrid = document.createElement('div');
        pillarGrid.classList.add('pillar-grid');

        // Cria cada card de tópico dentro da grade
        secao.topicos.forEach(topico => {
          const featureBox = document.createElement('article');
          featureBox.classList.add('feature-box');
          featureBox.innerHTML = `
            <h3>${topico.titulo}</h3>
            <p>${topico.descricao}</p>
            <a href="${topico.link}">${topico.titulo.startsWith('AI') ? 'Quero controlar o que a IA diz sobre mim' : 'Saiba mais'} →</a>
          `; // Nota: O texto do link é simplificado aqui, podemos melhorar depois.
          pillarGrid.appendChild(featureBox);
        });

        mainContainer.appendChild(pillarGrid);
      });

      // 6. Preenche a seção final de CTA
      document.querySelector('.cta-section h2').textContent = pagina.ctaTitulo;
      document.querySelector('.cta-section p').textContent = pagina.ctaTexto;
      const ctaButton = document.querySelector('.cta-section .cta-button');
      ctaButton.textContent = pagina.ctaTextoBotao;
      ctaButton.href = pagina.ctaLinkBotao;

    }
  } catch (error) {
    console.error('ERRO AO CARREGAR A PILLAR PAGE:', error);
  }
}
// =============================================================
// =============================================================
//  3. FUNÇÃO PARA INICIALIZAR A INTERATIVIDADE
// =============================================================

function inicializarInteratividade() {
    // --- LÓGICA DO TEMA CLARO/ESCURO ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const sunIcon = document.getElementById('theme-icon-sun');
    const moonIcon = document.getElementById('theme-icon-moon');

    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            body.classList.remove('dark-mode');
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    };
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        applyTheme(currentTheme);
    }
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            let newTheme = body.classList.contains('dark-mode') ? 'light' : 'dark';
            localStorage.setItem('theme', newTheme);
            applyTheme(newTheme);
        });
    }

    // --- LÓGICA DO MENU MOBILE ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.getElementById('mainNav');
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            mainNav.classList.toggle('is-active');
        });
    }
    
    // --- LÓGICA DO BANNER DE COOKIES ---
    const cookieBanner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('accept-cookies');
    if (cookieBanner && acceptBtn && !localStorage.getItem('cookiesAccepted')) {
        cookieBanner.classList.add('show');
    }
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            if(cookieBanner) cookieBanner.classList.remove('show');
            localStorage.setItem('cookiesAccepted', 'true');
        });
    }
}


// =============================================================
// =============================================================
//  // =============================================================
// 4. PONTO DE ENTRADA PRINCIPAL DA APLICAÇÃO
// =============================================================

// =============================================================
// 4. PONTO DE ENTRADA PRINCIPAL DA APLICAÇÃO (VERSÃO FINAL)
// =============================================================

// Função principal que inicia tudo
function iniciarSite() {
  // 1. Funções que rodam em TODAS as páginas
  carregarConfiguracoesGlobais();
  inicializarInteratividade();

  // 2. Roteador: Decide o que carregar baseado na URL da página
  const path = window.location.pathname;

  if (path === '/' || path === '/index.html') {
    // Funções que rodam SÓ na PÁGINA INICIAL
    console.log("Estou na Home, carregando conteúdo da Home...");
    getServices();
    carregarDepoimentos();
    carregarEquipe();
    carregarDiferenciais();
  } 
  // CORREÇÃO: Aceita a URL com e sem .html
  else if (path === '/sobre' || path === '/sobre.html') {
    // Funções que rodam SÓ na PÁGINA SOBRE
    console.log("Estou em Sobre, carregando conteúdo genérico...");
    getPaginaGenerica('sobre'); 
  } 
  // CORREÇÃO: Aceita a URL com e sem .html
  else if (path === '/pillar-page' || path === '/pillar-page.html') {
    // Funções que rodam SÓ na PILLAR PAGE
    console.log("Estou na Pillar Page, carregando conteúdo dela...");
    carregarPillarPage();
  }
  // ADICIONE AQUI OUTRAS PÁGINAS NO FUTURO
  // else if (path === '/contato' || path === '/contato.html') {
  //   getPaginaGenerica('contato');
  // }
}
  else if (path === '/contato' || path === '/contato.html') {
    // Funções que rodam SÓ na PÁGINA CONTATO
    console.log("Estou em Contato, carregando conteúdo genérico...");
    // Usamos o slug 'contato' para buscar os dados no Sanity
    getPaginaGenerica('contato'); 
  }

// A maneira mais segura de garantir que tudo carregou antes de rodar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarSite);
} // =============================================================
// 4. PONTO DE ENTRADA PRINCIPAL DA APLICAÇÃO (VERSÃO FINAL)
// =============================================================

// Função principal que inicia tudo
function iniciarSite() {
  // 1. Funções que rodam em TODAS as páginas
  carregarConfiguracoesGlobais();
  inicializarInteratividade();

  // 2. Roteador: Decide o que carregar baseado na URL da página
  const path = window.location.pathname;

  if (path === '/' || path === '/index.html') {
    // Funções que rodam SÓ na PÁGINA INICIAL
    console.log("Estou na Home, carregando conteúdo da Home...");
    getServices();
    carregarDepoimentos();
    carregarEquipe();
    carregarDiferenciais();
  } 
  else if (path === '/quem-somos' || path === '/quem-somos.html') {
    // Funções que rodam SÓ na PÁGINA SOBRE
    console.log("Estou em Quem Somos, carregando conteúdo genérico...");
    getPaginaGenerica('sobre'); 
  } 
  else if (path === '/pillar-page' || path === '/pillar-page.html') {
    // Funções que rodam SÓ na PILLAR PAGE
    console.log("Estou na Pillar Page, carregando conteúdo dela...");
    carregarPillarPage();
  }
  else if (path === '/contato' || path === '/contato.html') {
    // Funções que rodam SÓ na PÁGINA CONTATO
    console.log("Estou em Contato, carregando conteúdo genérico...");
    getPaginaGenerica('contato'); 
  }
  // ADICIONE AQUI OUTRAS PÁGINAS NO FUTURO
}

// A maneira mais segura de garantir que tudo carregou antes de rodar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', iniciarSite);
} else {
  iniciarSite();
}