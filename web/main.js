import {client} from './client.js'

async function getServices() {
  const query = '*[_type == "servicos"]'; // Query GROQ para buscar todos os documentos do tipo "servicos"
  const services = await client.fetch(query);

  console.log('Serviços encontrados:', services);
  // O próximo passo será usar estes 'services' para criar o HTML
}

getServices();