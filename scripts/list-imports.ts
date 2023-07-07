import * as fs from 'fs';

function walkTree(base: string = ''): string[] {
  const rootImports = fs.readdirSync(`./Source/${base}`)
    .filter((file) => file.endsWith('.lua'))
    .filter((file) => file !== 'main.lua')
    .filter((s) => s.length > 0)
    .map((file) => `${base ? `${base}/` : ''}${file}`);

  const dirsImports = fs.readdirSync(`./Source/${base}`)
    .filter((file) => !file.includes('.'))
    .filter((file) => file !== 'pdxinfo')
    .filter((file) => file !== '.DS_Store')
    .filter((s) => s.length > 0)
    .flatMap((dir) => walkTree(base + dir));

  return [...rootImports, ...dirsImports];
}

function defineExportsAsGlobals(filePath: string): void {
  const fullFilePath = `./Source/${filePath}`;
  const lines = fs.readFileSync(fullFilePath, { encoding: 'utf8' }).split('\n');

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

  fs.writeFileSync(fullFilePath, fileContents, { encoding: 'utf8' });
}

const files = walkTree();

files.forEach((file) => defineExportsAsGlobals(file));

const intro = [
  'import "CoreLibs/object"',
  '',
  ...files.map((file) => `import "${file.split('.')[0]}"`),
  '',
].join('\n');

const src = fs.readFileSync('./Source/main.lua', { encoding: 'utf8' });
const nextSrc = [intro, src].join('\n');
fs.writeFileSync('./Source/main.lua', nextSrc, { encoding: 'utf8' });
