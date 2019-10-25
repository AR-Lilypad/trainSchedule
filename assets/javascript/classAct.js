
 //script tags are in the html




// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAU3GPXGkpAiYsNSpxmkoEehMnNakCzBEg",
    authDomain: "train-schedule-24c26.firebaseapp.com",
    databaseURL: "https://train-schedule-24c26.firebaseio.com",
    projectId: "train-schedule-24c26",
    storageBucket: "",
    messagingSenderId: "637612484547",
    appId: "1:637612484547:web:e0d0b10e3c29a33ae07f76"
};
// Initialize Firebase - access to the database- this is an object available to you

firebase.initializeApp(firebaseConfig);

//ask the firebase app to get database and store it in variable
var scheduleData = firebase.database();

// store click data to FB in JSON property call ___
//there is a FB .set method
// .ref refers to the path you want to save your data to
//  if you leave .ref() blank it will save to root directory

database.ref().set({
  //telling FB making an ajax call to update your db in firebase.
    //the information you pass up
    //ie clickCount:clickCounter
});


//create a table to see the data in html

//need function to take data from html and send to firebase

// use moment.js to format times/dates structure

fire