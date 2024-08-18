import path from 'node:path';
import fsP from 'node:fs/promises';
import { metaHelper } from '@sweet-milktea/utils';

const { __dirname } = metaHelper(import.meta.url);

const nodeModules = path.join(__dirname, 'node_modules');

/* 修复rc-util */
async function fixRcUtil() {
  const rcUtilPath = path.join(nodeModules, 'rc-util/es/React/render.js');
  const file = await fsP.readFile(rcUtilPath, { encoding: 'utf8' });

  if (file.includes('/* rc-util fixed */')) return;

  const newFile = file.replace("import * as ReactDOM from 'react-dom';", `import * as ReactDOM from 'react-dom';
import * as ReactDOMClient from 'react-dom/client';`)
    .replace('var fullClone = _objectSpread({}, ReactDOM);', 'var fullClone = _objectSpread({}, ReactDOM, ReactDOMClient);')
    .replace('reactRender(node, container);', '/* rc-util fixed */ try { reactRender(node, container); } catch {}');

  await fsP.writeFile(rcUtilPath, newFile, { encoding: 'utf8' });
}

/* 执行postinstall脚本 */
async function postInstall() {
  // 修复rc-util
  await fixRcUtil();
}

postInstall();