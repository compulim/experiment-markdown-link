/* eslint no-magic-numbers: ["error", { "ignore": [1] }] */

const iterator = require('markdown-it-for-inline');
const MarkdownIt = require('markdown-it');

// New code
const internalMarkdownIt = new MarkdownIt();

const customMarkdownIt = new MarkdownIt({
  breaks: false,
  html: false,
  linkify: true,
  typographer: true,
  xhtmlOut: true
}).use(iterator, 'url_new_win', 'link_open', (tokens, index) => {
  const targetAttrIndex = tokens[index].attrIndex('target');

  if (~targetAttrIndex) {
    tokens[index].attrs[targetAttrIndex][1] = '_blank';
  } else {
    tokens[index].attrPush(['target', '_blank']);
  }

  const relAttrIndex = tokens[index].attrIndex('rel');

  if (~relAttrIndex) {
    tokens[index].attrs[relAttrIndex][1] = 'noopener noreferrer';
  } else {
    tokens[index].attrPush(['rel', 'noopener noreferrer']);
  }

  // New code: title
  const OPEN_EXTERNAL_WINDOW_TEXT = 'Opens in a new window, external.';

  const titleAttrIndex = tokens[index].attrIndex('title');

  if (~titleAttrIndex) {
    tokens[index].attrs[titleAttrIndex][1] = OPEN_EXTERNAL_WINDOW_TEXT;
  } else {
    tokens[index].attrPush(['title', OPEN_EXTERNAL_WINDOW_TEXT]);
  }

  // New code: add icon
  tokens.splice(
    index + 2,
    0,
    ...internalMarkdownIt.parseInline(' ![Bing](https://upload.wikimedia.org/wikipedia/commons/e/e8/Microsoft_Bing_logo.svg)')[0].children
  );
});

module.exports = function render(markdown, { markdownRespectCRLF } = {}) {
  if (markdownRespectCRLF) {
    markdown = markdown.replace(/\n\r|\r\n/gu, carriageReturn => (carriageReturn === '\n\r' ? '\r\n' : '\n\r'));
  }

  return customMarkdownIt.render(markdown);
};
