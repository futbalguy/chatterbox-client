$(document).ready(function(){

  var userName = "Aaron Rodgers peace and love";
  var roomName = "notre dame football";

  var roomNames = [];

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
      //data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        var results = data.results;
        for (var i = 0; i < results.length; i++){
          var currentObject = results[i];
          var roomNameText = _.escape(currentObject.roomname);

          if (roomNames.indexOf(roomNameText) === -1) {
            roomNames.push(roomNameText);
            addRoomName(roomNameText)
          }

          var escName = _.escape(currentObject.username);
          var escText = _.escape(currentObject.text);
          $('.test').append('<div></div>').append('Username: ' + escName + '\nmessage: ' + escText);
        }


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

  $('#getMessages').on('click',function() {
    getMessages();
  });

  $('#sendMessage').on('click',function() {
    postMessage(userName, $('#message').val(),roomName);
    $('#message').val('')
  });

  $('#usr').on('keyup',function() {
    userName = $(this).val();
  });

  $('.dropdown-menu li').on('click', function(){

  });

  getMessages();
});
