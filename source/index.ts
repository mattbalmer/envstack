import { EnvStackOptions } from './types';
import { detectFiles } from './utils/fs';
import * as fs from 'fs';
import { parse } from './utils/format';

export default <E extends object>(options: EnvStackOptions = {}): E & EnvStackOptions & {
  NODE_ENV?: string,
} => {
  const host = process.env;

  const files = detectFiles(options);

  const raws = files.map(file => {
    return fs.readFileSync(file, 'utf8');
  });

  const parsedObjects = raws.map(raw => {
    return parse(raw);
  });

  const parsedEnv = parsedObjects.reduce((env, parsed) => {
    return {
      ...env,
      ...parsed,
    };
  }, {});

  const transformedEnv = transformEnv<E>(parsedEnv, options);

  return {
    ...options,
    ...parsedEnv,
    NODE_ENV: host.NODE_ENV,
  };
}