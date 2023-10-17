import { ViewProps } from '@tweakpane/core';
import { MarkedOptions } from "marked";
import katex from 'katex';

export interface Config {
	border: boolean;
	content: string;
	latex: boolean;
	latexSettings: object;
	markdown: boolean;
	markdownSettings: MarkedOptions;
	viewProps: ViewProps;
}