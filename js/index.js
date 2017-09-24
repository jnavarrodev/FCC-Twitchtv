var channels = [
  "ESL_SC2",
  "OgamingSC2",
  "cretetion",
  "freecodecamp",
  "storbeck",
  "habathcx",
  "RobotCaleb",
  "theno1alex",
  "noobs2ninjas"
];

$(document).ready(function() {
  genereateList();
});

//Show resutls on page
function genereateList() {
  channels.forEach(function(channel) {
    twitchAPI(channel);
  });
}

function twitchAPI(channel) {
  $.ajax({
    url: "https://wind-bow.glitch.me/twitch-api/users/" + channel,
    dataType: "jsonp",
    success: function(channelResponse) {
      if (channelResponse.error == "Not Found") {
        $("#channelList").append(channelResponse.message);
      } else {
        var li;
        $.ajax({
          url: "https://wind-bow.glitch.me/twitch-api/streams/" + channel,
          dataType: "jsonp",
          success: function(streamResponse) {
            if (streamResponse.stream == null) {
              li =
                '<li class="list-group-item offline"><img src=' +
                channelResponse.logo +
                ' alt="404"><a href=' +
                channelResponse._links.self +
                ' target="_blank">' +
                '<p class="ch_name">' +
                channelResponse.display_name +
                '</a></p><p class="ch_info">Offline</p></li>';
            } else {
              li =
                '<li class="list-group-item online"><img src=' +
                channelResponse.logo +
                ' alt="404"><a href=' +
                channelResponse._links.self +
                ' target="_blank">' +
                '<p class="ch_name">' +
                channelResponse.display_name +
                '</a></p><p class="ch_info">' +
                streamResponse.stream.game +
                "</p></li>";
            }
            $("#channelList").append(li);
          }
        });
      }
    }
  });
}

document.getElementById("bt_online").onclick = function() {
  var list_info = document.getElementsByClassName("ch_info");
  for (j = 0; j < list_info.length; j++) {
    var ch_info = list_info[j].innerText;
    if (ch_info == "Offline") {
      list_info[j].parentElement.style.display = "none";
    } else {
      list_info[j].parentElement.style.display = "";
    }
  }
};

document.getElementById("bt_offline").onclick = function() {
  var list_info = document.getElementsByClassName("ch_info");
  for (j = 0; j < list_info.length; j++) {
    var ch_info = list_info[j].innerText;
    if (ch_info == "Offline") {
      list_info[j].parentElement.style.display = "";
    } else {
      list_info[j].parentElement.style.display = "none";
    }
  }
};

document.getElementById("bt_all").onclick = function() {
  var list_info = document.getElementsByClassName("ch_info");
  for (j = 0; j < list_info.length; j++) {
    var ch_info = list_info[j].innerText;
    list_info[j].parentElement.style.display = "";
  }
};