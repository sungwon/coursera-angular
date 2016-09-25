(function() {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyShoppingController', BuyController)
.controller('AlreadyBoughtController', BoughtController)
.service('ShoppingListCheckOffService', CheckovService);

BuyController.$inject = ['ShoppingListCheckOffService'];
function BuyController(ShoppingListCheckOffService) {
  var self = this;

  self.items = ShoppingListCheckOffService.getItemsToBuy();

  self.buyItem = function(itemIndex) {
    ShoppingListCheckOffService.buyItem(itemIndex);
  };
}

BoughtController.$inject = ['ShoppingListCheckOffService'];
function BoughtController(ShoppingListCheckOffService) {
  var self = this;

  self.items = ShoppingListCheckOffService.getItemsBought();
}


function CheckovService() {
  var service = this;

  var itemsToBuy = [
        {
          name: 'Pizzas',
          quantity: '80'
        },
        {
          name: 'Cheese Sticks',
          quantity: '200'
        },
        {
          name: 'Garlic Sauces',
          quantity: '50'
        },
        {
          name: 'Marinara Sauces',
          quantity: '75'
        },
        {
          name: 'Self-Awareness Points',
          quantity: '1000'
        }
      ];
  var itemsBought = [];

  service.getItemsToBuy = function() {
    return itemsToBuy;
  };

  service.getItemsBought = function() {
    return itemsBought;
  };

  service.buyItem = function(itemIndex) {
    itemsBought.push(itemsToBuy.splice(itemIndex, 1).pop());
  };

}


})();
