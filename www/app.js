// Place 3rd-party dependencies in lib, our code in ../app
// The easiest approach from the requirejs perspective is
// to rename the 3rd-party files to match the method names.
// This makes r.js optimization very simple.
requirejs.config({
    baseUrl: 'lib',
    waitSeconds: 200,
    paths: {
      app: '../app'
    },
// non-AMD modules, including CommonJS modules, need to be shimmed.
    shim: {
                                 en: ['jqgrid'], // forget i18n for now 
                      themeswitcher: ['jquery'],
			     jqgrid: ['jquery'],
//			     jsgrid: ['jquery'],
                  jquerymultiselect: ['jquery'],
            jquerymultiselectfilter: ['jquery']
    },
    wrapShim:true,
    fileExclusionRegExp: /^index-dev.cfm|^out|^.gitignore|^appsettings_sample.cfc|^tests.cfm|^appstop.cfm/,
    keepBuildDir: true,
    removeCombined:true,
    uglify2: {
      output: {
        beautify: true
      },
      compress: {
        sequences: false,
	global_defs: {
	  DEBUG: false
	}
      },
      warnings: true,
      mangle: true
    }
});
// Load the main app file. 
// Our application logic in app/main.js.
requirejs(['jquery', 'jqueryui', 'jqgrid'], function() {
	requirejs(['app/main']);
});
