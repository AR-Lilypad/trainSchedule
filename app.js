
//script tags are in the html
$(document).ready(function() {
// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgH3cfv5HqDAiZ-piyhsJLm5GXEeDZQHM",
    authDomain: "train-schedule-e42fc.firebaseapp.com",
    databaseURL: "https://train-schedule-e42fc.firebaseio.com",
    projectId: "train-schedule-e42fc",
    storageBucket: "train-schedule-e42fc.appspot.com",
    messagingSenderId: "517499868382",
    appId: "1:517499868382:web:0921e25e3461eb65781e4f"
  };

// Initialize Firebase - access to the database- this is an object available to you
firebase.initializeApp(firebaseConfig);

//ask the firebase app to get database and store it in variable
var database = firebase.database();

// submit button to add trains
$("#addTrain").on("click", function (event) {
    event.preventDefault();

    //user inputs
    var trainName = $("#traininput").val().trim();
    var finalDestination = $("#destinationinput").val().trim();
    var firstTrainTime = moment($("#starttimeinput").val().trim(), "HH:mm").format("X");
    var frequency = $("#frequencyinput").val().trim();

    // object for holding train information
    var newTrain = {
        train: trainName,
        destination: finalDestination,
        start: firstTrainTime,
        frequent: frequency
    };

    // pushes the train info to the database
    database.ref().push(newTrain);

    // logs to the console
    console.log(newTrain.train);
    console.log(newTrain.destination);
    console.log(newTrain.start);
    console.log(newTrain.frequent);


    // clear the text boxes
    $("#traininput").val("");
    $("#destinationinput").val("");
    $("#startinput").val("");
    $("#frequencyinput").val("");
});

// create a firebase event to add trains to the database
database.ref().on("child_added", function (childSnapshot) {

    // store the info in variable containers
    var trainName = childSnapshot.val().train;
    var finalDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().start;
    var frequency = childSnapshot.val().frequent;
    console.log(childSnapshot.val());

    // train info
    console.log(trainName);
    console.log(finalDestination);
    console.log(firstTrainTime);
    console.log(frequency);


    // var tFrequency;

    // // Time is 3:30 AM
    // var firstTime;

    // // First Time (pushed back 1 year to make sure it comes before current time)
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

    // // Current Time
    // var currentTime = moment();
    // console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // // Difference between the times
    // var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    // console.log("DIFFERENCE IN TIME: " + diffTime);

    // // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    // console.log(tRemainder);

    // // Minute Until Train
    // var tMinutesTillTrain = tFrequency - tRemainder;
    // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // // Next Train
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // Create the new row
    var newRow = $("<tr>").append(
        $("<th scope='row'>").text(trainName),
        $("<td>").text(finalDestination),
        $("<td>").text(firstTrainTime),
        $("<td>").text(frequency)
    );

    // Append the new row to the table
    $("#train-table > tbody").append(newRow);
});

alert("Train Successfully added");