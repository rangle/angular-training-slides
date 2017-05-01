require('script!reveal.js/lib/js/head.min.js');
require('script!reveal.js/js/reveal.js');

require('script!reveal.js/lib/js/classList');
require('script!reveal.js/plugin/markdown/marked');
require('script!reveal.js/plugin/markdown/markdown');

window.Reveal.initialize({
  center: false,
  controls: true,
  history: true,
  previewLinks: true,
  width: '100%',
  height: '100%',
  margin: 0.05,
  slideNumber: true,
});

require.ensure([], function() {
  require('script!reveal.js/plugin/highlight/highlight.js');
  window.hljs.initHighlightingOnLoad();

  require('script!reveal.js/plugin/zoom-js/zoom.js');
  require('script!reveal.js/plugin/notes/notes.js');
});
