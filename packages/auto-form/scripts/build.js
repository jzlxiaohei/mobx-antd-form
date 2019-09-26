const { rollup } = require('rollup');
const resolvePlugin = require('rollup-plugin-node-resolve');
const filesizePlugin = require('rollup-plugin-filesize');
const replacePlugin = require('rollup-plugin-replace');
const terserPlugin = require('rollup-plugin-terser').terser;
const commonjs = require('rollup-plugin-commonjs');
const pkg = require('../package.json');

const fs = require('fs-extra');
const path = require('path');
const ts = require('typescript');

fs.removeSync('lib');
fs.removeSync('.build.es5');
fs.removeSync('.build.es6');

const externals = Object.keys(pkg.peerDependencies);
console.log(`external: `, externals);

const libName = `auto-antd-form`;

function runTypeScriptBuild(outDir, target, declarations) {
  console.log(
    `Running typescript build (target: ${ts.ScriptTarget[target]}) in ${outDir}/`,
  );

  const tsConfig = path.resolve('tsconfig.json');
  const json = ts.parseConfigFileTextToJson(
    tsConfig,
    ts.sys.readFile(tsConfig),
    true,
  );

  const { options } = ts.parseJsonConfigFileContent(
    json.config,
    ts.sys,
    path.dirname(tsConfig),
  );

  options.target = target;
  options.outDir = outDir;
  options.declaration = declarations;

  options.module = ts.ModuleKind.ES2015;
  options.importHelpers = true;
  options.noEmitHelpers = true;
  options.noEmit = false;
  if (declarations) options.declarationDir = path.resolve('.', 'lib');

  const rootFile = path.resolve('src', 'index.ts');
  const host = ts.createCompilerHost(options, true);
  const prog = ts.createProgram([rootFile], options, host);
  prog.emit();
}

async function generateBundledModule(
  inputFile,
  outputFile,
  format,
  production,
) {
  console.log(`Generating ${outputFile} bundle.`);
  console.log(inputFile);
  let plugins = [
    resolvePlugin(),
    commonjs({
      include: /node_modules/,
    }),
    filesizePlugin(),
  ];
  if (production) {
    plugins = plugins.concat([
      replacePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      terserPlugin(),
    ]);
  }

  const bundle = await rollup({
    input: inputFile,
    plugins,
    external: externals,
  });

  await bundle.write({
    file: outputFile,
    format,
    banner: '/** (c) jzl - MIT Licensed */',
    exports: 'named',
    name: format === 'umd' ? 'AutoAntdForm' : undefined,
  });

  console.log(`Generation of ${outputFile} bundle finished.`);
}

async function build() {
  runTypeScriptBuild('.build.es5', ts.ScriptTarget.ES5, true);
  runTypeScriptBuild('.build.es6', ts.ScriptTarget.ES2015, false);

  const es5Build = path.join('.build.es5', 'index.js');
  const es6Build = path.join('.build.es6', 'index.js');

  await Promise.all([
    generateBundledModule(
      es5Build,
      path.join('lib', `${libName}.js`),
      'cjs',
      false,
    ),
    generateBundledModule(
      es5Build,
      path.join('lib', `${libName}.min.js`),
      'cjs',
      true,
    ),

    generateBundledModule(
      es5Build,
      path.join('lib', `${libName}.module.js`),
      'es',
      false,
    ),

    generateBundledModule(
      es6Build,
      path.join('lib', `${libName}.es6.js`),
      'es',
      false,
    ),

    generateBundledModule(
      es5Build,
      path.join('lib', `${libName}.umd.js`),
      'umd',
      false,
    ),
    generateBundledModule(
      es5Build,
      path.join('lib', `${libName}.umd.min.js`),
      'umd',
      true,
    ),
  ]);
}

build().catch(e => {
  console.error(e);
  if (e.frame) {
    console.error(e.frame);
  }
  process.exit(1);
});
