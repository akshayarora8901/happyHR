'use strict';

angular.module( 'happyHrApp' ).controller( 'JobDetailsCtrl', 
	['$scope', 'IntegrationConstants', '$routeParams', 'JobService',
	function( $scope, IntegrationConstants, $routeParams, JobService) 
{
	var searchOptions = {
		'advertisementID': $routeParams.advId
	};
	JobService.getSearchJobResults().query({ options: JSON.stringify(searchOptions) }, function(data) {
    $scope.jobDetails = data && data.length ? data[0] : {};
  });
}]);
