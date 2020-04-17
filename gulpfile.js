 // Se inyecta el modo estricto de EcmaScript, que elimina los errores comunes de JS
'use strict';

// Se inyectan las dependenciasdentro del archivo
const gulp = require('gulp');
const connect = require('gulp-connect');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// Se crea una tarea que conecta el servidor, con la ruta que va a conectar
gulp.task('connect', () => {
  connect.server({
    root:'public',
    port: 8000,
    livereload: true
  });
});

// Se crea una tarea que trae todas las dependencias desde los node_modules hasta la carpeta lib dentro de public
gulp.task('dependencies', () => {

  // Trae bootstarp desde las dependencias y lo copia dentro de public para poder ser utilizado por el front-end
  gulp.src([
    './node_modules/bootstrap/dist/js/bootstrap.min.js',
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ])
  .pipe(gulp.dest('./public/lib/bootstrap'));

  // Trae angular, jquery y popper desde las dependencias y lo copia dentro de public para poder ser utilizado por el front-end
  gulp.src([
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/popper.js/dist/umd/popper.min.js',
    './node_modules/sweetalert/dist/sweetalert.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/angular-material/angular-material.min.js',
    './node_modules/angular-material/angular-material.min.css',
    './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    './node_modules/angular-css/angular-css.min.js',
    './node_modules/oclazyload/dist/ocLazyLoad.min.js',
    'node_modules/angular-ui-router-styles/test/ui-router-styles.js'
  ])
  .pipe(gulp.dest('./public/lib/'));
});

// Tarea que recarga todos los html
gulp.task('html', () => {
  gulp.src('./public/components/**/*.html')
  .pipe(connect.reload())
  .pipe(browserSync.stream());
})

// Tarea que recarga todos los css
gulp.task('css', () => {
  gulp.src('./public/components/**/*.css')
  .pipe(connect.reload())
  .pipe(browserSync.stream());
})

gulp.task('scss', () => {
  gulp.src('./public/components/**/*.scss')
  .pipe(connect.reload())
  .pipe(browserSync.stream());
})

gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

// Tarea que recarga todos los js
gulp.task('js', () => {
gulp.src('./public/components/**/*.js')
  .pipe(connect.reload())
  .pipe(browserSync.stream());
})

// Tarea que vigila todos los cambios dentro de los archivos de html, css y js y llama a las tareas de recarga de cada uno
gulp.task('watch', () => {
  gulp.watch([
    './public/*.css',
    './public/components/*.css',
    './public/components/**/*.css',
    './public/components/**/**/*.css'
  ], ['css']);

  gulp.watch([
    './public/*.scss',
    './public/components/*.scss',
    './public/components/**/*.scss',
    './public/components/**/**/*.scss'
  ], ['scss']);

  gulp.watch([
    './public/*.js',
    './public/components/*.js',
    './public/components/**/*.js',
    './public/components/**/**/*.js',
  ], ['js']);

  gulp.watch([
    './public/*.html',
    './public/components/*.html',
    './public/components/**/*.html',
    './public/components/**/**/*.html'
  ], ['html']);
});

// Tarea global que llama todas las tareas
//lo que hace esta funcion es llamar todas las dpecncias y conectarlas a la misma red de wifi
gulp.task('default', ['connect','dependencies','html','scss', 'css','js','watch'],()=>{
  browserSync.init({
    server: './public'
  })
});