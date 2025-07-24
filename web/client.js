import {createClient} from 'https://cdn.skypack.dev/@sanity/client'
export const client = createClient({
  projectId: 'nt3spre6', // O SEU ID CORRETO AQUI
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-07-25',
})