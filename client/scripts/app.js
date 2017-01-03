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
    var user = app.findUser();
    console.log('user', user);
    message.username = user;
    $.ajax({
      type: 'POST',
      url: 'https://api.parse.com/1/classes/messages',
      data: JSON.stringify(message),
      success: function(data) {
        console.log('message has been sent', data);
      },
      error: function(error) {
        console.log('there is an error D:', error);
      }
    });
    //app.fetch();
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
        //console.log('success');
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
    for (var i = 0; i < message.length; i++) {
      $('#chats').append('<div id = "messages"><text class = "username">' + message[i].username + ':</text><br></br>' + message[i].text + '</div>');
    }
  },
  renderRoom: function(room) {
    $('#roomSelect').append('<div>' + room + '</div>');
    var roomList = [];
    for (var i = 0; i < room.length; i++) {
      if (roomList.indexOf(room[i].roomname) === -1) {
        roomList.push(room[i].roomname);
        $('#myDropdown').append('<div id = '+room[i].roomname +' class = "roomSelect">' + room[i].roomname + '</div>');
      }
    }
    //app.fetch();
    //Fetch the messages
    //Find the room and filter by it
    //Render those messages

  },
  handleUsernameClick: function() {
  },
  handleSubmit: function(newMessage) {
    console.log('button pressed');
      var PLACEHOLDER = 'bloop';
      var submission = {
        username: PLACEHOLDER,
        text: newMessage,
        roomname: PLACEHOLDER,
      };
      //console.log(JSON.stringify(submission));
      app.send(submission);
  },
  findUser: function() {
    console.log(window.location.search);
    return window.location.search.split('=')[2];},
};

(function() {
  $(document).ready(function() {
    app.fetch();
    $('#main .username').on('click', function() {
      app.handleUsernameClick();
    });
    $('#send').on('submit',  function() {
      var newMessage = $('#send').serializeArray()[0];
      app.handleSubmit(newMessage.value);


    });
  }
  )}())