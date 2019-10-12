//ask the firebase app to get database and store it in variable
var database = firebase.database();

// initiate moment.js
// var time = moment();

// submit button to add trains
$("#addTrain").on("click", function(event) {
  event.preventDefault();
  writeNewPost();
});

// Write
function writeNewPost() {
  $("#train-table > tbody").empty();
  var train = $("#traininput").val();
  var destination = $("#destinationinput").val();
  var start = $("#starttimeinput").val();
  var freq = $("#frequencyinput").val();

  // A post entry.
  var newTrain = {
    train: train,
    destination: destination,
    start: start,
    freq: freq
  };

  // Get a key for a new Post.
  var newTrain = database
    .ref()
    .child("schedules")
    .push(newTrain);

  // Clear inputs
  $("input").val("");
}

// Read
function loadPosts() {
  database.ref("/schedules").on("value", function(snapshot) {
    let trains = snapshot.val();

    Object.keys(trains).forEach(key => {
      // Create the new row
      var newRow = $("<tr>").append(
        $("<th scope='row'>").text(trains[key].train),
        $("<td>").text(trains[key].destination),
        $("<td>").text(trains[key].start),
        $("<td>").text(trains[key].freq)
      );

      // Append the new row to the table
      $("#train-table > tbody").append(newRow);
    });
  });
}

loadPosts();
