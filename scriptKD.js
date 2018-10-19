angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http){

	// TODO : type here code for your Ex 1



	// TODO : type here code for your Ex 2



	// TODO : type here code for your Ex 2
	$scope.doMyAction = function(){


	};

}



var genres = [];
var activities = [];
var queryRock = " SELECT ?s WHERE {?s http://localhost:5820/music#!/query/music/hasGenre mu:Rock}";



function CheckBoxes() {
  var x = document.getElementsByName("FormGenre");
  var i;
  var genres = [];
  var activities = [];
  for(i = 0; i < x.length; i++) {
      if (x[i].checked) {
          genres.push(x[i].value);

          }
}
  console.log(genres);

  var activityList = document.getElementsByName("Activity");
  var i;
  for(i = 0; i < activityList.length; i++) {
      if (activityList[i].checked) {
          activities.push(activityList[i].value);

          }
        }
console.log(activities);
}

function myFunction() {
    var x = document.getElementById("player");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}
