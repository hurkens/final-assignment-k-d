angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


//deze functie wordt aangeroepen als je op submit klikt onder de checkboxes
function CheckBoxes() {
  //de checkboxes van de genres hebben worden nu variabele x
  var x = document.getElementsByName("FormGenre");
  var i;

  genres = [];
  //voor elke checkbox controleert ie of ie gechecked is, en zo ja, voegt ie die toe aan de lijst genres
  for(i = 0; i < x.length; i++) {
      if (x[i].checked) {
          genres.push(x[i].value);

          }
}
  console.log(genres); //in de console logt ie dus alle aangekruisde genres

//hieronder gebeurt nu hetzelfde, maar dan voor de activities checkboxes
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
  //onze naam
    $scope.myAppName = "MoodMusic";
    //dit is de endpoint, waar de database is
    $scope.mysparqlendpoint = "http://localhost:5820/music/query/?query="

	// TODO : type here code for your Ex 2



	// TODO : type here code for your Ex 2
  $scope.doMyAction = function(){
        console.log('test');
        $scope.result = "Here is my input: " +$scope.myInput+"!";
        //hier maken we een variabele aan voor de liedjes die in de playlist komen
        $scope.songs_playlist = [];
        //dit is ff om te testen of het in de html kwam
        //html = "<iframe src=\"https://open.spotify.com/embed/track/2zYzyRzz6pRmhPzyfMEC8s\" width=\"300\" height=\"80\" frameborder=\"0\" allowtransparency=\"true\" allow=\"encrypted-media\"></iframe>"
        //document.getElementById("songs").innerHTML = html;
        var i;
        //hier onder staat als je geen genres hebt aangeklikt, dan krijg je een alert als je op submit klikt
        if (genres.length == 0){
          window.alert("please select genre(s)")
        }
        //hier onder staat voor elke genre queriet ie naar de database
        for (i = 0; i < genres.length; i++) {
        $scope.dynamicQuery = "SELECT ?code WHERE { ?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i]+"> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code }";
        //$scope.dynamicQuery = $scope.myInput;


        console.log($scope.mysparqlendpoint+encodeURI($scope.dynamicQuery).replace(/#/g, '%23'));
        $http( {
        method: "GET",
        headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
        url : $scope.mysparqlendpoint+encodeURI($scope.dynamicQuery).replace(/#/g, '%23'),

    } )
    //als het succesvol was console.logt ie wat terug gekregen en voor elke data voegt ie de resultaten toe aan songs_playlist
    .success(function(data, status ) {
        //console.log(data);

        var results = data.results.bindings;
            //console.log(results);
            code_player = [];
            for (i=0; i < results.length; i++){
            code_player.push(results[i].code.value);
          }
            //console.log(results[0].value);
            console.log(code_player);

        document.getElementById("songs").innerHTML = code_player;

        $scope.songs_playlist.push(data);
        $scope.resultQ2=data;
    })
    //dit is voor als het fout gaat om een of andere reden
    .error(function(error ){
        console.log('Error'+error);
    });
  }

}
//console.log($scope.songs_playlist);


}



//deze functie zorgt ervoor dat de er dingen verdwijenen, redelijk nutteloos, maar mss voor later handig
function myFunction() {
    var x = document.getElementById("player");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}
