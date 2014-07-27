var app = app || {};

app.MessageView  = Backbone.View.extend({
	el:'#board',
	template:_.template( $('#tmpl-message').html()),
	event: {},
	initialize:function(){
		this.model = new app.Message();
		this.template = _.template( $('#tmpl-message').html());
		this.model.bind('change', this.render,this);

		$('#submit').on('click', function() {
			$.ajax({
				url: "http://182.50.155.56:8080/send",
				type: "GET",
				dataType: "json",
				data: {
					m: $("#text").val(),
					u: 'YOU',
				}
			});
		});

		this.createWebSocket();
		this.render();
	},
	render:function(){
		console.log(this.template);
		var htmlCode = this.template(this.model.attributes);
		this.$el.prepend(htmlCode);
	},
	createWebSocket: function(){
		var self = this;
		this.websocket =  new WebSocket("ws://182.50.155.56:8080/start", ['echo-protocol']);
		function onWsMessage(message){
			var jsonObj = JSON.parse(message.data);
			self.model.set('data',jsonObj.data);
		}
		this.websocket.onopen = function(){
			console.log('open');
		};
		this.websocket.onclose = function(){
			console.log('close');
		}
		this.websocket.onmessage = onWsMessage;
	}
});

app.Message = Backbone.Model.extend({
	defaults:{
		type: 'message',
		data: {
			message : 'lulala',
			username : 'lalaname',
			timestampe : 3939889
		}
	}
});

$(document).ready(function() {
	console.log('loaded');
	// $('#status').createWebSocket();
	// $('#board').receiveWebSocket();

	// $('#submit').on('click', function() {
	// 	$.ajax({
	// 		url: "http://182.50.155.56:8080/send",
	// 		type: "GET",
	// 		dataType: "json",
	// 		data: {
	// 			m: $("#text").val(),
	// 			u: 'YOU',
	// 		}
	// 	});
	// });
	app.messagView = new app.MessageView();
});