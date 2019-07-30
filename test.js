// $.getJSON("https://api.open.fec.gov/v1/candidates/totals/?office=P&election_full=false&per_page=20&cycle=2020&min_receipts=100000&sort_null_only=false&sort_nulls_last=false&page=1&sort_hide_null=false&api_key=C3d9JfIClukpUOVPfcpEaagn6id3DICDlrcrIS8D", 
// function(response) {
//     console.log(response.results[0]);
//     console.log("Election Year: " + response.results[0].election_year);
//     console.log("Has raised funds: " + response.results[0].has_raised_funds);
//     console.log(response.results[0].address_city + ', ' + response.results[0].address_state);
//     console.log(response.results[0].party_full);
//     console.log(response.results[0].office_full);
//     console.log(response.results[0].incumbent_challenge_full);
//     console.log(response.results[0].name);

//     $.each(response.results, function(i, item){
//         $('#body').append('<li>'+ item.name +'</li>');
//     })
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


document.addEventListener('DOMContentLoaded', function() {

    var calendarEl = document.getElementById('calendar');

    var calendar = new FullCalendar.Calendar(calendarEl, {
      plugins: [ 'list' ],

      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'listDay,listWeek,dayGridMonth'
      },

      // customize the button names,
      // otherwise they'd all just say "list"
      views: {
        listDay: { buttonText: 'list day' },
        listWeek: { buttonText: 'list week' }
      },

      defaultView: 'listWeek',
      defaultDate: '2019-06-12',
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      eventLimit: true, // allow "more" link when too many events
      events: [
        {
          title: electionResults.elections[i].electionDay,
          start: '2019-06-01'
        },
        {
          title: 'Long Event',
          start: '2019-06-07',
          end: '2019-06-10'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2019-06-09T16:00:00'
        },
        {
          groupId: 999,
          title: 'Repeating Event',
          start: '2019-06-16T16:00:00'
        },
        {
          title: 'Conference',
          start: '2019-06-11',
          end: '2019-06-13'
        },
        {
          title: 'Meeting',
          start: '2019-06-12T10:30:00',
          end: '2019-06-12T12:30:00'
        },
        {
          title: 'Lunch',
          start: '2019-06-12T12:00:00'
        },
        {
          title: 'Meeting',
          start: '2019-06-12T14:30:00'
        },
        {
          title: 'Happy Hour',
          start: '2019-06-12T17:30:00'
        },
        {
          title: 'Dinner',
          start: '2019-06-12T20:00:00'
        },
        {
          title: 'Birthday Party',
          start: '2019-06-13T07:00:00'
        },
        {
          title: 'Click for Google',
          url: 'http://google.com/',
          start: '2019-06-28'
        }
      ]
    });

    calendar.render();
  })
});