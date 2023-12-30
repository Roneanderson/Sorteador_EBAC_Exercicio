module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'), /*inicio das configuração dos plugins*/
        less: {
            developement: {
                files: {
                    'dev/styles/main.css': 'src/styles/main.less'  /*dev/styles/main.min.css arquivo de saida // src/styles/main.less arquivo de origem*/
                }
            },
            production: {
                options: {
                    compress: true,
                },
                files: {
                    'dist/styles/main.min.css': 'src/styles/main.less' /*dist/styles/main.min.css arquivo de saida // src/styles/main.less arquivo de origem*/
                }
            }
        },
        watch: {
            less: {
                files: ['src/styles/**/*.less'],
                tasks: ['less:developement']
            },
            html: {
                files: ['src/index.html'],
                tasks: ['replace:dev']
            }
        },
        replace: {
            dev: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: '../src/scripts/main.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/index.html'],
                        dest: 'dev/'
                    }
                ]
            },
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'ENDERECO_DO_CSS',
                            replacement: './styles/main.min.css'
                        },
                        {
                            match: 'ENDERECO_DO_JS',
                            replacement: './scripts/main.min.js'
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['prebuild/index.html'],
                        dest: 'dist/'
                    }
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: {
                    'prebuild/index.html': 'src/index.html'
                }
            }
        },
        clean: ['prebuild'],
        uglify: {
            target: {
                files:{
                    'dist/scripts/main.min.js': 'src/scripts/main.js'
                }
            }
        }

    })  /*Final das configuração dos plugins*/


    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch'); /* plugin para obersevar as mudanças no arquivo main.less*/
    grunt.loadNpmTasks('grunt-replace'); /* aponta para o index.html para pode roda na plataforma vercel em produção*/
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['watch']) /* ambiente de produção local maquina*/
    grunt.registerTask('build', ['less:production','htmlmin:dist', 'replace:dist', 'clean', 'uglify']) /* build ambiente de produção exemplo vercel */
}

