import { accessSync, constants, readFileSync } from 'node:fs';
import { join } from 'node:path';

const required = ['index.html', 'styles.css', 'src/saas.js', 'src/saas-core.js', 'src/saas-app.js'];
for (const file of required) accessSync(join(process.cwd(), file), constants.R_OK);
const html = readFileSync('index.html', 'utf8');
if (!html.includes('./src/saas-app.js')) throw new Error('SaaS app script is not wired into index.html');
const css = readFileSync('styles.css', 'utf8');
if (!css.includes('.saas-console')) throw new Error('SaaS console styles are missing');
