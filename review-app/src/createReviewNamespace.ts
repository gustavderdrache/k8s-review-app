import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

async function hasReviewNamespace(config: KubeConfig): Promise<boolean> {
  const client = config.makeApiClient(CoreV1Api);

  const response = await client.listNamespace();
  return response.body.items.some(
    ({ metadata }) => metadata && metadata.name === 'review',
  );
}

async function createReviewNamespace(config: KubeConfig) {
  if (await hasReviewNamespace(config)) {
    return;
  }

  const client = config.makeApiClient(CoreV1Api);
  await client.createNamespace({
    metadata: {
      name: 'review',
    },
  });
}

export default createReviewNamespace;
