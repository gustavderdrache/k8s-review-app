import { V1beta1Ingress } from '@kubernetes/client-node';

import Project from './Project';
import { apply } from './kubectl';

async function createIngress(project: Project) {
  const ingress: V1beta1Ingress = {
    apiVersion: 'networking.k8s.io/v1beta1',
    kind: 'Ingress',
    metadata: project.metadata(),
    spec: {
      rules: [
        {
          host: `${project.safeBranch}.${project.safeRepository}.review.app`,
          http: {
            paths: [
              {
                backend: {
                  serviceName: project.name,
                  servicePort: 80,
                },
              },
            ],
          },
        },
      ],
    },
  };

  await apply(ingress);
}

export default createIngress;
