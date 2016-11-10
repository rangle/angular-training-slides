// CSS imports
import './css/main.scss';

// JS imports
import './js/config.js';

// Conditionally add print stylesheets
var link = document.createElement( 'link' );
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = window.location.search.match( /print-pdf/gi ) ? './css/print/pdf.css' : './css/print/paper.css';
document.getElementsByTagName( 'head' )[0].appendChild( link );
