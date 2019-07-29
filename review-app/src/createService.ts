import { KubeConfig, CoreV1Api } from '@kubernetes/client-node';

import { Metadata } from './metadata';

async function createService(config: KubeConfig, metadata: Metadata) {
  const coreClient = config.makeApiClient(CoreV1Api);

  await coreClient.createNamespacedService('review', {
    metadata: {
      name: metadata.app,
      labels: { ...metadata },
    },
    spec: {
      clusterIP: 'None',
      selector: {
        app: metadata.app,
      },
      ports: [
        {
          name: 'http',
          port: 80,
        },
      ],
    },
  });
}

export default createService;
