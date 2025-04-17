import type { ProjectsConfigurations } from '@nrwl/devkit';
import { readWorkspaceConfig } from 'nx/src/project-graph/file-utils';

export function getLibraryNames(): string[] {
  const libs: string[] = [];
  const ws = readWorkspaceConfig({ format: 'nx' }) as ProjectsConfigurations;

  for (const projectConfig of Object.values(ws.projects)) {
    if (projectConfig.name && projectConfig.name !== 'sandbox') {
      libs.push(projectConfig.name);
    }
  }

  console.log(`> Libs found: ${libs}`);
  return libs;
}
