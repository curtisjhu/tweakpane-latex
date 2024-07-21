import {
	BaseBladeParams,
	BladeApi,
	BladePlugin,
	createPlugin,
	MicroParsers,
	Parser,
	// ParamsParsers,
	// parseParams,
	parseRecord,
	ViewProps,
} from '@tweakpane/core';

import {LatexBladeParams} from './common';
import {LatexController} from './controller';

// NOTE: You can see JSDoc comments of `InputBindingPlugin` for details about each property
//
// `InputBindingPlugin<In, Ex, P>` means...
// - The plugin receives the bound value as `Ex`,
// - converts `Ex` into `In` and holds it
// - P is the type of the parsed parameters
//
export const TweakpaneLatexPlugin: BladePlugin<LatexBladeParams> = createPlugin(
	{
		id: 'latex',

		// type: The plugin type.
		// - 'input': Input binding
		// - 'monitor': Monitor binding
		type: 'blade',

		accept(params: Record<string, unknown>) {
			// Parse parameters object
			const r = parseRecord<LatexBladeParams>(params, (p) => ({
				view: p.required.constant('latex'),
				content: p.required.string,
				viewProps: p.optional.constant(ViewProps.prototype),
				border: p.optional.boolean,
				markdown: p.optional.boolean,
				latex: p.optional.boolean,
				latexSettings: p.optional.object({
					displayMode: p.optional.boolean,
					output: p.optional.string,
					leqno: p.optional.boolean,
					fleqn: p.optional.boolean,
					throwOnError: p.optional.boolean,
					errorColor: p.optional.string,
					macros: p.optional.object({}),
					minRuleThickness: p.optional.number,
					colorIsTextColor: p.optional.boolean,
					maxSize: p.optional.number,
					maxExpand: p.optional.number,
					strict: p.optional.boolean, // only boolean
					trust: p.optional.boolean, // only boolean
					globalGroup: p.optional.boolean,
				}),
				markdownSettings: p.optional.object({
					async: p.optional.boolean,
					breaks: p.optional.boolean,
					gfm: p.optional.boolean,
					pedantic: p.optional.boolean,
					silent: p.optional.boolean,
					renderer: p.optional.object({}),
					tokenizer: p.optional.object({}),
					walkTokens: p.optional.function,
				}),
			}));
			return r ? {params: r} : null;
		},

		controller(args) {
			// Create a controller for the plugin
			return new LatexController(args.document, {
				view: args.params.view,
				viewProps: args.viewProps,
				border: args.params.border ?? false,
				content: args.params.content,
				latex: args.params.latex ?? false,
				markdown: args.params.markdown ?? false,
				latexSettings: args.params.latexSettings ?? {},
				markdownSettings: args.params.markdownSettings ?? {},
			});
		},

		api(args: any) {
			if (!(args.controller instanceof LatexController)) {
				return null;
			}
			return new BladeApi(args.controller);
		},
	},
);
