// CSS imports
import './css/main.scss';

// JS imports
import './js/config.js';

// Conditionally add print stylesheets
var printStylesheet = window.location.search.match( /print-pdf/gi ) ? 'pdf.scss' : 'paper.scss';
require('./css/print/' + printStylesheet);
