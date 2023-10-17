import {ClassName, View} from '@tweakpane/core';

import katex from 'katex';

import { Marked, marked } from "marked";
import markedCodeFormat from 'marked-code-format';
import markedKatex from "marked-katex-extension";
// import markedFootnote from 'marked-footnote';
// import {markedEmoji} from "marked-emoji";
// import {Octokit} from "@octokit/rest";
// const octokit = new Octokit();

import { Config } from './common';

// Create a class name generator from the view name
// ClassName('tmp') will generate a CSS class name like `tp-tmpv`
const className = ClassName('indu');
const classNameBorder = ClassName('indub');

export class LatexView implements View {
	public readonly element: HTMLElement;

	constructor(doc: Document, config: Config) {
		this.element = doc.createElement('div');
		this.element.classList.add(className());
		if (config.border) {
			this.element.classList.add(classNameBorder());
		}
		config.viewProps.bindClassModifiers(this.element);

		const contentElem = doc.createElement('div');
		contentElem.classList.add(className('t'));

		// markdown is latex + markdown
		if (config.markdown) {
			const html = new Marked()
				// add extensions here if you want in the future
				.use(markedKatex({ output: "mathml", ...config.latexSettings }))
				.parse(config.content, {
					gfm: true,
					breaks: true,
					...config.markdownSettings
				})

			if (typeof html === "string") {
				contentElem.innerHTML = html;
			} else {
				html.then(str => contentElem.innerHTML = str);
			}
		} else if (config.latex) {
			contentElem.innerHTML = katex.renderToString(config.content, {
				displayMode: true,
				output: "mathml",
				...config.latexSettings
			})
		} else {
			contentElem.textContent = config.content;
		}
		this.element.appendChild(contentElem);
	}
}
