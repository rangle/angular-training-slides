# Reveal.js with Webpack

Slides created with [Reveal.js](https://github.com/hakimel/reveal.js/) and build system created with Webpack 2.

To install the dependencies and start the web server:

```
$ npm install
$ npm start
```

To see the slides go to: [localhost:8081](http://localhost:8081)

## Generating a PDF

First, install PhantomJS globally:

```
$ npm install phantomjs -g
```

Then, in the slides directory, start the server and run the `pdf` command:

```
$ npm start
$ npm run pdf
```
