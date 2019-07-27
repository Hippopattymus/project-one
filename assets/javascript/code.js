var gifs = ["Cats", "Memes", "Food", "Sleep"];
var results;
var gif;

function displayInfo() {
    gif = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gif + "&api_key=S0s43WOAT4jzNdL4GICYdNrVfDl0MWMH&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        results = response.data;
        renderGifs();
    });
}

// function renderButtons() {
//     $("#buttons-view").empty();
//     for (var i = 0; i < gifs.length; i++) {
//         var a = $("<button class = 'rounded mr-1'>");
//         a.addClass("movie");

//         //a.addClass("btn-info");
//         a.attr("data-name", gifs[i]);
//         a.text(gifs[i]);
//         $("#buttons-view").append(a);
//     }
// }

function renderGifs() {
    $(".politician-display").empty();
    for (var i = 0; i < results.length; i++) {



        var gifDiv = $("<div class = 'card'style=' width:276px'>");

        var rating = results[i].rating;
        var p = $("<p class = 'ml-1'>").text("Rating: " + rating);

        var img = $("<img>");
        img.attr("src", results[i].images.fixed_height_still.url);

        img.attr("data-still", results[i].images.fixed_height_still.url);
        img.attr("data-animate", results[i].images.fixed_height.url);
        img.attr("data-state", "still");
        img.attr("class", "still");

        console.log(results[i].images.fixed_height_still.url);
        gifDiv.addClass("float-left")
        //gifDiv.addClass("col-2")
        gifDiv.addClass("gif");
        gifDiv.prepend(p);
        gifDiv.prepend(img);

        $(".politician-display").prepend(gifDiv);
    }
}
$("#add-politician").on("click", function (event) {
    event.preventDefault();
    var gif = $("#politician-input").val();
    $("#politician-input").val("");
    gifs.push(gif);
    gifs.attr("date-state", gifs[i]);
    // renderButtons();
    displayInfo();

});

$(document).on("click", ".still", function (event) {

    var state = $(this).attr("data-state");
    console.log(state);
    if (state == "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

$(document).on("click", ".movie", displayInfo);



// renderButtons();