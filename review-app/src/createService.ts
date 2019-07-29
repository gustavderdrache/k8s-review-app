import { V1Service } from '@kubernetes/client-node';

import Project from './Project';
import { apply } from './kubectl';

async function createService(project: Project) {
  const service: V1Service = {
    apiVersion: 'v1',
    kind: 'Service',
    metadata: project.metadata(),
    spec: {
      clusterIP: 'None',
      selector: project.selector(),
      ports: [
        {
          name: 'http',
          port: 80,
        },
      ],
    },
  };

  await apply(service);
}

export default createService;
