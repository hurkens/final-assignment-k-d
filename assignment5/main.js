angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);



function CheckBoxes() {
  var x = document.getElementsByName("FormGenre");
  var i;
  //var genres = "";
  genres = [];
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
          activities = (activityList[i].value);

          }
        }
console.log(activities);
}



function mainCtrl($scope, $http, ChartJsProvider){

	// TODO : type here code for your Ex 1
    $scope.myAppName = "MoodMusic";
    $scope.myAppList = [ "codaonto:Study", "codaonto:Treatment", "codaonto:Variable" ];
    $scope.mysparqlendpoint = "http://localhost:5820/music/query/?query="

	// TODO : type here code for your Ex 2



	// TODO : type here code for your Ex 2
  $scope.doMyAction = function(){
        console.log('test');
        $scope.result = "Here is my input: " +$scope.myInput+"!";
        $scope.songs_playlist = [];
        html = "<iframe src=\"https://open.spotify.com/embed/track/2zYzyRzz6pRmhPzyfMEC8s\" width=\"300\" height=\"80\" frameborder=\"0\" allowtransparency=\"true\" allow=\"encrypted-media\"></iframe>"
        document.getElementById("songs").innerHTML = html;
        var i;
        if (genres.length == 0){
          window.alert("please select genre(s)")
        }
        for (i = 0; i < genres.length; i++) {
        $scope.dynamicQuery = "SELECT ?code WHERE { ?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i]+"> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code }";
        //$scope.dynamicQuery = $scope.myInput;


        console.log($scope.mysparqlendpoint+encodeURI($scope.dynamicQuery).replace(/#/g, '%23'));
        $http( {
        method: "GET",
        headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
        url : $scope.mysparqlendpoint+encodeURI($scope.dynamicQuery).replace(/#/g, '%23'),

    } )
    .success(function(data, status ) {
        console.log(data);
        $scope.songs_playlist.push(data);
        $scope.resultQ2=data;
    })
    .error(function(error ){
        console.log('Error'+error);
    });
  }

}
console.log($scope.songs_playlist);


}




function myFunction() {
    var x = document.getElementById("player");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}
