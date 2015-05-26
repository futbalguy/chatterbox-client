$(document).ready(function(){

  var userName = "Aaron Rodgers peace and love";
  var currentRoomName = "To All Rooms";
  var roomNames = [];
  var allMessages = [];
  var friends = [];

  var postMessage = function(username,text,roomName) {
    var message = {
      'username': _.escape(username),
      'text': _.escape(text),
      'roomname': _.escape(roomName)
    };

    var messageJSON = JSON.stringify(message);


    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: messageJSON,
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        console.log(data);
        getMessages();
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  };


  var getMessages = function () {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        allMessages = data.results;
        refreshMessageBody();
        console.log(data);
        console.log('chatterbox: Message received');
      },
      error: function (data) {
        console.error('chatterbox: Failed to get message');
      }
    });
  };

  var addRoomName = function(roomName) {
    $('.dropdown-menu').prepend('<li id=' + roomName + ' role="presentation"><a role="menuitem" tabindex="-1" href="#">' + roomName + '</a></li>');
  };

  var refreshMessageBody = function () {
    $('.messageBody').html('');
    for (var i = 0; i < allMessages.length; i++){
      var currentObject = allMessages[i];

      var roomNameText = _.escape(currentObject.roomname);
      var escName = _.escape(currentObject.username);
      var escText = _.escape(currentObject.text);
      //establish list of all current chat rooms
      if (roomNames.indexOf(roomNameText) === -1) {
        roomNames.push(roomNameText);
        addRoomName(roomNameText)
      }

      //checks to see what chat room has been selected and shows messages accordingly
      if (currentRoomName === "To All Rooms" || roomNameText === currentRoomName){
        var element = $('.messageBody').append('<div></div>').append('<div class="' + escName.replace(/\s/g,"_") + '"><a href=# class="userLink" data-info="' + escName + '">' + escName + ': </a>' + escText + '</div><br>');
      }
    }

      for (var i = 0; i < friends.length; i++) {
        var friend = friends[i].replace(/\s/g, "_");
        console.log($('.' + friend));
        $('.' + friend).attr('class','friend');
      }
  };

  $('#getMessages').on('click',function() {
    getMessages();
  });

  $('#sendMessage').on('click',function() {
    postMessage(userName, $('#message').val(),currentRoomName);
    $('#message').val('');
  });

  $('#usr').on('keyup',function() {
    userName = $(this).val();
  });

  $('.dropdown').on('click', "a", function(){
    currentRoomName = $(this).text();
    $('#menu1').html(currentRoomName + ' <span class="caret"></span>');
    refreshMessageBody();
  });

  $('.dropdown').on('click','#newroom', function(){
    var response = prompt("What chat room would you like to create?");
    currentRoomName = response;
    if(roomNames.indexOf(response) === -1) {
      addRoomName(response);
      roomNames.push(response);
    }
    $('#menu1').html(response + ' <span class="caret"></span>');
    refreshMessageBody();
  });

  $('.messageBody').on('click','.userLink',function() {
    var user = $(this).attr('data-info');
    if (friends.indexOf(user) === -1) {
      friends.push(user);
    }
    getMessages();

  });

  getMessages();
});
