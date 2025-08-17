import { createClient } from 'https://esm.sh/@sanity/client'; // Usando o link direto

export const client = createClient({
  projectId: 'nt3spre6',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-08-06',
});