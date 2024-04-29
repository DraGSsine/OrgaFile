import { Pinecone } from '@pinecone-database/pinecone';

const pc = new Pinecone({
  apiKey: 'ed60edf4-50e5-4701-bfa2-6f0c05070266',
});

export const createIndex = async () => {
  await pc.createIndex({
    name: 'quickstart',
    dimension: 8,
    metric: 'euclidean',
    spec: {
      serverless: {
        cloud: 'aws',
        region: 'us-east-1',
      },
    },
  });
};
