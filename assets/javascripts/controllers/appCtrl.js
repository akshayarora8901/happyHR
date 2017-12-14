'use strict';

angular.module('happyHrApp').controller('AppCtrl', ['$scope', 'Upload', '$timeout', 'API', 'JobService',
  function($scope, Upload, $timeout, API, JobService) {
    $scope.jobDetails = {};
    $scope.pageHeading = "";
    $scope.pageDetails = "";
    var addApplyJobModalListeners = function() {
    	$("#applyJobModal").on('shown.bs.modal', function(e) {
	    	$scope.jobDetails.advertisementID = $(e.relatedTarget).data("advid");
	    });
	    $('#applyJobModal').on('hidden.bs.modal', function(){
		    $(this).find('form')[0].reset();
			});
    }
    addApplyJobModalListeners();
    $scope.applyJob = function() {
    	$scope.jobDetails.eligibleToWorkInAustralia = $scope.jobDetails.eligibleToWorkInAustralia ? 1 : 0;
    	if($scope.resumeFile) {
    		uploadFile($scope.resumeFile, function(resumeFile, resumeError) {
    			if(resumeError)
    				$scope.resumeErrorMsg = resumeError;
    			else {
    				$scope.resumeFile = resumeFile;
    				$scope.jobDetails.resume = $scope.resumeFile.result && $scope.resumeFile.result.data ? $scope.resumeFile.result.data.candidateData : '';
    				if($scope.coverFile) {
    					uploadFile($scope.coverFile, function(coverFile, coverError) {
    						if(coverError)
    							$scope.coverErrorMsg = coverError;
    						else {
    							$scope.coverFile = coverFile;
    							$scope.jobDetails.coverLetter = $scope.coverFile.result && $scope.coverFile.result.data ? $scope.coverFile.result.data.candidateData : '';
    							// Save user
    							saveJobDetails($scope.jobDetails, function() {
    								$('#applyJobModal').modal('toggle');
    							});
    						}
    					});
    				} else {
    					$scope.jobDetails.coverLetter =  '';
    					// Save user
    					saveJobDetails($scope.jobDetails, function() {
								$('#applyJobModal').modal('toggle');
							})
    				}
    			}
    		});
    	}
    }

    var uploadFile = function(file, callback) {
    	if (file) {
    		file.upload = Upload.upload({
          url: API.url() + 'file-upload',
          data: { candidateData: file }
        });
        file.upload.then(function(response) {
          $timeout(function() {
          	console.log("success response>>>", response);
            file.result = response.data;
            callback(file, null);
	        });
        }, function(response) {
        	console.log("Error response>>>", response);
          if (response.status > 0)
            var errorMsg = response.status + ': ' + response.data;
          callback(file, errorMsg);
        });	
    	}
    }

    var saveJobDetails = function(jobDetails, callback) {
    	console.log("data to be saved>>>", jobDetails);
    	var applyJobResource = JobService.applyJob();
    	var jobData = new applyJobResource();
    	for(var detail in jobDetails){
    		jobData[detail] = jobDetails[detail];
    	}
    	applyJobResource.save(jobData, function(data) {
    		console.log("data saved>>>", data);
    		callback();
    	});
    }
  }
]);