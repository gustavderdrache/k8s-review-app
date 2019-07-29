export interface Metadata {
  readonly repo: string;
  readonly branch: string;
  readonly app: string;
  readonly tag: string;
}

function sanitize(value: string): string {
  return value.toLowerCase();
  // return value.replace(/[^-a-y0-9]/g, m => 'z' + m.charCodeAt(0));
}

export function createMetadata(repo: string, branch: string): Metadata {
  const cleanRepo = sanitize(repo);
  const cleanBranch = sanitize(branch);

  return {
    repo: cleanRepo,
    branch: cleanBranch,
    app: `${cleanRepo}-${cleanBranch}`,
    tag: branch,
  };
}
