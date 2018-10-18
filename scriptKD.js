var genres = [];
var activities = [];


function CheckBoxes() {
  var x = document.getElementsByName("FormGenre");
  var i;

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
          Activities.push(activityList[i].value);

          }
          console.log(Activities);
        }

}

function myFunction() {
    var x = document.getElementById("player");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

}
