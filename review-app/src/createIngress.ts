import { KubeConfig, ExtensionsV1beta1Api } from '@kubernetes/client-node';

import { Metadata } from './metadata';

async function createIngress(config: KubeConfig, metadata: Metadata) {
  const client = config.makeApiClient(ExtensionsV1beta1Api);

  await client.createNamespacedIngress('review', {
    metadata: {
      name: metadata.app,
      labels: {
        ...metadata,
      },
    },
    spec: {
      rules: [
        {
          host: `${metadata.branch}.${metadata.repo}.review.app`,
          http: {
            paths: [
              {
                backend: {
                  serviceName: metadata.app,
                  servicePort: 80,
                },
              },
            ],
          },
        },
      ],
    },
  });
}

export default createIngress;
