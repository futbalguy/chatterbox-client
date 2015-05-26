$(document).ready(function(){

  var userName = "Aaron Rodgers peace and love";
  var currentRoomName = "";
  var roomNames = [];
  var allMessages = [];

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
      //establish list of all current chat rooms
      if (roomNames.indexOf(roomNameText) === -1) {
        roomNames.push(roomNameText);
        addRoomName(roomNameText)
      }
      //checks to see what chat room has been selected and shows messages accordingly
      if (currentRoomName === "" || roomNameText === currentRoomName){
        var escName = _.escape(currentObject.username);
        var escText = _.escape(currentObject.text);
        $('.messageBody').append('<div></div>').append('Username: ' + escName + '\nmessage: ' + escText);
      }
    }
  };

  $('#getMessages').on('click',function() {
    getMessages();
  });

  $('#sendMessage').on('click',function() {
    postMessage(userName, $('#message').val(),currentRoomName);
    $('#message').val('')
  });

  $('#usr').on('keyup',function() {
    userName = $(this).val();
  });

  $('.dropdown').on('click', "a", function(){
    currentRoomName = $(this).text();
    $('#menu1').html(currentRoomName + ' <span class="caret"></span>');
    refreshMessageBody();
  });

  getMessages();
});
