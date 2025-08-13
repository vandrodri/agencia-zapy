// =============================================================
//  1. CONFIGURAÇÃO DO CLIENTE SANITY
// =============================================================
import { createClient } from 'https://esm.sh/@sanity/client';

const sanityClient = createClient({
  projectId: 'nt3spre6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-08-06',
});


// =============================================================
//  2. DEFINIÇÃO DAS FUNÇÕES QUE BUSCAM DADOS
// =============================================================

// Função para buscar os serviços (para a página inicial)
async function getServices() {
  const servicesGrid = document.querySelector('.services-grid');
  if (!servicesGrid) return;

  const query = '*[_type == "servico"]{nome, descricaoCurta}';
  try {
    const services = await sanityClient.fetch(query);
    servicesGrid.innerHTML = ''; 
    services.forEach(service => {
      const card = document.createElement('a');
      card.classList.add('service-card');
      card.href = '#';
      card.innerHTML = `<h3>${service.nome}</h3><p>${service.descricaoCurta}</p>`;
      servicesGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Erro ao buscar serviços:", error);
  }
}

// Função GENÉRICA para carregar conteúdo de Landing Pages
async function getPaginaGenerica() {
  const tituloPagina = document.querySelector('.pagina-titulo');
  const conteudoPagina = document.querySelector('.pagina-conteudo');
  if (!tituloPagina || !conteudoPagina) return;

  const path = window.location.pathname;
  const nomeArquivo = path.substring(path.lastIndexOf('/') + 1);
  const slug = nomeArquivo.replace('.html', '');

  if (!slug || slug === 'index' || slug === '') return;

  const query = `*[_type == "landingPage" && slug.current == "${slug}"][0]`;
  try {
    const pagina = await sanityClient.fetch(query);
    if (pagina) {
      document.title = `${pagina.titulo} | Zapy`;
      tituloPagina.textContent = pagina.titulo;
      conteudoPagina.innerHTML = '';
      if (pagina.conteudo) {
        pagina.conteudo.forEach(bloco => {
          if (bloco._type === 'block' && bloco.children) {
            const p = document.createElement('p');
            p.textContent = bloco.children.map(span => span.text).join('');
            conteudoPagina.appendChild(p);
          }
        });
      }
    } else {
      console.warn(`Nenhum conteúdo encontrado para a página com slug: ${slug}`);
    }
  } catch (error) {
    console.error(`ERRO AO BUSCAR DADOS PARA A PÁGINA ${slug}:`, error);
  }
}

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
async function carregarEquipe() {
  // 1. Encontra o container onde os cards da equipe ficarão
  const equipeGrid = document.querySelector('.team-grid'); // Usaremos esta classe no HTML
  
  // Se a página não tiver uma grade de equipe, a função para.
  if (!equipeGrid) return;

  // 2. A consulta para buscar TODOS os membros da equipe
  // NOTA: Precisamos de uma função especial para pegar a URL da imagem
  const query = `*[_type == "membroEquipe"]{
    nome,
    cargo,
    "urlFoto": foto.asset->url
  }`;
  
  try {
    const equipe = await sanityClient.fetch(query);

    if (equipe && equipe.length > 0) {
      // 3. Limpa o conteúdo estático do HTML
      equipeGrid.innerHTML = '';

      // 4. Para cada membro, cria um card e o insere na página
      equipe.forEach(membro => {
        const card = document.createElement('article');
        card.classList.add('team-card'); // Usaremos esta classe para estilizar

        // Monta o conteúdo HTML do card
        card.innerHTML = `
          <img src="${membro.urlFoto}" alt="Foto de ${membro.nome}">
          <h3>${membro.nome}</h3>
          <p>${membro.cargo}</p>
        `;

        // Adiciona o card recém-criado ao grid
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
// =============================================================
//  3. LÓGICA DE INTERATIVIDADE DA PÁGINA (EVENTOS)
// =============================================================
document.addEventListener('DOMContentLoaded', () => {
    // --- LÓGICA DO TEMA CLARO/ESCURO ---
    // ... (todo o seu código de tema, menu, faq, etc. continua aqui, sem alterações)
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
    
    // --- LÓGICA DO FAQ (ACORDEÃO) ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        }
    });

    // --- LÓGICA DO BOTÃO "VER SERVIÇOS" ---
    const toggleBtn = document.getElementById('toggleServicesBtn');
    if (toggleBtn) {
        const hiddenServices = document.querySelectorAll('.service-card.is-hidden');
        toggleBtn.addEventListener('click', () => {
            hiddenServices.forEach(card => {
                card.style.display = card.style.display === 'block' ? 'none' : 'block';
            });
            const isHidden = hiddenServices[0] && hiddenServices[0].style.display === 'none';
            toggleBtn.textContent = isHidden ? 'Ver todos os serviços' : 'Mostrar menos';
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
});

// =============================================================
//  4. CHAMADA DAS FUNÇÕES DE BUSCA DE DADOS
// =============================================================
getServices();
getPaginaGenerica();
carregarConfiguracoesGlobais();
carregarDepoimentos();
carregarEquipe(); 
carregarDiferenciais();