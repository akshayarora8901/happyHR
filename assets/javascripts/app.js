'use strict';

// Main module of the application.

angular.module( 'happyHrApp', 
  [
    'ngRoute',
    'ngResource',
    'ngFileUpload'
  ]
)
.service('API',
  [
  function () {
      this.url = function () {
          return "http://happyhrapi.n1.iworklab.com/public/api/";
      };
  }])
.constant('IntegrationConstants', {
  templatePath : false ? '' : 'assets/templates/'
})
.config( ['$routeProvider', 'IntegrationConstants', '$injector',
  function( $routeProvider, IntegrationConstants, $injector ) {
  $routeProvider.when( '/find-jobs', { templateUrl: IntegrationConstants.templatePath + 'find-jobs.html', controller: 'FindJobsCtrl', title: "Find Jobs" } );
  $routeProvider.when( '/find-jobs/:advId', { templateUrl: IntegrationConstants.templatePath + 'job-details.html', controller: 'JobDetailsCtrl', title: "Job Details" } );
  $routeProvider.when( '/partners', { templateUrl: IntegrationConstants.templatePath + 'partners.html', controller: 'PartnersCtrl', title: "Partners" } );
  $routeProvider.when( '/faq', { templateUrl: IntegrationConstants.templatePath + 'faq.html', controller: 'FaqCtrl', title: "Faq" } );
  $routeProvider.otherwise( { redirectTo: '/find-jobs' } );
}]);