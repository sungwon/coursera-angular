(function() {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiBasePath', 'https://davids-restaurant.herokuapp.com');

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    restrict: "E",
    scope: {
      foundItems: '<',
      onRemove: '&'
    },
    controller: FoundItemsDirectiveController,
    controllerAs: 'ctrl',
    bindToController: true
  };

  return ddo;
}

function FoundItemsDirectiveController() {
  var self = this;

}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var self = this;

  self.searchTerm = "";
  self.found;

  self.narrowItDown = function() {
    var promise = MenuSearchService.getMatchedMenuItems(self.searchTerm);
    promise.then(function(response) {
      if (response.length > 0) {
        self.found = response;
      } else {
        self.found = false;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  self.remove = function (index) {
    self.found.splice(index, 1);
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: 'GET',
      url: (ApiBasePath + '/menu_items.json')
    }).then(function (result) {
      if (searchTerm === "") return [];
      var foundItems = result.data.menu_items;
      return foundItems.filter(function(item) {
        return item.description.includes(searchTerm);
      });
    });
  };


}



})();
