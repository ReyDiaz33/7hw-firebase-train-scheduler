// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new train - then update the html + update the database
// 3. Create a way to retrieve train times from the train schedule database.
// 4. Create a way to calculate train frequency. Using difference between first train time and current time.
//    Then use moment.js formatting to set difference in minutes.


// 1. Initialize Firebase
var config = {
  apiKey: "AIzaSyDYdlfqXovID9gZiJk7fm5zPbeijObIQxE",
  authDomain: "train-scheduler-eea1e.firebaseio.com",
  databaseURL: "https://train-scheduler-eea1e.firebaseio.com/",
  storageBucket: "train-scheduler-eea1e.appspot.com"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding train
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var time = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var frequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: destination,
    time: time,
    frequency: frequency,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(newTrain.name);
  console.log(newTrain.destination);
  console.log(newTrain.time);
  console.log(newTrain.frequency);

  alert(" New Train Schedule successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().destination;
  var time = childSnapshot.val().time;
  var frequency = childSnapshot.val().frequency;

  // Train Info
  console.log(trainName);
  console.log(destination);
  console.log(time);
  console.log(frequency);

  // Prettify the Train start
  var trainArrival = moment.unix(time).format("HH:mm");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
  var trainFrequency = moment().diff(moment(time, "X"), "minutes");
  console.log(trainFrequency);



  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(trainArrival),
    $("<td>").text(trainFrequency),
    $("<td>").text(frequency),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

