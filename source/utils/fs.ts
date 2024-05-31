import * as path from 'path';
import * as os from 'os';
import { EnvStackOptions } from '../types';

export const resolvePath = (envPath: string, base?: string): string => {
  if (envPath[0] === '~') {
    return path.join(os.homedir(), envPath.slice(1));
  }

  if (envPath[0] === '/') {
    return envPath;
  }

  return base ? path.join(base, envPath) : envPath;
}

export const detectFiles = (options: EnvStackOptions): string[] => {
  const baseDir = options.cwd ? resolvePath(options.cwd) : process.cwd();

  const optionPaths = [
    '.env',
    ...(Array.isArray(options.path) ? options.path : options.path ? [options.path] : []),
  ];

  return optionPaths.map(envPath => resolvePath(envPath, baseDir));
}