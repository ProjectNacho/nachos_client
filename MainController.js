// Code goes here

(function() {

  var app = angular.module("restaurantViewer");

  var MainController = function($scope, $location) {

    var getLocation = function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCurrentPosition);
      }
    };

    var setCurrentPosition = function(position) {
      $scope.$apply(function() {
        $scope.haveLocation = true;
        $scope.currentLatitude = position.coords.latitude;
        $scope.currentLongitude = position.coords.longitude;
      });
    };

    $scope.search = function(distance, latitude, longitude) {
      url = "/search"

      // Always put a slash for distance, so that if users type latitude and longitude but no distance, it looks
      // like /search//X/Y instead of /search/X/Y, which would cause the search page to think distance is X,
      // latitude is Y, and there's no longitude
      if (distance != null) {
        url += "/" + distance
      } else {
        url += "/"
      }

      if (latitude != null) {
        url += "/" + latitude
      }
      if (longitude != null) {
        url += "/" + longitude
      }
      $location.path(url);
    }

    $scope.useCurrentLocation = function() {
      $scope.latitude = $scope.currentLatitude;
      $scope.longitude = $scope.currentLongitude;
    }

    getLocation();


  };

  app.controller("MainController", ["$scope", "$location", MainController]);

}());
