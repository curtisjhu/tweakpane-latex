import {Blade, BladeController, createBlade, ViewProps} from '@tweakpane/core';

import { LatexBladeParams } from "./common"
import {LatexView} from './view';

// Custom controller class should implement `Controller` interface
export class LatexController extends BladeController<LatexView> {

	constructor(doc: Document, config: LatexBladeParams) {
		super({
			blade: createBlade(),
			viewProps: config.viewProps,
			view: new LatexView(doc, config)
		});
	}
}
