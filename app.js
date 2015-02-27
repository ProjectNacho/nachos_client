// Code goes here

(function() {

  var app = angular.module("restaurantViewer", ["ngRoute"]);

  app.config(function($routeProvider){
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "RestaurantController"
            })
            .otherwise({redirectTo:"/main"});
    });

}());