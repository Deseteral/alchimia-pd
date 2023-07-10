import * as fs from 'fs';
import { execSync } from 'child_process';

function listLuaModules(): string[] {
  return execSync('find ./Source -name "*.lua" -type f ! -name "main.lua" ! -name "prelude.lua"')
    .toString()
    .split('\n')
    .filter((line) => line.length > 0);
}

function defineExportsAsGlobals(filePath: string): void {
  console.log(filePath);
  const lines = fs.readFileSync(filePath, { encoding: 'utf8' }).split('\n');

  const identifiers = lines
    .map((line) => {
      const varDefinition = line.match(/^____exports\.(\w+)/)?.at(1);
      const functionDefinition = line.match(/^function ____exports\.(\w+)/)?.at(1);
      return varDefinition || functionDefinition || null;
    })
    .filter((value) => !!value);

  if (identifiers.length === 0) return;

  const globalDefinitions = identifiers.map((identifier) => `${identifier} = ____exports.${identifier}`);

  lines.pop(); // Remove last empty line
  const returnStatement = lines.pop();

  const fileContents = [
    ...lines,
    ...globalDefinitions,
    returnStatement,
  ].join('\n');

  fs.writeFileSync(filePath, fileContents, { encoding: 'utf8' });
}

listLuaModules().forEach((file) => defineExportsAsGlobals(file));
