  //query string (grabs variable from url that was passed from another file)
//pull queryString, convert to array, and assign to variable
var pulledId = location.search.split("");
console.log(pulledId.length);

//convert array back to string after getting rid of unneeded characters 
recipeId = pulledId.splice(10,10).join("");


  function getArtistTrack(artist) {

    // Running an initial search to identify the artist's unique Spotify id
    var queryURL = "https://api.spotify.com/v1/search?q=" + artist + "&type=artist";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {

      // Printing the entire object to console
      console.log(response);

      // Printing the artist id from the Spotify object to console
      var artistID = response.artists.items[0].id;

      // Building a SECOND URL to query another Spotify endpoint (this one for the tracks)
      var queryURLTracks = "https://api.spotify.com/v1/artists/" + artistID + "/top-tracks?country=US";

      // Running a second AJAX call to get the tracks associated with that Spotify id
      $.ajax({
        url: queryURLTracks,
        method: "GET"
      }).done(function(trackResponse) {

        // Logging the tracks
        console.log(trackResponse);

        // Building a Spotify player playing the top song associated with the artist
        // (NOTE YOU NEED TO BE LOGGED INTO SPOTIFY)
        var player = "<iframe src='https://embed.spotify.com/?uri=spotify:track:" +
          trackResponse.tracks[0].id +
          "' frameborder='0' allowtransparency='true'></iframe>";

        // Appending the new player into the HTML
        $("#player-div").html(player);
      });
    });
  }

  // Event handler for user clicking the select-artist button
  $("#select-artist").on("click", function(event) {
    // Preventing the button from trying to submit the form
    event.preventDefault();
    // Storing the artist name
    var artist = $("#artist-input").val().trim();

    // Running the getArtistTrack (passing in the artist as an argument)
    getArtistTrack(artist);

  });
