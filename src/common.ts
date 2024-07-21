import { BaseBladeParams, ViewProps } from '@tweakpane/core';

export interface LatexBladeParams extends BaseBladeParams {
	view: 'latex';
	content: string;
	viewProps: ViewProps;
	border?: boolean;
	latex?: boolean;
	latexSettings?: object;
	markdown?: boolean;
	markdownSettings?: object;
}