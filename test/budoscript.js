const { Pane } = require('tweakpane');
const TweakpaneLatexPlugin = require('../dist/tweakpane-latex');

const pane = new Pane({title: 'A bunch of Latex'});

// Register plugin
pane.registerPlugin(TweakpaneLatexPlugin);

pane.addBlade({
	view: 'latex',
	content: 'No parsing',
});
pane.addBlade({
	view: 'latex',
	content: 'No parsing + border',
	border: true,
});

const mathFolder = pane.addFolder({
	title: 'Latex',
});
mathFolder.addBlade({
	view: 'latex',
	content: '\\begin{equation} \\int e^{-x^2} dx \\end{equation}',
	latex: true,
});
mathFolder.addBlade({
	view: 'latex',
	content: '\\int 2x e^{x^2} dx',
	latex: true,
});

const markedExample = pane.addFolder({
	title: 'Markdown (includes some latex)',
});
markedExample.addBlade({
	view: 'latex',
	content: `
# Header

$$\\int x^2 dx$$

[a link](http://www.google.com).

* One
* Two

## Subhead

**bold**, *italics*

More text with \` print('hello') \` inline code.

---
\`\`\`
npm run start
\`\`\`
---
> References: [katex](https://katex.org/docs/node)
`,
	markdown: true,
});
