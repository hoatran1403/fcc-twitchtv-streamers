$('document').ready(function() {
  var usernames = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "comster404","brunofin"];
  var streams = [];
  var users = [];
  var channels = [];
  /**
   * Data setup
   **/

  // Get data from twitchtv treams api
  var getStream = function(stream) {
    return $.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + stream + "?callback=?");
  };

  // Get data from twitchtv users api
  var getUser = function(user) {
    return $.getJSON("https://wind-bow.gomix.me/twitch-api/users/" + user + "?callback=?");
  };

  // Get data from twitchtv users api
  var getChannel = function(channel) {
    return $.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + channel + "?callback=?");
  };

  /**
   * Display UI
   **/
  //populate channel lists to UI
  var displayChannels = function(user, stream, channel) {

    if (typeof(user.display_name) == "undefined") {
      console.log(user.display_name);
      $("#notification").append('<div class="alert alert-danger alert-dismissable">' +
        '<a href="#" class="close" data-dismiss="alert" aria-label="close">×</a>' +
        user.message +
        '</div>');
      return;
    }

    if (stream.stream !== null) {

      $("#channels").append('<li class="list-group-item list-group-item-info row">' +
        '<div class="col-md-1"><img class="img-rounded" alt="channel logo" src="' + user.logo + '"></img></div>' +
        '<a href="' + channel.url + '" class="col-md-5" target="_blank">' + user.display_name + '</a>' +
        '<p class="col-md-6"><strong>' + stream.stream.game + ': ' + stream.stream.channel.status + '</strong></p>' +
        '</li>');

    } else {

      $("#channels").append('<li class="list-group-item list-group-item-info row">' +
        '<div class="col-md-1"><img class="img-rounded" alt="channel logo" src="' + user.logo + '"></img></div>' +
        '<a href="' + channel.url + '" class="col-md-5" target="_blank">' + user.display_name + '</a>' +
        '<p class="col-md-6">offline</p>' +
        '</li>');
    }
  };

   //set data to Users Array
  var setData = function() {
    $.each(usernames, function(index, value) {
      getUser(value).then(function(user) {
        users.push(user);
        getStream(value).then(function(stream) {
          streams.push(stream);
          getChannel(value).then(function(channel) {
            channels.push(channel);
            displayChannels(user, stream, channel);
          });

        });

      });
    });
  }

  setData();
});
