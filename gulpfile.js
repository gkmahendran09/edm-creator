var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

var jqueryPath = './node_modules/jquery/jquery.js';
var jqueryMigratePath = './node_modules/jquery-migrate/dist/jquery-migrate.min.js';
var bootstrapPath = './node_modules/bootstrap-sass/assets/javascripts/bootstrap.js';

elixir(function(mix) {
    mix.sass('app.scss', 'public/assets/css');
    mix.sass('builder.scss', 'public/assets/css');
    mix.scripts([jqueryPath, jqueryMigratePath, bootstrapPath, 'plugins/yawa.js', 'plugins/angular.min.js', 'app.js'],
      'public/assets/js/app.js');

    // mix.copy('node_modules/font-awesome/fonts', 'public/fonts');

    // Builder Gulp Tasks-----------------------------------------------

    mix.styles([
      "plugins/colorpicker.css"
    ],
    'public/assets/css/builder/plugins.css');

    mix.scripts([jqueryPath, jqueryMigratePath, bootstrapPath, 'plugins/angular.min.js', 'plugins/angular-sanitize.min.js'],
          'public/assets/js/builder/plugins.js');

    mix.scriptsIn("resources/assets/js/builder/components", "public/assets/js/builder/components.js");

    mix.scripts([
        "builder/appFilters.js",
        "builder/appController.js",
        "builder/app.js"
    ],
    'public/assets/js/builder/builder.js');

    mix.scripts([
        "plugins/bootstrap-colorpicker-module.js"
    ],
    'public/assets/js/builder/external-modules.js');

    mix.version([
      'assets/css/app.css', 'assets/js/app.js',
      'assets/css/builder.css', 'assets/css/builder/plugins.css', 'public/assets/js/builder/external-modules.js', 'assets/js/builder/plugins.js', 'assets/js/builder/components.js', 'assets/js/builder/builder.js'
    ]);
});
