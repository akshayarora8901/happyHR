angular.module('happyHrApp').service("JobService", ['$resource', 'API', function($resource, API) {
  this.getFilterData = function() {
    return $resource(API.url() + 'marketing/get-job-filter-data');
  };
  this.getJobFunctions = function() {
    return $resource(API.url() + 'marketing/get-job-functions-by-industry/:id');
  };
  this.getSearchJobResults = function() {
    return $resource(API.url() + 'marketing/search-jobs/:options');
  }
  this.applyJob = function() {
    return $resource(API.url() + 'marketing/apply-jobs');
  }
  this.getPartnersList = function() {
    return $resource(API.url() + 'marketing/get-partner-list');
  }
  this.getFaqCategories = function() {
    return $resource(API.url() + 'marketing/get-faq-category');
  }
  this.getFaqDetails = function() {
    return $resource(API.url() + 'marketing/get-faqDetail/:id');
  };

  this.getPager = function(totalItems, currentPage, pageSize) {
    // default to first page
    currentPage = currentPage || 1;

    // default page size is 10
    pageSize = pageSize || 5;

    // calculate total pages
    var totalPages = Math.ceil(totalItems / pageSize);

    var startPage, endPage;
    if (totalPages <= 10) {
      // less than 10 total pages so show all
      startPage = 1;
      endPage = totalPages;
    } else {
      // more than 10 total pages so calculate start and end pages
      if (currentPage <= 6) {
        startPage = 1;
        endPage = 10;
      } else if (currentPage + 4 >= totalPages) {
        startPage = totalPages - 9;
        endPage = totalPages;
      } else {
        startPage = currentPage - 5;
        endPage = currentPage + 4;
      }
    }

    // calculate start and end item indexes
    var startIndex = (currentPage - 1) * pageSize;
    var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages to ng-repeat in the pager control
    var pages = _.range(startPage, endPage + 1);

    // return object with all pager properties required by the view
    return {
      totalItems: totalItems,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      startPage: startPage,
      endPage: endPage,
      startIndex: startIndex,
      endIndex: endIndex,
      pages: pages
    };
  }
}])