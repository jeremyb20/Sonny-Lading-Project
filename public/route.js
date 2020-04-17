(() => {
  // Se utiliza el modo estricto de JavaScript introducido en el ES5
  'use strict';
  // Por medio de una creacion de un modulo cuyo nombre es "appRoutes" se inyectan las dependencias de ui-roter, oc-lazyLoad y angular css
  angular
  .module('appRoutes', ['ui.router','oc.lazyLoad','angularCSS'])
  // asi mismo se configura el routing de la aplicacion
  .config(routing);

  // Se inyectan los stateProvider y urlRouterProvider quienes se encargan de cambiar las vistas con sus respectivos controladores y hojas de  estlos
  routing.$inject = ['$stateProvider', '$urlRouterProvider'];

  // Se crea la funcion routing (se debe llamar igual que el que está dentro del config)
  function routing($stateProvider, $urlRouterProvider, $ocLazyLoad){

    $stateProvider

    // se configran todos los estados (vistas) por medio del atrubuto .state que es una funcion dentro del stateProvider
    .state('landing', {
      // Se le crea un url (por el cual se va a accesar a el medio de la ruta en el navegador)
      url: '/',
      // Se convoca al html
      templateUrl: './components/landing-page/landing-page.view.html',
      // se convica el css
      css: './components/landing-page/landing-page.style.css'
    })

    .state('landingone', {
      // Se le crea un url (por el cual se va a accesar a el medio de la ruta en el navegador)
      url: '/landingone',
      // Se convoca al html
      templateUrl: './components/landingone/landingone.view.html',
      // se convoca el controlador
      resolve: {
        load: ['$ocLazyLoad', ($ocLazyLoad) => {
          return $ocLazyLoad.load('./components/landingone/landingone.controller.js')
        }]
      },
      // se convica el css
      css: './components/landingone/landingone.styles.css',
      controller: 'landingoneController',
		  controllerAs: 'vm'
    })

    .state('landingtwo', {
      // Se le crea un url (por el cual se va a accesar a el medio de la ruta en el navegador)
      url: '/landingtwo',
      // Se convoca al html
      templateUrl: './components/landingtwo/landingtwo.view.html',
      // se convoca el controlador
      resolve: {
        load: ['$ocLazyLoad', ($ocLazyLoad) => {
          return $ocLazyLoad.load('./components/landingtwo/landingtwo.controller.js')
        }]
      },
      // se convica el css
      css: './components/landingtwo/landingtwo.styles.css',
      controller: 'landingtwoController',
		  controllerAs: 'vm'
    })

    .state('landingtree', {
      // Se le crea un url (por el cual se va a accesar a el medio de la ruta en el navegador)
      url: '/landingtree',
      // Se convoca al html
      templateUrl: './components/landingtree/landingtree.view.html',
      // se convoca el controlador
      resolve: {
        load: ['$ocLazyLoad', ($ocLazyLoad) => {
          return $ocLazyLoad.load('./components/landingtree/landingtree.controller.js')
        }]
      },
      // se convica el css
      css: './components/landingtree/landingtree.view.scss',
      controller: 'landingtreeController',
		  controllerAs: 'vm'
    })

    $urlRouterProvider.otherwise('/');// cargar por defecto el landing page
  }
//oclazyload recarga todas los controladores
})();