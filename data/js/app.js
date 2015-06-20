app = angular.module('app', []);

app.controller('mainCtrl', ['$scope', function($scope) {
  $scope.success = false;
}]);

app.directive('ngEnter', function($http) {
  return function(scope, element, attrs) {
    element.bind("keydown keypress", function(event) {
      if(event.which === 13) {
        scope.$apply(function(manga){
          getCurrentTabUrl(function(current_url){
            issue = {
              url: current_url,
              message: scope.message
            };
            $http.post('https://mysterious-taiga-6994.herokuapp.com/issues', issue).
            success(function(data, status, headers, config) {
              document.getElementById("submission").className = "hide";
              document.getElementById("success").className = "show";
              var audio = new Audio();        // create the audio object
              audio.src = "button-15.mp3"; // assign the audio file to it
              audio.play();
              audio.addEventListener('ended', function(){
                setTimeout(function(){
                  addon.port.emit("close");
                  window.close();
                }, 800);
              });
            }).
            error(function(data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
            });
          });
          //scope.$eval(attrs.ngEnter);
        });
        event.preventDefault();
      }
    });
  };
});

setTimeout(function(){
  document.getElementById("body").className = "yellow";
  setTimeout(function(){
    document.getElementById("body").className = "black";
  }, 350);
}, 350);

var myAudio = new Audio();        // create the audio object
myAudio.src = "button-21.mp3"; // assign the audio file to it
myAudio.play();


