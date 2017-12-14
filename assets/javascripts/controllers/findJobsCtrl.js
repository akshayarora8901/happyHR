'use strict';

angular.module('happyHrApp').controller('FindJobsCtrl', ['$scope', 'IntegrationConstants', 'JobService',
  function($scope, IntegrationConstants, JobService) {
    $scope.showJobFunctionDropdown = false;
    $scope.$parent.pageHeading = "Find a job that makes you happy";
    $scope.$parent.pageDetails = "Search or browse jobs across Australia and apply!";
    var searchOptions = {};
    var payscale = {
      "full-time": {
        "from": {
          "name": "Paying Annual",
          "range": ["0", "40000", "60000", "80000", "100000", "120000", "140000", "160000", "180000"]
        },
        "to": {
          "name": "to",
          "range": ["40000", "60000", "80000", "100000", "120000", "140000", "160000", "180000", "200000+"]
        }
      },
      "part-time": {
        "from": {
          "name": "Per Hour",
          "range": ["0", "10", "15", "20", "25", "30", "35", "40", "45"]
        },
        "to": {
          "name": "to",
          "range": ["10", "15", "20", "25", "30", "35", "40", "45", "50+"]
        }
      },
      "default": {
        "from": {
          "name": "paying",
          "range": []
        },
        "to": {
          "name": "to",
          "range": []
        }
      }
    }
    $scope.selectedPayscale = {
      from: "",
      to: ""
    };
    $scope.currentPayscale = payscale.default;
    $scope.pager = {};
    var searchJobs = function() {
      JobService.getSearchJobResults().query({ options: JSON.stringify(searchOptions) }, function(data) {
        $scope.searchedJobs = data;
        $scope.dummyJobs = $scope.searchedJobs.slice();
        $scope.setPage(1);
      });
    }
    searchJobs();
    $scope.defaultLocation = {
      "locationID": null,
      "title": "Location"
    }
    $scope.defaultIndustry = {
      "industryID": null,
      "title": "Industry"
    }
    $scope.defaultJobFunction = {
      "jobFunctionID": null,
      "title": "Job Function"
    }
    $scope.defaultEmploymentType = {
      "employmentTypeID": null,
      "title": "Employment Type"
    }
    $scope.selectedLocation = $scope.defaultLocation;
    $scope.selectedIndustry = $scope.defaultIndustry;
    $scope.selectedJobFunction = $scope.defaultJobFunction;
    $scope.selectedEmploymentType = $scope.defaultEmploymentType;
    $scope.selectLoc = function(location) {
      $scope.selectedLocation = location;
      if (location.locationID)
        searchOptions.locationID = location.locationID;
      else
        delete searchOptions.locationID;
    }
    $scope.selectIndustry = function(industry) {
      $scope.selectedIndustry = industry;
      $scope.showJobFunctionDropdown = true;
      if (industry.industryID) {
        searchOptions.industryID = industry.industryID;
        JobService.getJobFunctions().get({ id: industry.industryID }, function(data) {
          $scope.jobFunctions = data.data;
          $scope.selectedJobFunction = {
            "jobFunctionID": "default",
            "title": "Job Function"
          };
        }, function(err) {
          $scope.jobFunctions = [];
          $scope.selectedJobFunction = {
            "jobFunctionID": "default",
            "title": "Job Function"
          };
        });
      } else {
        delete searchOptions.industryID;
        $scope.showJobFunctionDropdown = false;
      }
    }
    $scope.selectJobFunction = function(jobFunction) {
      $scope.selectedJobFunction = jobFunction;
      if (jobFunction.jobFunctionID)
        searchOptions.jobFunctionID = jobFunction.jobFunctionID;
      else
        delete searchOptions.jobFunctionID;
    }
    $scope.selectEmploymentType = function(empType) {
      $scope.selectedPayscale = {
        from: "",
        to: ""
      };
      $scope.selectedEmploymentType = empType;
      if (empType.employmentTypeID)
        searchOptions.employmentTypeID = empType.employmentTypeID;
      else
        delete searchOptions.employmentTypeID;
      searchJobs();
      selectPayscale(empType);
    }

    JobService.getFilterData().get(function(data) {
      $scope.filterData = data ? data.data : {};
    });
    $scope.searchJobs = function() {
      searchJobs();
    }
    
    var selectPayscale = function(empType) {
      if (empType && empType.title) {
        switch (empType.title) {
          case 'Full time':
            $scope.currentPayscale = payscale["full-time"];
            break;
          case 'Part time':
            $scope.currentPayscale = payscale["part-time"];
            break;
          default:
            $scope.currentPayscale = payscale["default"];
        }
      }
    }
    $scope.payscaleChanged = function(type) {
      console.log("payscale change event>>>>", type, $scope.selectedPayscale);

    }

    $scope.setPage = function(page) {
      if ((page < 1 || page > $scope.pager.totalPages) && !$scope.dummyJobs.length) {
        return;
      }
      $scope.pager = JobService.getPager($scope.dummyJobs.length, page);
      $scope.searchedJobs = $scope.dummyJobs.slice($scope.pager.startIndex, $scope.pager.endIndex + 1);
    }

    var searchJobsByPayscale = function(jobs, payscale) {
      if(jobs && jobs.length && payscale){
        var filteredJobs = jobs.filter(function(job) {
          if(filterSalary(job.salary) >= filterSalary(payscale.from) && filterSalary(job.salary) <= filterSalary(payscale.to)) {
            return true;
          } else {
            return false;
          }
        });
        console.log("filtered jobs>>>", filteredJobs);
      }
    }
    var filterSalary = function(salary) {
      console.log("filtered salary>>>>", parseInt(salary.replace('$', '').trim()));
      return parseInt(salary.replace('$', '').trim());
    }
  }
]);