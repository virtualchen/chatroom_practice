(function($) {

// WebSocket object
var ws;

// The Div element selected by jQuery selector
var div = this;

function onWsMessage(message) {
   var json = JSON.parse(message.data);
	console.log(json);

   if (json.type === 'message') {
     content.append('<div class="panel panel-primary">' +
				'<div class="panel-heading">Say</div>' +
				'<div class="panel-body">' + json.data.message + '</div>' +
				'</div>');
   }
}

$.fn.receiveWebSocket = function () {
     content = this;

     ws.onmessage = onWsMessage;
};

$.fn.createWebSocket = function () {
  if ("WebSocket" in window)
  {
     // Let us open a web socket
     ws = new WebSocket("ws://182.50.155.56:8080/start", ['echo-protocol']);
     ws.onopen = function() {
	     //div.append("<h2>Done</h2>");
     };

     ws.onclose = function() { 
        // websocket is closed.
     };
     ws.onerror = function() { 
        div.html("<h1>error</h1>");
     };
  } else {
     // The browser doesn't support WebSocket
     alert("WebSocket NOT supported by your Browser!");
  }
};

})($);
