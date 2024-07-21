import {TpPlugin} from '@tweakpane/core';

import {TweakpaneLatexPlugin} from './plugin';

export const id = 'latex';
export const css = '__css__';
export const plugins: TpPlugin[] = [
	TweakpaneLatexPlugin
];
