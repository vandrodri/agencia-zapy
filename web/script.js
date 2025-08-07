import { createClient } from 'https://esm.sh/@sanity/client';

const sanityClient = createClient({
  projectId: 'nt3spre6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-08-06',
});
document.addEventListener('DOMContentLoaded', () => {
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

    // Aplica o tema salvo ao carregar a página
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        applyTheme(currentTheme);
    }

    // Adiciona o evento de clique ao botão de tema
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
            async function getServices() {
  const servicesGrid = document.querySelector('.services-grid');
  if (!servicesGrid) return;

  const query = '*[_type == "servico"]{nome, descricaoCurta}';
  const services = await sanityClient.fetch(query);

  servicesGrid.innerHTML = ''; 
  services.forEach(service => {
    const card = document.createElement('a');
    card.classList.add('service-card');
    card.href = '#';
    card.innerHTML = `<h3>${service.nome}</h3><p>${service.descricaoCurta}</p>`;
    servicesGrid.appendChild(card);
  });
}

getServices();
        });
    }
});
