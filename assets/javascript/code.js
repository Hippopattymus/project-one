var gifs = [];
var results;
var gif;

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



        for (var i = 0; i < results.officials.length; i++) {
            var Fname = response.officials[i].name.split(" ")[0];

            if (response.officials[i].name.includes(".") == true) {
                var Lname = response.officials[i].name.split(". ").pop();
            } else {
                var Lname = response.officials[i].name.split(" ").pop();
            }

            if (gif == (Fname + " " + Lname)) {
                console.log(gif == (Fname + " " + Lname));
                var gifDiv = $("<div class = 'card'>");
                if (response.officials[i].party.charAt(0) == "R") {
                    gifDiv.addClass("bg-danger");
                } else if (response.officials[i].party.charAt(0) == "D") {
                    gifDiv.addClass("bg-info");
                } else {
                    gifDiv.addClass("bg-warning");
                }

                var p = $("<p class = 'ml-1'>").text(response.officials[i].name);
                p.append(":<br>" + response.officials[i].party);
                p.addClass("float-left");

                var img = $("<img height = 100px width = 100px>");
                img.attr("src", response.officials[i].photoUrl);

                gifDiv.addClass("float-left");
                gifDiv.addClass("col-6")
                gifDiv.addClass("pol");
                gifDiv.prepend(p);
                gifDiv.prepend(img);
                console.log(gifDiv);
                $(".politician-display").prepend(gifDiv);
                //$("#candidateColContainer").empty();
                //$("#candidateColContainer").append(gifDiv);
            }
        }
    });

    var proPID = "https://api.propublica.org/congress/v1/80-115/senate/members.json";
    $.ajax({
        url: proPID,
        method: "GET",
        dataType: 'json',
        headers: { 'X-API-Key': 'DfzwwQMoV3GLNmW5UL8qne5wHKFRrYWACsBisfWl' }
    }).then(function (response) {
        console.log(response);


    });
}


function polInfo() {
    var pID;
    //provides name & ID
    var fecURL = "https://api.open.fec.gov/v1/names/candidates/?q=" + gif + "&q=&api_key=C3d9JfIClukpUOVPfcpEaagn6id3DICDlrcrIS8D";

    $.ajax({
        url: fecURL,
        method: "GET"
    }).then(function (response) {
        var res = response.results;
        pID = res[0].id;
        console.log(pID);
        console.log(response);
    });
    //uses ID to get politician info
    var fecID = "https://api.open.fec.gov/v1/candidate/" + pID + "/?&api_key=C3d9JfIClukpUOVPfcpEaagn6id3DICDlrcrIS8D";
    $.ajax({
        url: fecID,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        results = response.results[0];

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
    polInfo();

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

    $(".left-bar").empty();
    for (var i = 0; i < electionResults.elections.length; i++) {

        var r = $("<div class = 'row'>");

        var a = $("<button class = 'rounded mr-1 col-10'>");
        a.addClass("elections-" + i);
        a.attr("val", i);
        a.addClass("float-left");

        var x = $('<button class = x rounded>');
        x.attr("val", i);
        x.text("X");
        x.addClass("float-right");

        //a.addClass("btn-info");
        a.attr("data-name", gifs[i]);
        a.text(electionResults.elections[i].electionDay.split("9-").pop());
        a.append("<br>" + electionResults.elections[i].name);

        //.append(x);
        r.append(a);
        r.append(x);
        r.attr("state", "hidden");
        $(".left-bar").append(r);
        //$(".left-bar").append(x);
    }

});



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


