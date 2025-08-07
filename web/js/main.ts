import { client } from './sanity.js';

async function getServices() {
  const servicesGrid = document.querySelector('.services-grid');
  if (!servicesGrid) return;

  const query = '*[_type == "servico"]{nome, descricaoCurta}';
  const services = await client.fetch(query);

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