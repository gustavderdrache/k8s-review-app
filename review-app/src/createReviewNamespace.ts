import { V1Namespace } from '@kubernetes/client-node';

import { apply } from './kubectl';

async function createReviewNamespace() {
  const namespace: V1Namespace = {
    apiVersion: 'v1',
    kind: 'Namespace',
    metadata: {
      name: 'review',
    },
  };

  await apply(namespace);
}

export default createReviewNamespace;
