import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'fw00q2en',
  dataset: 'production',
  useCdn: true // Enable if you want to use CDN caching
});

export default client;
