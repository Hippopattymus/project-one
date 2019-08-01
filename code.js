var gifs = [];
var results;
var gif;
var candidateBio;

function displayInfo() {
    var repURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAxErsgI2POFlBroc_QuXNof9gx4cOtzpg&address=%20Sacramento%20CA";

    $.ajax({
        url: repURL,
        method: "GET"
    }).then(function (response) {
        results = response;
        //resultsURL = 
        //resultsName = response.officials[0].name;

        console.log(results);

        console.log(response.officials[0].photoUrl);
        console.log(gif);
        console.log(response.officials[0].name.split(". ").pop());
        console.log(response.officials[0].name.split(" ")[0]);
        $(".politician-display").empty();
        for (var i = 0; i < results.officials.length; i++) {
            var Fname = response.officials[0].name.split(" ")[0];

            console.log(response.officials[0].name.includes("."));
            if (response.officials[i].name.includes(".") == true) {
                var Lname = response.officials[i].name.split(". ").pop();
            } else {
                console.log(response.officials[i].name.split(" ").pop());
                var Lname = response.officials[i].name.split(" ").pop();
            }

            console.log(gif == (Fname + " " + Lname));
            // var Lname = response.officials[0].name.split(". ").pop();
            if (gif == (Fname + " " + Lname)) {
                console.log(gif == (Fname + " " + Lname));
                var gifDiv = $("<div class = 'card'>");

                //var rating = results[i].rating;
                var p = $("<p class = 'ml-1'>").text(response.offices[i].name);
                p.append(":<br>" + response.officials[i].name);
                p.addClass("float-left");

                var img = $("<img height = 100px width = 100px>");
                img.attr("src", response.officials[i].photoUrl);

                gifDiv.addClass("float-left");
                // gifDiv.addClass("col-6")
                gifDiv.addClass("pol");
                gifDiv.prepend(p);
                gifDiv.prepend(img);
                console.log(gifDiv);
                $(".politician-display").prepend(gifDiv);
            }
        }
    });
}
var id;

function polInfo() {

    var fecURL = "https://api.open.fec.gov/v1/names/candidates/?q=" + gif + "&q=&api_key=C3d9JfIClukpUOVPfcpEaagn6id3DICDlrcrIS8D";

    $.ajax({
        url: fecURL,
        method: "GET"
    }).then(function (response) {
        results = response.results;
        id = results[0];
        console.log(id);
        console.log(results);

        //console.log(response.officials[0].photoUrl);

        $(".politician-display").empty();
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class = 'card'>");

            //var rating = results[i].rating;
            var p = $("<p class = 'ml-1'>").text(results[0].name);
            p.append(id);
            p.addClass("float-left");

            var img = $("<img height = 100px width = 100px>");
            // img.attr("src", resultsURL);

            gifDiv.addClass("float-left");
            // gifDiv.addClass("col-6")
            gifDiv.addClass("pol");
            gifDiv.prepend(p);
            gifDiv.prepend(img);

            $(".politician-display").prepend(gifDiv);

        }
    });

    // var fecID = "https://api.open.fec.gov/v1/candidate/" + id + "/?&api_key=C3d9JfIClukpUOVPfcpEaagn6id3DICDlrcrIS8D";
    // $.ajax({
    //     url: fecID,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     res = response.results[0];

    // });


    var proPID = "https://api.propublica.org/congress/v1/80-115/senate/members.json";
    $.ajax({
        url: proPID,
        method: "GET",
        dataType: 'json',
        headers: {
            'X-API-Key': 'DfzwwQMoV3GLNmW5UL8qne5wHKFRrYWACsBisfWl'
        }
    }).then(function (response) {
        console.log(response);


    });

}


// function renderButtons() {
//     $(".left-bar").empty();
//     for (var i = 0; i < results.elections.length; i++) {
//         var a = $("<button class = 'rounded mr-1 col-12'>");
//         a.addClass("movie");

//         //a.addClass("btn-info");
//         a.attr("data-name", gifs[i]);

//         //a.text(electionResults);
//         $(".left-bar").append(a);
//     }
// }


$("#add-politician").on("click", function (event) {
    event.preventDefault();
    gif = $("#politician-input").val().trim();
    $("#politician-input").val("");
    gifs.push(gif);


    displayInfo();
    //polInfo();

});

// $(document).on("click", ".still", function (event) {

//     var state = $(this).attr("data-state");
//     console.log(state);
//     if (state == "still") {
//         $(this).attr("src", $(this).attr("data-animate"));
//         $(this).attr("data-state", "animate");
//     } else {
//         $(this).attr("src", $(this).attr("data-still"));
//         $(this).attr("data-state", "still");
//     }
// });




var electionsURL = "https://www.googleapis.com/civicinfo/v2/elections?key=AIzaSyAxErsgI2POFlBroc_QuXNof9gx4cOtzpg";
$.ajax({
    url: electionsURL,
    method: "GET"
}).then(function (response) {
    var electionResults = response;

    var calendarEl = document.getElementById('calendar');
    $(".left-bar").empty();

    let events = [];
    for (let i = 0; i < response.elections.length; i++) {
        events.push({
          title: response.elections[i].name,
          start: response.elections[i].electionDay
        });
    
        // console.log(response.elections[i]);
      }
    

    var calendar = new FullCalendar.Calendar(calendarEl, {
        plugins: ['list'],

        header: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth'
        },

        views: {
            listMonth: { buttonText: 'list month' },
            // listWeek: { buttonText: 'list week' }
          },

        defaultView: 'listMonth',
        defaultDate: '2019-08-01',
        navLinks: false, // can click day/week names to navigate views
        editable: false,
        eventLimit: false, // allow "more" link when too many events
        events: events
});

    // console.log(events);

    calendar.render();
    // console.log(JSON.stringify(electionResults.elections));
    // console.log(electionResults.elections[1].name);
    // console.log(electionResults.elections[1].electionDay)
})






// for (var i = 0; i < electionResults.elections.length; i++) {

//     var r = $("<div class = 'row'>");

//     var a = $("<button class = 'rounded mr-1 col-10'>");
//     a.addClass("elections-" + i);
//     a.attr("val", i);
//     a.addClass("float-left");

//     var x = $('<button class = x rounded>');
//     x.attr("val", i);
//     x.text("X");
//     x.addClass("float-right");

//     a.addClass("btn-info");
//     a.attr("data-name", gifs[i]);
//     a.text(electionResults.elections[i].electionDay.split("9-").pop());
//     a.append("<br>" + electionResults.elections[i].name);

//     //.append(x);
//     r.append(a);
//     r.append(x);
//     r.attr("state", "hidden");
//     $(".left-bar").append(r);
//     //$(".left-bar").append(x);


// var calendarEl = document.getElementById('calendar');

// var calendar = new FullCalendar.Calendar(calendarEl, {
//   plugins: [ 'list' ],

//   header: {
//     left: 'prev,next today',
//     center: 'title',
//     right: 'dayGridMonth'
//   },

//   // customize the button names,
//   // otherwise they'd all just say "list"
//   views: {
//   },

//   defaultView: 'listMonth',
//   defaultDate: '2019-06-12',
//   navLinks: true, // can click day/week names to navigate views
//   editable: true,
//   eventLimit: true, // allow "more" link when too many events

//   function calendarRender(){

//   for (var i = 0; i < electionResults.elections.length; i++) {
//   events: [
//     {
//       title: electionResults.elections[i].electionDay,
//       start: '2019-06-01'
//     },
//     {

//     }
// ]

function deleteBtn() {
    var del = $(this).attr("val");

    if ($(this).attr("state") == "hidden") {
        $(".elections-" + del).show();
        $(this).attr("state", "shown");
    } else {
        $(".elections-" + del).hide();
        $(this).attr("state", "hidden");
    }

}

//delete button
$(document).on("click", ".x", deleteBtn);

//ajax call for wiki bio snippets



var bioURL = "https://en.wikipedia.org/api/rest_v1/page/summary/Bernie_Sanders";

$.ajax({
    url: bioURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
   $("#pol-1").text(response.extract)
});

