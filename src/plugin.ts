import {
	BaseBladeParams,
	BladeApi,
	BladePlugin,
	ParamsParsers,
	parseParams,
} from '@tweakpane/core';

import {LatexController} from './controller';
import { Config } from "./common";

import { MarkedOptions } from "marked";
import katex from 'katex';

export interface LatexBladeParams extends BaseBladeParams, Config {
	view: 'latex';
}

// NOTE: You can see JSDoc comments of `InputBindingPlugin` for details about each property
//
// `InputBindingPlugin<In, Ex, P>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
// - P is the type of the parsed parameters
//
export const TweakpaneLatexPlugin: BladePlugin<LatexBladeParams> = {
	id: 'latex',

	// type: The plugin type.
	// - 'input': Input binding
	// - 'monitor': Monitor binding
	type: 'blade',

	// This plugin template injects a compiled CSS by @rollup/plugin-replace
	// See rollup.config.js for details
	css: '__css__',

	accept(params: any) {
		// Parse parameters object
		const p = ParamsParsers;
		const r = parseParams(params, {
			border: p.optional.boolean,
			content: p.required.string,
			markdown: p.optional.boolean,
			latex: p.optional.boolean,
			latexSettings: p.optional.object(katex.SETTINGS_SCHEMA), // little sketchy
			markdownSettings: p.optional.object({}), // little sketchy
			view: p.required.constant('latex'),
		});
		return r ? {params: r} : null;
	},

	controller(args: any) {
		// Create a controller for the plugin
		return new LatexController(args.document, {
			border: args.params.border ?? false,
			content: args.params.content,
			latex: args.params.latex ?? false,
			markdown: args.params.markdown ?? false,
			latexSettings: args.params.latexSettings ?? {},
			markdownSettings: args.params.markdownSettings ?? {},
			viewProps: args.viewProps,
		});
	},

	api(args: any) {
		if (!(args.controller instanceof LatexController)) {
			return null;
		}
		return new BladeApi(args.controller);
	},
};
