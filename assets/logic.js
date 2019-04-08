var config = {
    apiKey: "AIzaSyDJittP7Y3V2oy8Oe46taA8l27VHOo7z0E",
    authDomain: "train-schedule-mcma.firebaseapp.com",
    databaseURL: "https://train-schedule-mcma.firebaseio.com",
    projectId: "train-schedule-mcma",
    storageBucket: "train-schedule-mcma.appspot.com",
    messagingSenderId: "938777316773"
};
firebase.initializeApp(config);


var database = firebase.database();

$("#submit-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var trainTime = moment($("#first-input").val().trim(), 'HH:mm').format('LT');
    var frequency = $("#frequency-input").val().trim();

    var newTrain = {
        TrainName: trainName,
        Destination: destination,
        Time: trainTime,
        Frequency: frequency
    };

    database.ref("schedule").push(newTrain);

    console.log(newTrain.TrainName);
    console.log(newTrain.Destination);
    console.log(newTrain.Time);
    console.log(newTrain.Frequency);

    alert("Train Added");

    $("#name-input").val("");
    $("#destination-input").val("");
    $("#first-input").val("");
    $("#frequency-input").val("");
});

database.ref("schedule").on('child_added', function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().TrainName;
    var destination = childSnapshot.val().Destination;
    var trainTime = childSnapshot.val().Time;
    var frequency = childSnapshot.val().Frequency;


    console.log(trainName);
    console.log(destination);
    console.log(trainTime);
    console.log(frequency);

    var firstTimeConverted = moment(trainTime, "LT").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment().format('LT');
    console.log("CURRENT TIME: " + moment(currentTime).format('LT'));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % frequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = frequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format('LT'));




    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(nextTrain),
        $("<td>").text(tMinutesTillTrain),

    );

    $("#schedule-table > tbody").append(newRow);
});



