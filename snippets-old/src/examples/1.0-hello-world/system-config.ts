// SystemJS configuration file, see links for more information
// https://github.com/systemjs/systemjs
// https://github.com/systemjs/systemjs/blob/master/docs/config-api.md


declare var System: any;

(function () {
  /***********************************************************************************************
   * User Configuration.
   **********************************************************************************************/
  /** Map relative paths to URLs. */
  const map: any = {
  };

  /** User packages configuration. */
  const packages: any = {
    'rxjs'                             : {main: 'Rx'},
    '@angular/core'                    : {main: 'bundles/core.umd.min.js'},
    '@angular/common'                  : {main: 'bundles/common.umd.min.js'},
    '@angular/compiler'                : {main: 'bundles/compiler.umd.min.js'},
    '@angular/forms'                   : {main: 'bundles/forms.umd.min.js'},
    '@angular/http'                    : {main: 'bundles/http.umd.min.js'},
    '@angular/platform-browser'        : {main: 'bundles/platform-browser.umd.min.js'},
    '@angular/platform-browser-dynamic': {main: 'bundles/platform-browser-dynamic.umd.min.js'},
    '@angular/router'                  : {main: 'bundles/router.umd.min.js'},
  };

  ////////////////////////////////////////////////////////////////////////////////////////////////
  /***********************************************************************************************
   * Everything underneath this line is managed by the CLI.
   **********************************************************************************************/
  const barrels: string[] = [
    // App specific barrels.
    '../../app',
    'examples',
    'code'
    /** @cli-barrel */
  ];

  const cliSystemConfigPackages: any = {};
  barrels.forEach((barrelName: string) => {
    cliSystemConfigPackages[barrelName] = { main: 'index' };
  });

  /** Type declaration for ambient System. */
  System.config({
    map: {
      '@angular': '/vendor/@angular',
      'rxjs': '/vendor/rxjs',
      'main': './main.js',
    },
    packages: cliSystemConfigPackages
  });

  // Apply the user's configuration.
  System.config({ map, packages });
}());
