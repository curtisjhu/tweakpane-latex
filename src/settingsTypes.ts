
// These are in typescript which are used for reference, but no the shape we want them.
// import { MarkedOptions } from "marked";
// import { KatexOptions } from 'katex';

import { ParamsParsers } from "@tweakpane/core";

const p = ParamsParsers;

/**
 * Please note, these are handconfigured. 
 * There is no way to iterate types in typescript so this is a compromise.
 * May be deprecated at some point
 */
export const latexSettingsConfig = {
	displayMode: p.optional.boolean,
    output: p.optional.string,
    leqno: p.optional.boolean,
    fleqn: p.optional.boolean,
    throwOnError: p.optional.boolean,
    errorColor: p.optional.string,
    macros: p.optional.object({
		
	}),
    minRuleThickness: p.optional.number,
    colorIsTextColor: p.optional.boolean,
    maxSize: p.optional.number,
    maxExpand: p.optional.number,
    strict: p.optional.boolean, // only boolean
    trust: p.optional.boolean, // only boolean
    globalGroup: p.optional.boolean
}


/**
 * TODO test this more. I don't think I'll ever really use this though
 */
export const markedSettingsConfig = {
	async: p.optional.boolean,
	breaks: p.optional.boolean,
	gfm: p.optional.boolean,
	pedantic: p.optional.boolean,
	silent: p.optional.boolean,
	renderer: p.optional.object({}),
    tokenizer: p.optional.object({}),
    walkTokens: p.optional.function,
}