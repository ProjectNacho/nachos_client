// Code goes here

(function() {

  var app = angular.module("restarauntViewer", []);

  var MainController = function($scope, $http) {

    var onRestarauntComplete = function(response) {
      $scope.restaraunts = response.data;
    };
    
    var onError = function(reason) {
      $scope.error = "Could not fetch the data.";
    };


    $scope.search = function(username){
        $http.get("https://agile-sierra-8502.herokuapp.com/restaurants")
          .then(onRestarauntComplete, onError);
    };

    $scope.restarauntName = "";
    $scope.welcome = "Welcome to Nachos Restaraunt Finder!";
 //   $scope.repoSortOrder = "-stargazers_count";


  };
  
  app.controller("MainController", ["$scope", "$http", MainController]);

}());