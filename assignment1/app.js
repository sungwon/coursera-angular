(function() {
'use strict';

angular.module('LunchCheckApp', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.checkDishes = function() {
    var dishArray = $scope.dishes.split(',');
    var numDishes = noBlanks(dishArray).length;
    $scope.message = numDishes > 3 ? 'Too much!' : 'Enjoy!';
  }

  function noBlanks(input) {
    var out = [];
    for (var i = 0; i < input.length; i++) {
      if (input[i].trim().length > 0) {
        out.push(input[i]);
      }
    }
    return out;
  }

}

})();
