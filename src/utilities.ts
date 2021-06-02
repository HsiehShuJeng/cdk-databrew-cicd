import * as fs from 'fs';

export function doesFileExit(path: string): Boolean {
  let result = false;
  if (fs.existsSync(path)) result = true;
  return result;
}