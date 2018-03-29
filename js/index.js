var apiUsers  = ["ESL_SC2", "OgamingSC2", "Cretetion", "Freecodecamp", "Storbeck", "Habathcx", "RobotCaleb", "Noobs2ninjas", "Ninja"]

var imgDictionary = {};

document.getElementById ("all").addEventListener ("click",function (){ checkOnlineStatus('all')}, false);
document.getElementById ("offline").addEventListener ("click",function(){ checkOnlineStatus('offline')}, false);
document.getElementById ("online").addEventListener ("click", function(){ checkOnlineStatus('online')}, false);

function apiImage(user){
  var userUrl = 'https://wind-bow.gomix.me/twitch-api/channels/' + user;
  $.ajax({
    type:'GET',
    url: userUrl,
          dataType: "jsonp",
    success: function(data){
      return imgDictionary[user] = data.logo
    }})
}

function apiCall(user, status){
  var userUrl = 'https://wind-bow.gomix.me/twitch-api/streams/' + user;

  $.ajax({
    type:'GET',
    url: userUrl,
    /*contentType: "application/json; charset=utf-8",
			async: false,*/
        	dataType: "jsonp",
    success: function(data){
      return addRows(data, user, status);
    }})}

function checkOnlineStatus(status){
  $("#content").html("");
  apiUsers.forEach(function(element){
    apiImage(element);
    apiCall(element, status);
  })}

function addRows(apiInfo, user, status){
  if (status === "all"){
    //$('#content').addClass('animated fadeInUp');
    if (apiInfo.stream){
      $("#content").append("<div class='row users'><div class='col'><img class='img-fluid' height:100% src='"+ imgDictionary[user] +"'>   <a href = https://www.twitch.tv/" + user +">"+ apiInfo.stream.channel.display_name + "</a></div> <div class='col align-items-end'><p class='text-right'>"+apiInfo.stream.channel.game+" - "+apiInfo.stream.channel.status+"</p></div></div>");}
  else {
      $("#content").append("<div class='row users'><div class='col'><img class='img-fluid' height:100% src="+ imgDictionary[user] +">   <a href=https://www.twitch.tv/"+user+">"+user+"</a></div> <div class='col align-items-end'><p class='text-right'> Offline </p></div></div>")}}
  else if(status==="online"){
    console.log('online was clicked');
    if (apiInfo.stream){
      $("#content").append("<div class='row users'><div class='col'><img class='img-fluid' height:100% src="+ imgDictionary[user] +">   <a href = https://www.twitch.tv/" + user +">"+ apiInfo.stream.channel.display_name + "</a></div> <div class='col align-items-end'><p class='text-right'>"+apiInfo.stream.channel.game+" - "+apiInfo.stream.channel.status+"</p></div></div>");}
  }
  else if (status === "offline") {
    console.log('offline was clicked');
    if(apiInfo.stream === null){
      $("#content").append("<div class='row users'><div class='col'><img class='img-fluid' height:100% src="+ imgDictionary[user] +">   <a href=https://www.twitch.tv/"+user+">"+user+"</a></div> <div class='col align-items-end'><p class='text-right'> Offline </p></div></div>")}}
  }

checkOnlineStatus('all');