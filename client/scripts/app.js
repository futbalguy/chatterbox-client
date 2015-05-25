$(document).ready(function(){
	var message = {
	  'username': 'val',
	  'text': 'trololo',
	  'roomname': '4chan'
	};

	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'POST',
	  data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    console.log('chatterbox: Message sent');
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to send message');
	  }
	});

	$.ajax({
	  url: 'https://api.parse.com/1/classes/chatterbox',
	  type: 'GET',
	  //data: JSON.stringify(message),
	  contentType: 'application/json',
	  success: function (data) {
	    var results = data.results;
      for (var i = 0; i < results.length; i++){
        var currentObject = results[i];
	      $('.test').append('<div></div>').append('Username: ' + currentObject.username + 'message: ' + currentObject.text);
      }
      console.log(data);
	    console.log('chatterbox: Message received');
	  },
	  error: function (data) {
	    console.error('chatterbox: Failed to get message');
	  }
	});
});
