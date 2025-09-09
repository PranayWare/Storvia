import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('package.json', 'utf-8'));

const dependencies = pkg.dependencies ? Object.keys(pkg.dependencies) : [];
const devDependencies = pkg.devDependencies ? Object.keys(pkg.devDependencies) : [];

const allDeps = [...dependencies, ...devDependencies];

console.log('Dependencies in package.json:\n');
allDeps.forEach(dep => console.log(dep));

console.log(`\nTotal dependencies: ${allDeps.length}`);

console.log('\nYou can install them all with:');
console.log(`npm install ${allDeps.join(' ')}`);

