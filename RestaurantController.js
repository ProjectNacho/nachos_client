// Code goes here

(function() {

  var app = angular.module("restaurantViewer");

  var RestaurantController = function($scope, $http, $routeParams) {

    var onRestarauntComplete = function(response) {
      $scope.restaraunts = response.data;
    };
    
    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };


    $scope.search = function(distance, latitude, longitude){
      url = "https://agile-sierra-8502.herokuapp.com/restaurants/.json?"
      if (distance != null) {
        url += "distance=" + distance + "&"
      }
      if (latitude != null) {
        url += "latitude=" + latitude + "&"
      }
      if (longitude != null) {
        url += "longitude=" + longitude + "&"
      }
      $http.get(url)
        .then(onRestarauntComplete, onError);
    };

    $scope.distance = $routeParams.distance;
    $scope.latitude = $routeParams.latitude;
    $scope.longitude = $routeParams.longitude;
    $scope.search($scope.distance, $scope.latitude, $scope.longitude);

 //   $scope.repoSortOrder = "-stargazers_count";


  };
  
  app.controller("RestaurantController", ["$scope", "$http", "$routeParams", RestaurantController]);

}());
