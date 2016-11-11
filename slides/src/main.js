// CSS imports
import './css/main.scss';

// JS imports
import './js/config.js';

// Conditionally add print stylesheets
if (window.location.search.match( /print-pdf/gi )) {
  require('style!css!../node_modules/reveal.js/css/print/pdf.css');
} else {
  require('style!css!../node_modules/reveal.js/css/print/paper.css');
  require('./css/print.scss');
}
