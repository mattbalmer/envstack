import { EnvStackOptions } from '../types';

const LINE_FORMAT = /(?:^|^)\s*(?:export\s+)?([\w.-]+)(?:\s*=\s*?|:\s+?)(\s*'(?:\\'|[^'])*'|\s*"(?:\\"|[^"])*"|\s*`(?:\\`|[^`])*`|[^#\r\n]+)?\s*(?:#.*)?(?:$|$)/mg;

export const parse = (raw: string) => {
  const env = {};

  const lines = raw.replace(/\r\n?/mg, '\n');

  let match;
  while ((match = LINE_FORMAT.exec(lines)) !== null) {
    const key = match[1];

    // Default to empty string & trim
    let value = (match[2] || '').trim();

    // Check if double quoted
    const isDoubleQuoted = value[0] === '"';

    // Remove surrounding quotes
    value = value.replace(/^(['"`])([\s\S]*)\1$/mg, '$2');

    // Expand newlines if double quoted
    if (isDoubleQuoted) {
      value = value.replace(/\\n/g, '\n');
      value = value.replace(/\\r/g, '\r');
    }

    // Add to object
    env[key] = value;
  }

  return env;
}

export const transformEnv = <E extends object>(env: E, options: EnvStackOptions): E => {

}