import { createClient } from 'next-sanity';

const sanityClient = createClient({
  projectId: 'sds6d0u5',
  dataset: 'production',
  apiVersion: new Date().toISOString().split('T')[0],
  useCdn: false,
});

export { sanityClient };
