var genres = [];
var activities = [];
var queryRock = "PREFIX mu: <http://www.semanticweb.org/music/> SELECT ?s WHERE {?s mu:hasGenre mu:Rock}"
var queryRockUri = "http://localhost:5820/music#!/query/" + '?query=' + encodeURIComponent(queryRock);
var jsonpRockUri = 'http://morph.talis.com/?data-uri[]='+encodeURIComponent(queryRockUri)+'&output=jsonp&callback=processSparqlResults';
var newScript = document.createElement('script');
newScript.src=jsonpRockUri;
document.body.appendChild(newScript);
function processSparqlResults(data){  console.log(data);  }


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
