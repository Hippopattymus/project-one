var gifs = [];
var results;
var gif;
var x;
function displayInfo() {
    var repURL = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyAxErsgI2POFlBroc_QuXNof9gx4cOtzpg&address=9901%20Jetmar%20Way.%20Elk%20Grove%20CA";
    $.ajax({
        url: repURL,
        method: "GET"
    }).then(function (response) {
        results = response;
        resultsURL = response.officials[0].photoUrl;
        resultsName = response.officials[0].name;
        
        console.log(results);
        
        console.log(response.officials[0].photoUrl);
        $(".politician-display").empty();
        for (var i = 0; i < 2; i++) {
    
            var gifDiv = $("<div class = 'card'>");
    
            //var rating = results[i].rating;
            var p = $("<p class = 'ml-1'>").text(response.offices[0].name);
            p.append(":<br>" + resultsName);
            p.addClass("float-left");
    
            var img = $("<img height = 100px width = 100px>");
            img.attr("src", resultsURL);
            
            gifDiv.addClass("float-left");
           // gifDiv.addClass("col-6")
            gifDiv.addClass("pol");
            gifDiv.prepend(p);
            gifDiv.prepend(img);
    
            $(".politician-display").prepend(gifDiv);
           
        }
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
    gif = $("#politician-input").val();
    $("#politician-input").val("");
    gifs.push(gif);
    displayInfo();
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
    
    console.log(electionResults);
    
   //console.log(electionResults.officials[0].name);
   // renderGifs();
    //renderButtons();
    $(".left-bar").empty();
    for (var i = 0; i < electionResults.elections.length; i++) {
        var a = $("<button class = 'rounded mr-1 col-12'>");
        a.addClass("elections-" +i);
        a.attr("val", i);
        x = $('<button class = x rounded>');
        x.attr("val", i);
        x.text("X");
        
        
        //a.addClass("btn-info");
        a.attr("data-name", gifs[i]);
   
        a.text(electionResults.elections[i].electionDay);
        a.append(x);
        $(".left-bar").prepend(a);
}
});
function deleteBtn() {
    var del = $(this).attr("val");
    $(".elections-"+del).empty();
}
//delete button
$(document).on("click", ".x", deleteBtn);