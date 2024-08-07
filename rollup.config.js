import Alias from '@rollup/plugin-alias';
import {nodeResolve} from '@rollup/plugin-node-resolve';
import Replace from '@rollup/plugin-replace';
import Typescript from '@rollup/plugin-typescript';
import Autoprefixer from 'autoprefixer';
import Postcss from 'postcss';
import Cleanup from 'rollup-plugin-cleanup';
import {terser as Terser} from 'rollup-plugin-terser';
import Sass from 'sass';
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';

import Package from './package.json';

async function compileCss() {
	const css = Sass.renderSync({
		file: 'src/sass/plugin.scss',
		outputStyle: 'compressed',
	}).css.toString();

	const result = await Postcss([Autoprefixer]).process(css, {
		from: undefined,
	});
	return result.css.replace(/'/g, "\\'").trim();
}

function getPlugins(css, shouldMinify) {
	const plugins = [
		commonjs(),
		// some es2022 stuff in marked.js that we need to change to es6
		babel({ 
			babelHelpers: 'bundled',
			include: "./node_modules/marked/**",
			plugins: [
				"@babel/plugin-transform-private-property-in-object",
				"@babel/plugin-transform-private-methods"
			]
		}),
		// Use ES6 source files to avoid CommonJS transpiling
		// ES6 is already browser ready. Commonjs -> ES6 is unnecessary and messy
		Alias({
			entries: [
				{
					find: '@tweakpane/core',
					replacement: './node_modules/@tweakpane/core/dist/index.js',
				},
				{
					find: 'katex',
					replacement: './node_modules/katex/dist/katex.mjs',
				}
			],
		}),
		Typescript({
			tsconfig: 'src/tsconfig.json',
		}),
		nodeResolve(),
		Replace({
			__css__: css,
			preventAssignment: false,
		}),
	];
	if (shouldMinify) {
		plugins.push(Terser());
	}
	return [
		...plugins,
		// https://github.com/microsoft/tslib/issues/47
		Cleanup({
			comments: 'none',
		}),
	];
}

function getDistName(packageName) {
	// `@tweakpane/plugin-foobar` -> `tweakpane-plugin-foobar`
	// `tweakpane-plugin-foobar`  -> `tweakpane-plugin-foobar`
	return packageName
		.split(/[@/-]/)
		.reduce((comps, comp) => (comp !== '' ? [...comps, comp] : comps), [])
		.join('-');
}

function getUmdName(packageName) {
	// `@tweakpane/plugin-foobar` -> `TweakpaneFoobarPlugin`
	// `tweakpane-plugin-foobar`  -> `TweakpaneFoobarPlugin`
	return (
		packageName
			.split(/[@/-]/)
			.map((comp) =>
				comp !== 'plugin' ? comp.charAt(0).toUpperCase() + comp.slice(1) : '',
			)
			.join('') + 'Plugin'
	);
}

export default async () => {
	const production = process.env.BUILD === 'production';
	const postfix = production ? '.min' : '';

	const distName = getDistName(Package.name);
	const css = await compileCss();
	return {
		input: 'src/index.ts',
		external: ['tweakpane'],
		output: [
			{
				file: `dist/${distName}${postfix}.mjs`,
				format: 'esm',
				globals: {
					tweakpane: 'Tweakpane',
				},
				name: getUmdName(Package.name),
			},
			{
				file: `dist/${distName}${postfix}.cjs`,
				format: 'cjs',
				globals: {
					tweakpane: 'Tweakpane',
				},
				name: getUmdName(Package.name),
			},
			{
				file: `dist/${distName}${postfix}.js`,
				format: 'umd',
				globals: {
					tweakpane: 'Tweakpane',
				},
				name: getUmdName(Package.name),
			}
		],
		plugins: getPlugins(css, production),

		// Suppress `Circular dependency` warning
		onwarn(warning, rollupWarn) {
			if (warning.code === 'CIRCULAR_DEPENDENCY') {
				return;
			}
			rollupWarn(warning);
		},
	};
};
