import Reveal from 'reveal';

var libPath = '../node_modules/reveal.js/';

Reveal.initialize({
  center: false,
  controls: true,
  history: true,
  previewLinks: true,
  width: '100%',
  height: '100%',
  margin: 0.05,
  slideNumber: true,
  dependencies: [
    // Cross-browser shim that fully implements classList
    {
      src: libPath + 'lib/js/classList.js',
      condition: function() {
        return !document.body.classList;
      }
    },

    // Interpret Markdown in <section> elements
    {
      src: libPath + 'plugin/markdown/marked.js',
      condition: function() {
        return !!document.querySelector( '[data-markdown]' );
      }
    },

    {
      src: libPath + 'plugin/markdown/markdown.js',
      condition: function() {
        return !!document.querySelector( '[data-markdown]' );
      }
    },

    // Syntax highlight for <code> elements
    {
      src: libPath + 'plugin/highlight/highlight.js',
      async: true,
      callback: function() {
        hljs.initHighlightingOnLoad();
      }
    },

    // Zoom in and out with Alt+click
    { src: libPath + 'plugin/zoom-js/zoom.js', async: true },

    // Speaker notes
    { src: libPath + 'plugin/notes/notes.js', async: true }
  ]
});
