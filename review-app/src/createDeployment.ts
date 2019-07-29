import { KubeConfig, AppsV1Api } from '@kubernetes/client-node';
import { Metadata } from './metadata';

async function createDeployment(config: KubeConfig, metadata: Metadata) {
  const appsClient = config.makeApiClient(AppsV1Api);

  await appsClient.createNamespacedDeployment('review', {
    metadata: {
      name: metadata.app,
      labels: { ...metadata },
    },
    spec: {
      replicas: 2,
      selector: {
        matchLabels: {
          app: metadata.app,
        },
      },
      template: {
        metadata: {
          labels: { ...metadata },
        },
        spec: {
          containers: [
            {
              name: 'app',
              image: `localhost:5000/${metadata.repo}:${metadata.tag}`,
              imagePullPolicy: 'Always',
              ports: [
                {
                  containerPort: 80,
                  name: 'http',
                },
              ],
            },
          ],
        },
      },
    },
  });
}

export default createDeployment;