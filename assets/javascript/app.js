//ask the firebase app to get database and store it in variable
const database = firebase.database();

var myTimer = setInterval(myTimer, 1000);

// Header|Title with Timer
function myTimer() {
    var d = new Date();
    $("#current-time").text(d.toLocaleTimeString());
}

let frequency = 0;
let startingTrain = 0;

// submit button to add trains
$("#addTrain").on("click", function (event) {
  event.preventDefault();
 

// user inputs
  $("#train-table > tbody").empty();
  let train = $("#traininput").val().trim();
  let destiny = $("#destinationinput").val().trim();
  startingTrain = moment($("#starttimeinput").val().trim(), "HH:mm").format("HH:mm");
  frequency = parseInt($("#frequencyinput").val().trim());

  var startingTrainConvert = moment(startingTrain, "hh:mm");
  var timeDiff = moment().diff(moment(startingTrainConvert), "minutes");
  var remainder = timeDiff % frequency;
  var minutesAway = frequency - remainder;
  var nextTrain = moment().add(minutesAway, "minutes");
  nextTrain = moment(nextTrain).format("HH:mm");
 
  // Local holding object
  let newTrain = {
    addedtrain: train,
    destination: destiny,
    firstTrain: startingTrain,
    frequency: frequency,
    nextTrain: nextTrain,
    minutesAway: minutesAway
  };

  // Get a key for a new Post.
  database.ref().push(newTrain);

  // Message to user that their input (train) add is successful
  alert("New Train Added");

  // Clear inputs
  $("input").val("");
}),

// Firebase event to add train data to html row and FBdb
database.ref().on("child_added", function(childSnapshot) {

  let train = childSnapshot.val().addedtrain;
  let destiny = childSnapshot.val().destination;
  let startingTrain = childSnapshot.val().firstTrain;
  let frequency = childSnapshot.val().frequency;
  var nextTrain = childSnapshot.val().nextTrain;
  var minutesAway = childSnapshot.val().minutesAway;

//   $("#employee-table > tbody").append(
//     "<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
//   frequency + "</td><td>" + nextTrain + "</td><td>" + minutesTillTrain + "</td></tr>");
// });

  // Create the new row
  let newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(destiny),
    $("<td>").text(startingTrain),
    $("<td>").text(frequency + "minutes"),
    $("<td>").text(moment(nextTrain).format("hh:mm")),
    $("<td>").text(minutesAway),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
