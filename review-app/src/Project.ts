import { V1ObjectMeta } from '@kubernetes/client-node';

class Project {
  readonly repository: string;
  readonly branch: string;
  readonly commit: string;

  readonly safeRepository: string;
  readonly safeBranch: string;

  readonly name: string;

  constructor(repository: string, branch: string, commit: string) {
    this.repository = repository;
    this.branch = branch;
    this.commit = commit;

    this.safeRepository = repository.toLowerCase();
    this.safeBranch = branch.toLowerCase();

    this.name = `${this.safeRepository}-${this.safeBranch}`;
  }

  metadata(): V1ObjectMeta {
    return {
      name: this.name,
      labels: this.labels(),
    };
  }

  labels(): Record<string, string> {
    return {
      'github.repository': this.repository,
      'github.branch': this.branch,
      'github.commit': this.commit,
    };
  }

  selector(): Record<string, string> {
    return {
      'github.repository': this.repository,
      'github.branch': this.branch,
    };
  }
}

export default Project;
