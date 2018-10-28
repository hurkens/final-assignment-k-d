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
    $scope.mysparqlendpoint = "http://localhost:5820/music/query/?reasoning=true&query="



    $scope.OtherDatabases = function(){
      other_songs = [];
      the_other_songs = [];
      $scope.sparqlendpoint = "http://dbtune.org/magnatune/sparql/query?query="
      for (i = 0; i < genres.length; i++) {
      $scope.dynamicQuery = "SELECT ?obj WHERE {?sub <http://purl.org/ontology/mo/paid_download> ?genre FILTER CONTAINS (str(?genre), 'genre="+genres[i]+"') . ?sub <http://purl.org/dc/elements/1.1/title> ?obj .} LIMIT 10"

      $http( {
      method: "GET",
      headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
      url : $scope.sparqlendpoint+encodeURI($scope.dynamicQuery).replace(/#/g, '%23'),

      } )
      //als het succesvol was console.logt ie wat terug gekregen en voor elke data voegt ie de resultaten toe aan songs_playlist

      .success(function(data, status ) {
          console.log(data);
          var results = data.results.bindings;

          for (i=0; i < results.length; i++){
              other_songs.push(results[i].obj.value);
            }
          //console.log(other_songs);
          document.getElementById("other_songs1").innerHTML = "Songs from magnatune: "+ other_songs;
      })
      //dit is voor als het fout gaat om een of andere reden
      .error(function(error ){
      console.log('Error'+error);
      });
    }

    $scope.sparqlendpoint = "http://dbtune.org/jamendo/sparql/query?query="
    for (i = 0; i < genres.length; i++) {
    $scope.dynamicQuery = "SELECT ?title WHERE {?track <http://www.holygoat.co.uk/owl/redwood/0.1/tags/taggedWithTag> <http://dbtune.org/jamendo/tag/"+genres[i].charAt(0).toLowerCase()+genres[i].substr(1,)+"> . ?track <http://purl.org/dc/elements/1.1/title> ?title .} LIMIT 10"

    $http( {
    method: "GET",
    headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'},
    url : $scope.sparqlendpoint+encodeURI($scope.dynamicQuery).replace(/#/g, '%23'),

    } )
    //als het succesvol was console.logt ie wat terug gekregen en voor elke data voegt ie de resultaten toe aan songs_playlist

    .success(function(data, status ) {
        //console.log(data);
        console.log(data);

      //  console.log(other_songs);
      var results = data.results.bindings;

      for (i=0; i < results.length; i++){
          the_other_songs.push(results[i].title.value);
        }
        document.getElementById("other_songs2").innerHTML = "Songs from jamendo: "+ the_other_songs;
    })
    //dit is voor als het fout gaat om een of andere reden
    .error(function(error ){
    console.log('Error'+error);
    });
  }

    }
	// TODO : type here code for your Ex 2



	// TODO : type here code for your Ex 2
  $scope.doMyAction = function(){
        CheckBoxes();
        code_player = [];
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
        if (activities.length == 0){
          window.alert("please select activity (or the questionmark picture)")
        }
        //hier onder staat voor elke genre queriet ie naar de database
        if (activities == "None"){
        for (i = 0; i < genres.length; i++) {
        $scope.dynamicQuery = "SELECT ?code WHERE { ?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i]+"> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code } LIMIT 4";
        //$scope.dynamicQuery = $scope.myInput;


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
//hier komt de functie voor het samenvoegen van activities en genres
      if (activities != "None") {
        for (i = 0; i < genres.length; i++) {
          console.log("genre: " + genres[i]);
        //$scope.dynamicQuery = "SELECT ?code WHERE { ?s a <http://www.semanticweb.org/music/"+activities+"Song> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code }";
          $scope.dynamicQuery = "SELECT ?code WHERE { ?s a <http://www.semanticweb.org/music/"+activities+"Song> . ?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i]+"> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code } LIMIT 10";
          console.log("first query: " + $scope.dynamicQuery);
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
      if (code_player.length < 10) {
          //if (genres[0] == "none"){
          //  $scope.dynamicQuery = "SELECT ?code WHERE { ?s a <http://www.semanticweb.org/music/"+activities+"Song> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code . ?p <http://www.semanticweb.org/music/hasSpotifyCode> ?code } LIMIT 10";
        for (i = 0; i < 1; i++) {
          console.log("minder dan 10!!!!!!!!!!!!!!!!!!!");
          console.log(code_player.length);
          console.log(genres[i]);
            $scope.dynamicQuery = "SELECT ?code WHERE { {?s a <http://www.semanticweb.org/music/"+activities+"Song> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code . MINUS { {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i]+">} UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+1]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+2]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+3]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+4]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+5]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+6]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+7]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+8]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+9]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+10]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+11]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+12]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+13]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+14]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+15]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+16]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+17]+">}  UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+18]+">} UNION {?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i+19]+">}}} } LIMIT 3";
            console.log("second query: " + $scope.dynamicQuery);
          //$scope.dynamicQuery = $scope.myInput;
      //   for (i = 0; i < genres.length; i++) {
    //      $scope.dynamicQuery = "SELECT ?s WHERE { ?s <http://www.semanticweb.org/music/hasGenre> <http://www.semanticweb.org/music/"+genres[i]+"> . ?s <http://www.semanticweb.org/music/hasSpotifyCode> ?code .  MINUS { ?s a <http://www.semanticweb.org/music/"+activities+"Song> . }} LIMIT 2"
    //    }
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
  //    }
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
