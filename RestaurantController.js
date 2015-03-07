// Code goes here

(function() {

  var app = angular.module("restaurantViewer");

  var RestaurantController = function($scope, $http, $routeParams) {

    var onRestarauntComplete = function(response) {
      $scope.restaurants = response.data.results;
      $scope.latitude = response.data.latitude;
      $scope.longitude = response.data.longitude;
      $scope.distance = response.data.distance;
      $scope.searchComplete = true;
      window.restaurants = $scope.restaurants;
      $scope.initializeMapPointers();
    };
    
    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };


    $scope.search = function(distance, latitude, longitude){
      //url = "https://agile-sierra-8502.herokuapp.com/restaurants/.json?" // James
       url = "https://agile-depths-1206.herokuapp.com/restaurants/.json?" // Michael
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

    $scope.initializeMap = function() {
      $scope.map = new google.maps.Map(document.getElementById("map-canvas"));
      $scope.mapInitialized = true;
      $scope.initializeMapPointers();
    };

    $scope.initializeMapPointers = function() {
      // Make sure that this only happens after both the search has completed and the
      // map has initialized (we don't know for sure what order they'll happen in)
      if (!$scope.mapInitialized || !$scope.searchComplete) {
        return;
      }

      userLocation = new google.maps.LatLng($scope.latitude, $scope.longitude);


      // Just show the search location if there aren't any results
      if (restaurants.length == 0) {
        $scope.map.setZoom(15);
        $scope.map.setCenter(userLocation);
      } else {
        bounds = new google.maps.LatLngBounds();

        bounds.extend(userLocation);

        angular.forEach($scope.restaurants, function(restaurant, key) {
          position = new google.maps.LatLng(restaurant.latitude, restaurant.longitude);
          bounds.extend(position);
          var marker = new google.maps.Marker( {
            position: position,
            map: $scope.map,
            title: restaurant.name
          });
        });

        // Fit all markers on the map
        $scope.map.fitBounds(bounds);
      }

    };

    $scope.searchDistance = $routeParams.distance;
    $scope.searchLatitude = $routeParams.latitude;
    $scope.searchLongitude = $routeParams.longitude;
    $scope.search($scope.searchDistance, $scope.searchLatitude, $scope.searchLongitude);


  };
  
  app.controller("RestaurantController", ["$scope", "$http", "$routeParams", RestaurantController]);

}());
