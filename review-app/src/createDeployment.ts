import { V1Deployment } from '@kubernetes/client-node';

import { apply } from './kubectl';
import Project from './Project';

async function createDeployment(project: Project) {
  const deployment: V1Deployment = {
    apiVersion: 'apps/v1',
    kind: 'Deployment',
    metadata: project.metadata(),
    spec: {
      replicas: 2,
      selector: {
        matchLabels: project.selector(),
      },
      template: {
        metadata: {
          labels: project.labels(),
        },
        spec: {
          containers: [
            {
              name: 'app',
              image: `localhost:5000/${project.safeRepository}:${project.branch}`,
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
  };

  await apply(deployment);
}

export default createDeployment;