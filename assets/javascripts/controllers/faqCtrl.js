'use strict';

angular.module( 'happyHrApp' ).controller( 'FaqCtrl', 
	['$scope', 'JobService',
	function( $scope, JobService) 
{
  $scope.showSearchResults = false;
  $scope.$parent.pageHeading = "";
  $scope.$parent.pageDetails = "";
  JobService.getFaqCategories().get(function(response) {
    $scope.categories = response.data && response.data.length ? response.data : [];
    getAllFaqDetails($scope.categories, function(data) {
      $scope.allFaqDetails = data;
      $scope.categories && $scope.categories.length && setFaqDetails($scope.categories[0]);
      $scope.$apply();
    });
  });
  $scope.selectCategory = function(category) {
    if(category)
      setFaqDetails(category);
  }
  $scope.searchFaqs = function() {
    if($scope.searchInput && $scope.searchInput != "") {
      $scope.showSearchResults = true;
      var searchedFaq = [];
      for(var categoryId in $scope.allFaqDetails) {
        var searchedCat = {};
        var category = $scope.allFaqDetails[categoryId];
        searchedCat.faqCategoryID = category.faqCategoryID;
        searchedCat.title = category.title;
        searchedCat.question = [];
        var questions = category.question ? category.question : [];
        if(questions && questions.length) {
          questions.filter(function(question) {
            if(question.question.toLowerCase().indexOf($scope.searchInput.toLowerCase()) != -1)
              searchedCat.question.push(question);
          });
        }
        if(searchedCat.question && searchedCat.question.length)
          searchedFaq.push(searchedCat);
      }
      $scope.searchedFaqs = searchedFaq;
    } else {
      $scope.showSearchResults = false;
      $scope.searchedFaqs = [];
    }
  }
  var setFaqDetails = function(category) {
    if($scope.allFaqDetails && $scope.allFaqDetails[category.faqCategoryID])
      $scope.faqDetails = $scope.allFaqDetails[category.faqCategoryID];
    else
      console.log("No Faq details present for category with category Id: ", faqCategoryID);
  }

  var getFaqDetails = function(category) {
    return new Promise(function(resolve, reject) {
      if(category && category.faqCategoryID) {
        JobService.getFaqDetails().get({ id: category.faqCategoryID }, function(response) {
          if(response && response.data)
            resolve(response.data, null);
          else
            reject();
        }, function(err) {
          resolve(null, err);
        }); 
      } else {
        reject();
      }
    });
  }

  var getAllFaqDetails = function(categories, callback) {
    var allCategoriesData = {};
    if(categories && categories.length) {
      categories.filter(function(category, index) {
        getFaqDetails(category).then(function(data, err) {
          if(err) {
            console.log('Error in fetching FAQ Data: ', err);
            return;
          }
          allCategoriesData[data.faqCategoryID] = data;
          if(index == categories.length-1)
            callback(allCategoriesData);
        });
      });      
    }
  }
}]);
