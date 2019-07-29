import execa from 'execa';
import tempWrite from 'temp-write';
import { stringify } from 'yaml';

function kubectl(...args: readonly string[]) {
  return execa('kubectl', args, { stdio: 'inherit' });
}

export async function apply(schema: object) {
  const document = stringify(schema);
  const path = await tempWrite(document);

  return kubectl('--namespace', 'review', 'apply', '-f', path);
}
