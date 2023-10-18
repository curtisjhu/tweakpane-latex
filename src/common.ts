import { ViewProps } from '@tweakpane/core';

export interface Config {
	border: boolean;
	content: string;
	latex: boolean;
	latexSettings: object;
	markdown: boolean;
	markdownSettings: object;
	viewProps: ViewProps;
}