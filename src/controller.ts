import {BladeController, createBlade } from '@tweakpane/core';
import { Config } from "./common"

import {LatexView} from './view';

// Custom controller class should implement `Controller` interface
export class LatexController extends BladeController<LatexView> {
	constructor(doc: Document, config: Config) {
		super({
			blade: createBlade(),
			view: new LatexView(doc, config),
			viewProps: config.viewProps,
		});
	}
}
