const markdown = require('./index');

test('external link', () => {
  expect(markdown('Click [here](https://bing.com/) to open in new window.')).toMatchInlineSnapshot(`
    "<p>Click <a href=\\"https://bing.com/\\" target=\\"_blank\\" rel=\\"noopener noreferrer\\" title=\\"Opens in a new window, external.\\">here <img src=\\"https://upload.wikimedia.org/wikipedia/commons/e/e8/Microsoft_Bing_logo.svg\\" alt=\\"Bing\\" /></a> to open in new window.</p>
    "
  `);
});
