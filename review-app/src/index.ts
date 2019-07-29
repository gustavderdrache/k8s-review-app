import crypto from 'crypto';
import { promisify } from 'util';
import yargs from 'yargs';

import createDeployment from './createDeployment';
import createReviewNamespace from './createReviewNamespace';
import createService from './createService';
import createIngress from './createIngress';
import Project from './Project';

const argv = yargs.command('$0 <repository> <branch>', '...').help().argv;

const repository = String(argv.repository);
const branch = String(argv.branch);

const randomBytes = promisify(crypto.randomBytes);

async function main() {
  const commitBytes = await randomBytes(8);
  const commit = commitBytes.toString('hex').toLowerCase();


  const project = new Project(repository, branch, commit);

  await createReviewNamespace();
  await createDeployment(project);
  await createService(project);
  await createIngress(project);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
