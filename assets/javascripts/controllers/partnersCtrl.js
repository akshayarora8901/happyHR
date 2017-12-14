'use strict';

angular.module( 'happyHrApp' ).controller( 'PartnersCtrl', 
	['$scope', 'JobService',
	function( $scope, JobService) 
{
  $scope.$parent.pageHeading = "Referral partners";
  $scope.$parent.pageDetails = "Our happy partners provide their clients with a HR solution they can count on.";
	JobService.getPartnersList().get(function(partnersData) {
    if(partnersData.data){
    	$scope.stateList = partnersData.data.stateList;
    	$scope.partners = partnersData.data.partnerData;
    }
  });
  $scope.setPartnerData = function(partner) {
    $scope.selectedPartner = partner;
  }
}]);
