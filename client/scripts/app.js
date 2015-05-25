$(document).ready(function(){

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
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });

  };


	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET',
	  //data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    var results = data.results;
      for (var i = 0; i < results.length; i++){
        var currentObject = results[i];

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

  postMessage("valkyrie","hi","notre dame football")
});
