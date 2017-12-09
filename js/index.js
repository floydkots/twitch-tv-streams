var users = ["ESL_SC2","OgamingSC2","MedryBW","cretetion","freecodecamp","storbeck","brunofin","habathcx","RobotCaleb","noobs2ninjas","comster404"];

var allResults = $("#allResults");
var offlineResults = $("#offlineResults");
var onlineResults = $("#onlineResults");

function createListItem(name,exists, i){
  var listItem = $("<a></a>").attr({"href": "https://www.twitch.tv/" + name,
                                    "target": "_blank",
                                    "class": "list-group-item list-group-item-action",
                                    "id": name});
  if (!exists){
    listItem.addClass("list-group-item-danger");
    listItem.attr("href", "#");
  }
  return listItem
}

function createLogo(src, displayName){
  var logo = $("<img>").attr({"src": src,
                              "alt": displayName,
                              "class": "img-fluid"});
  return logo;
}

function createTitle(displayName){
  var title = $("<h3></h3>").append(displayName);
  return title;
}

function createStatus(status){
  var myStatus = $("<p></p>").append(status);
  return myStatus;
}

function createMissing(message){
  return $("<p></p>").append(message);
}
for (var i = 0; i < users.length; i++){

  $.ajax({
    url: "https://wind-bow.gomix.me/twitch-api/users/"+ users[i],
    dataType: "jsonp",
    success: function(response){
      if (response.status === 404){
        var item = createListItem("",false, i);
        item.append(createMissing(response.message));
        allResults.append(item);
      } else {
        var item = createListItem(response.name, true, i);
        item.append(createLogo(response.logo));
        item.append(createTitle(response.display_name));
        allResults.append(item);
      }
    },
    fail: function(response){
      console.log("error: ", response);
    },
    error: function(response){
      console.log("error: ", response);
    },
    always: function(response){
      console.log("request made.");
    }
  });
  
  $.ajax({
    url: "https://wind-bow.gomix.me/twitch-api/streams/"+ users[i],
    username: users[i].toLowerCase(),
    dataType: "jsonp",
    success: function(response){
      var originalItem = $("#"+this.username);
      if (response.stream){
        originalItem.append(createStatus(response.stream.channel.status));
        onlineResults.append(originalItem.clone(true));
        console.log("online:", this.username);
      } else {
        offlineResults.append(originalItem.clone(true));
        console.log("offline:", this.username);
      }
    },
    fail: function(response){
      console.log("error: ", response);
    },
    error: function(response){
      console.log("error: ", response);
    },
    always: function(response){
      console.log("request made.");
    }
  });





};