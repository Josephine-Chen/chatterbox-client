/*
1. Set up selector for chatroom (need a default room or be able to create a room)
2. Get which chatroom message objects needs
3. Pull username and put into message object
4. Pull message and put into message object
5. 2-4 are inside send (message)
6. RenderMessage inside renderRoom, fetch new messages every x seconds
7. Create a button to clear messages

*/
var sample = {
  username: 'Mel Brooks',
  text: 'I didn\'t get a harumph outa that guy.!',
  roomname: 'lobby'
};
var messages1;
var app = {
  init: function() {},

  send: function(message) {
    $.ajax({
      type: 'POST',
      //url: url,
      data: JSON.stringify(message),
      // success: success,
      dataType: 'text',
    });
  },
  fetch: function(handleData) {
    var messages = $.ajax({
      type: 'GET',
      url: 'https://api.parse.com/1/classes/messages',
      dataType: 'json',
      success: function(data) {
        //send the data.results to another function
        //send it to the render messsage function
        //
        console.log('success');
        app.renderRoom(data.results);
        app.renderMessage(data.results);
      },
      error: function(error) { console.log(error); },
      contentType: 'application/json'
    });
    return messages;
  },
  clearMessages: function() {
    $('#chats').empty();
  },
  renderMessage: function(message) {
    //<text class = username>message.username</text>
    //</text> message.text </text>
    for (var i = 0; i < message.length; i++) {
      $('#chats').append('<div>' + message[i].text + '<br></br><text class = username>' + message[i].username + ':</text></div>');
    }



    //$('#chats').append('<div>' + message.text + '</div>');
    //$('#main').append('<div class = username>' + message.username + '</div>');
  },
  renderRoom: function(room) {
    $('#roomSelect').append('<div>' + room + '</div>');
    var roomList = [];
    for (var i = 0; i < room.length; i++) {
      if (roomList.indexOf(room[i].roomname) === -1) {
        roomList.push(room[i].roomname);
        $('#myDropdown').append('<div id = "roomSelect">' + room[i].roomname + '</div>');
      }
    }
    //app.fetch();
    //Fetch the messages
    //Find the room and filter by it
    //Render those messages

  },
  handleUsernameClick: function() {
  },
  handleSubmit: function() {
    //console.log('submit');
    //app.send(sample);
   //renderMessage
  },
};

(function() {
  $(document).ready(function() {
    //console.log("test");
    console.log("app.fetch()");
    console.log(app.fetch());
    $('#main .username').on('click', function() {
      app.handleUsernameClick();
    });
    $('#send').on('submit',  function() {
      app.handleSubmit();
    });
  }
  )}())