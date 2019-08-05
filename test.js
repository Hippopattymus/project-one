var pols = [];
var results;
var pol = "";
var ID;
var name;
var grp = "";
var j = 0;

$(".display-politician").empty();
//intakes location and provides offices on a local, state, and federal level
function displayInfo() {
    var repURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAxErsgI2POFlBroc_QuXNof9gx4cOtzpg&address=%20Sacramento%20CA";
    var Fname = "";
    var Lname = "";
    $.ajax({
        url: repURL,
        method: "GET"
    }).then(function (response) {
        results = response;

        console.log(results);

        for (var i = 0; i < results.officials.length; i++) {
            Fname = response.officials[i].name.split(" ")[0];

            if (response.officials[i].name.includes(".") == true) {
                Lname = response.officials[i].name.split(". ").pop();
            } else {
                Lname = response.officials[i].name.split(" ").pop();
            }

            if (pol == (Fname + " " + Lname)) {

                var polDiv = $("<div class='rounded col-lg-6 col-xs-6' width= 250px>");

                if (response.officials[i].party.charAt(0) == "R") {
                    polDiv.addClass("bg-danger");
                } else if (response.officials[i].party.charAt(0) == "D") {
                    polDiv.addClass("bg-info");
                } else {
                    polDiv.addClass("bg-warning");
                }

                var p = $("<p class = 'pt-2 '>").text(response.officials[i].name);

                p.append("<hr>" + response.officials[i].party);
                p.append("<hr>" + response.officials[i].phones[0]);
                p.append("<hr>" + response.officials[i].urls[0]);
                p.append("<hr> Lorem ipsum dolor sit amet, consectetur adipisicing elit Quibusdam ipsam suscipit, quae inventore doloribus ipsa");


                var img = $("<img class =  'pt-3' height= 150px width= 150px>");
                img.attr("src", response.officials[i].photoUrl);



                polDiv.addClass("pol");
                polDiv.prepend(p);
                polDiv.prepend(img);
                //console.log(polDiv);

                //$("#candidateColContainer").empty();
                $("#politician-display").prepend(polDiv);
                return;
            }

        }
    });

    //info on congress members and votes
    var proPID = "https://api.propublica.org/congress/v1/115/senate/members.json";
    $.ajax({
        url: proPID,
        method: "GET",
        dataType: 'json',
        headers: { 'X-API-Key': 'DfzwwQMoV3GLNmW5UL8qne5wHKFRrYWACsBisfWl' }
    }).then(function (response) {
        console.log(response);
        console.log(response.results[0].members.length);
        console.log(Fname);
        console.log(Lname);

        for (var i = 0; i < response.results[0].members.length; i++) {
            //console.log(response.results[0].members[i].first_name);
            //console.log(response.results[0].members[i].last_name);

            if (Fname == response.results[0].members[i].first_name && Lname == response.results[0].members[i].last_name) {
                ID = response.results[0].members[i].id;
                console.log(ID);
                console.log(response.results[0].members[i]);

            }
        }


    });
}

//search 
function polInfo() {
    var pID;
    //input name of any candidate, provides ID and some info
    var fecURL = "https://api.open.fec.gov/v1/names/candidates/?q=" + pol + "&q=&api_key=C3d9JfIClukpUOVPfcpEaagn6id3DICDlrcrIS8D";

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
    var fecID = "https://api.open.fec.gov/v1/candidate/P80001571/?&api_key=C3d9JfIClukpUOVPfcpEaagn6id3DICDlrcrIS8D";
    $.ajax({
        url: fecID,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        results = response.results[0];

    });
}

function renderDiv(i) {

    var polDiv = $("<div class='card border-0 shadow mb-5 rounded' >");
    polDiv.addClass("pol-" + pols.indexOf(name));

    if (reslgbt[i].party.charAt(0) == "R") {
        polDiv.addClass("bg-danger");
    } else if (reslgbt[i].party.charAt(0) == "D") {
        polDiv.addClass("bg-info");
    } else {
        polDiv.addClass("bg-warning");
    }

    var b = $("<button class='btn' type='button' data-toggle='collapse' aria-expanded='false'>")
    b.attr("data-target", "#collapse" + i);
    b.attr("aria-controls", "collapse" + i);
    var img = $("<img class='card-img-top'>");
    img.attr("src", reslgbt[i].icon);
    var titleDiv = $("<div class='card-headings mx-auto text-center mt-2'>");
    
    titleDiv.append($("<h4 class='card-title'>").text(reslgbt[i].name));
    titleDiv.append($("<h5>").text(reslgbt[i].party));
    titleDiv.append($("<h6>").text(reslgbt[i].title + " of " + reslgbt[i].state));
    b.append(img);
    b.append(titleDiv);

    var divO = $("<div class='collapse'>");
    divO.attr("id", "collapse" + i);
    var divI = $("<div class='card card-body border-0'>");
    bio(divI);

    var x = $('<button class = x rounded>');
    x.attr("val", pols.indexOf(name));
    x.text("X");

    if (reslgbt[i].contact != null) {
        var a = $("<a>");
        a.text("Contact Info");
        a.attr("href", reslgbt[i].contact);
    } else if ((reslgbt[i].contact == null) && (reslgbt[i].linktwitter != null)) {
        var a = $("<a>");
        a.text("Twitter");
        a.attr("href", reslgbt[i].linktwitter);
    } else {
        var a = $("<a>");
        a.text("Facebook");
        a.attr("href", reslgbt[i].linkfacebook);
    }
    divI.append(a);
    divO.append(divI);

    polDiv.append(b);
    polDiv.append(divO);


    console.log($("#display-politicians").childElementCount);


    if ($("group-" + j).childElementCount >= 5 || grp == "") {
        grp = $("<div class='card-group'>");
        grp.attr("id", "group-" + j);
        console.log(grp);
        grp.append(polDiv);
        $(".display-politicians").append(grp);
        j++
    } else {
        grp.append(polDiv);
    }




    polDiv.append(x);
}

function lgbtInfo(lgbtURL) {
    $.ajax({
        url: lgbtURL,
        method: "GET"
    }).then(function (response) {
        reslgbt = response;
        console.log(reslgbt);
        for (var i = 0; i < reslgbt.length; i++) {
            if (pol != "") {
                name = pol;
                pols.push(name);
                renderDiv(i);
                console.log(name);
            } else if (pol == "" && reslgbt[i].state == "ND") {
                name = reslgbt[i].name;
                pols.push(name);
                renderDiv(i);
            }
        }
        pol = "";
        name = "";
    });
}

$("#add-politician").on("click", function (event) {
    event.preventDefault();
    pol = $("#politician-input").val().trim();
    lgbtURL = "https://api.rainbowconnection.me/v1/congress?name=" + pol;
    //displayInfo();
    lgbtInfo(lgbtURL);

    $("#politician-input").val("");

});

$("#add-congress").on("click", function (event) {
    event.preventDefault();
    lgbtURL = "https://api.rainbowconnection.me/v1/congress/all";
    $("#politician-input").val("");

    lgbtInfo(lgbtURL);

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

//calendar
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



    calendar.render();
    // console.log(JSON.stringify(electionResults.elections));

})


function deleteBtn() {
    var del = $(this).attr("val");
    $(".pol-" + del).remove();

}

function hideBtn() {
    var del = $(this).attr("val");

    if ($(this).attr("state") == "hidden") {
        $(".election-" + del).show();
        $(this).attr("state", "shown");
    } else {
        $(".election-" + del).hide();
        $(this).attr("state", "hidden");
    }

}

//delete button
$(document).on("click", ".x", deleteBtn);

function bio(p) {

    var bioURL = "https://en.wikipedia.org/api/rest_v1/page/summary/" + name;

    $.ajax({
        url: bioURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.extract.split(".")[0] + "." + response.extract.split(".")[1] + "." + response.extract.split(".")[2] + "." + response.extract.split(".")[3] + ".");
        var dio = (response.extract.split(".")[0] + "." + response.extract.split(".")[1] + "." + response.extract.split(".")[2] + "." + response.extract.split(".")[3] + ".");

        p.prepend(dio);
    });
}