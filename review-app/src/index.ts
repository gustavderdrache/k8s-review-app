import { KubeConfig } from '@kubernetes/client-node';
import yargs from 'yargs';

import createDeployment from './createDeployment';
import createReviewNamespace from './createReviewNamespace';
import createService from './createService';
import createIngress from './createIngress';
import { createMetadata } from './metadata';

const argv = yargs.command('$0 <repo> <branch>', '...').help().argv;

const repo = String(argv.repo);
const branch = String(argv.branch);

async function main() {
  const config = new KubeConfig();
  config.loadFromDefault();

  const metadata = createMetadata(repo, branch);

  await createReviewNamespace(config);
  await createDeployment(config, metadata);
  await createService(config, metadata);
  await createIngress(config, metadata);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
