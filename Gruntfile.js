module.exports = function (grunt) {
    'use strict';

    var setHtml2JsDefaultOptions = function (moduleTemplateNamespace) {
        return {
            rename: function (moduleName) {
                return '/' + moduleName;
            },
            base: '',
            module: moduleTemplateNamespace,
            useStrict: true,
            htmlmin: {
                collapseBooleanAttributes: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeComments: true,
                removeCommentsFromCDATA: true,
                removeEmptyAttributes: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                keepClosingSlash: true,
                caseSensitive: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            watch: true
        };
    };

    var path = require('path');

    grunt.initConfig({
        distDirectory: 'dist',
        distMainDirectory: '<%= distDirectory %>/src',
        cssDistDirectory: '<%= distDirectory %>/src/css',
        distLibs: '<%= distDirectory %>/libs',
        pkg: grunt.file.readJSON('package.json'),
        src: {
            js: ['<%= pkg.sourceDir %>/src/**/*.js'],
            srcJs: ['<%= pkg.sourceDir %>/src/*.js'],
            html: ['<%= pkg.sourceDir %>/src/**/*.html'],
            indexHtml: ['index.html'],
            mainJs: ['main.js'],
            umaMainJs: ['<%= pkg.sourceDir %>/src/umaMain.js'],
            htmlPages: ['<%= pkg.sourceDir %>/src/pages/**/*.html'],
            libsJs: ['<%= pkg.sourceDir %>/src/libs/*.js'],
            serviceJs: ['<%= pkg.sourceDir %>/src/services/**/*.js'],
            apiProxiesJs: ['<%= pkg.sourceDir %>/src/apiProxies/**/*.js'],
            widgetsJs: ['<%= pkg.sourceDir %>/src/widgets/**/*.js'],
            cssDirectory: '<%= pkg.sourceDir %>/src/assets/css/*.css',
            lessMain: ['<%= pkg.sourceDir %>/src/less/uma_main.less'],
            lessVariables: ['<%= pkg.sourceDir %>/src/less/variables.less'],
            lessMixins: ['<%= pkg.sourceDir %>/src/less/mixins.less'],
            images: ['<%= pkg.sourceDir %>/src/assets/img/*.*'],
            loginJs: ['<%= pkg.sourceDir %>/src/login/*.js']
        },
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.name %> - <%= grunt.template.today("UTC:yyyy/mm/dd HH:MM:ss Z") %>\n' +
                '*/'
        },
        test: {
            karmaConfig: '<%= pkg.sourceDir %>/tests/config/karma.conf.js',
            unit: ['<%= pkg.sourceDir %>/tests/unit/**/*.js']
        },
        watch: {
            jshint: {
                files: ['<%= src.js %>', 'html', 'Gruntfile.js', 'mainJs', 'htmlPages'],
                tasks: ['jshint'],
                options: {
                    //spawn: false,
                    interrupt: true //,
                    //reload: false
                }
            },
            release: {
                files: ['<%= src.js %>', '<%= src.html %>', '<%= test.unit %>'],
                tasks: ['release'],
                options: {
                    spawn: false,
                    interrupt: true,
                    reload: false
                }
            }
        },
        clean: {
            appRelease: ['<%= distMainDirectory %>/src'],
            testResults: ['<%=pkg.sourceDir %>/tests/reports'],
            css: ['<%= cssDistDirectory %>']
        },
        html2js: {},
        copy: {
            indexHtml: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.indexHtml %>'],
                        dest: '<%= distMainDirectory %>'
                    }
                ]
            },
            login: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.loginJs %>'],
                        dest: '<%= distMainDirectory %>/src/login'
                    }
                ]
            },
            srcJs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.srcJs %>'],
                        dest: '<%= distMainDirectory %>/src/uma'
                    }
                ]
            },
            appCss: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.cssDirectory %>'],
                        dest: '<%= cssDistDirectory %>'
                    }
                ]
            },
            htmlPages: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.htmlPages %>'],
                        dest: '<%= distMainDirectory %>/pages'
                    }
                ]
            },
            libsJs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.libsJs %>'],
                        dest: '<%= distMainDirectory %>/libs'
                    }
                ]
            },
            services: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.serviceJs %>'],
                        dest: '<%= distMainDirectory %>/src/services'
                    }
                ]
            },
            mainJs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.mainJs %>'],
                        dest: '<%= distMainDirectory %>'
                    }
                ]
            },
            mainJs: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.umaMainJs %>'],
                        dest: '<%= distMainDirectory %>'
                    }
                ]
            },
            images: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['<%= src.images %>'],
                        dest: '<%= distMainDirectory %>/img'
                    }
                ]
            },
            widgets: {}
        },
        requirejs: {
            compile: {
                options: {
                    optimize: "none",
                    logLevel: 0,
                    name: "app",
                    out: "dist/src/app.js",
                    baseUrl: "<%= distDirectory %>",
                    paths: {
                        'app': './src/src/uma/app',
                        'login': './src/src/login',
                        'route': './src/src/uma',
                        'angular': 'empty:',
                        'uiRouter': 'empty:',
                        'spin': 'empty:'
                    }
                }
            }
        },
        usebanner: {
            dist: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    src: [
                        '<%= distDirectory%>/src/*.js'
                    ]
                }
            },
            css: {
                options: {
                    banner: '<%= meta.banner %>'
                },
                files: {
                    src: [
                        '<%= cssDirectory %>/*.css'
                    ]
                }
            }
        },
        less: {
            options: {
                compress: false, // Choose ONLY 1: 'compress' OR 'cleancss'
                cleancss: false, // cleancss 2.2.16 currently removes CSS sourceMappingURL in minification [https://github.com/jakubpawlowicz/clean-css/issues/125, https://github.com/less/less.js/issues/1656]
                ieCompat: false, // default is 'true' for IE8 compat... sooooo we don't want it.
                report: 'min', // Either report only minification result or report minification and gzip results.
                optimization: 10, // Set the parser's optimization level. The lower the number, the less nodes it will create in the tree. This could matter for debugging, or if you want to access the individual nodes in the tree.
                sourceMap: true, // Enable source maps for .css & .min.css
                outputSourceFiles: true
            },
            compilecss_main: {
                // compile LESS to CSS and create LESS sourcemap
                files: {
                    '<%= cssDistDirectory %>/<%= pkg.cssname %>.css': '<%= src.lessMain %>'
                },
                options: {
                    // sourcemap for .css
                    sourceMapFilename: '<%= cssDistDirectory %>/<%= pkg.cssname %>.css.map', // where file is generated and located relative from gruntfile.js
                    sourceMapURL: '<%= pkg.cssname %>.css.map' // Override the default url, form 'sourceMapFilename:', that points to the source map from the compiled css file (relative or absolute URL).
                }
            },
            compilecss_variables: {
                // compile LESS to CSS and create LESS sourcemap
                files: {
                    '<%= cssDistDirectory %>/<%= pkg.cssname %>-variables.css': '<%= src.lessVariables %>'
                },
                options: {
                    sourceMap: false
                }
            },
            compilecss_mixins: {
                // compile LESS to CSS and create LESS sourcemap
                files: {
                    '<%= cssDistDirectory %>/<%= pkg.cssname %>-mixins.css': '<%= src.lessMixins %>'
                },
                options: {
                    sourceMap: false
                }
            },
            minifycss: {
                // minify CSS to '.min' file and create LESS sourcemap
                files: {
                    '<%= cssDistDirectory %>/<%= pkg.cssname %>.min.css': '<%= src.lessMain %>'
                },
                options: {
                    compress: true, // Choose ONLY 1: 'compress' OR 'cleancss'
                    // sourcemap for .min.css
                    sourceMapFilename: '<%= cssDistDirectory %>/<%= pkg.cssname %>.min.css.map', // where file is generated and located relative from gruntfile.js
                    sourceMapURL: '<%= pkg.cssname %>.min.css.map' // Override the default url, form 'sourceMapFilename:', that points to the source map from the compiled css file (relative or absolute URL).
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['watch:release', 'eslint', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        express: {
            server: {
                options: {
                    port: 9001,
                    hostname: "localhost",
                    server: path.resolve('./server.js'),
                    bases: [path.resolve('dist/src')],
                    debug: true
                }
            }
        },
        open: {
            server: {
                path: 'http://localhost:<%= express.server.options.port %>/'
            }
        }

    });

    grunt.registerTask('release', [
        'buildcss',
        'copyfiles',
        'html2JS',
        'requirejs',
        'usebanner:dist'//,
        //'clean:appRelease'
    ]);

    grunt.registerTask('buildcss', [
        'clean:css',
        'less',
        'usebanner:css'
    ]);

    grunt.registerTask('default', ['release']);

    grunt.registerTask('html2JS', []);

    grunt.registerTask('copyfiles', [
        'copy:login',
        'copy:indexHtml',
        'copy:srcJs',
        'copy:htmlPages',
        'copy:libsJs',
        'copy:services',
        'copy:appCss',
        'copy:images',
        'copy:mainJs',
    ]);

    grunt.registerTask('web-start', ['release', 'express:server', 'open:server', 'express-keepalive']);
    grunt.registerTask('dev', ['release', 'concurrent']);

    require('load-grunt-tasks')(grunt, { pattern: ['grunt-*', 'grunt*', '@*/grunt-*'] });
    require('time-grunt')(grunt);

};