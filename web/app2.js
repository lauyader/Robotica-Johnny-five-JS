var express = require('express');
var app = express();
var io = require('socket.io')(app.listen(8081));
var five = require('johnny-five');
app.use(express.static(__dirname + '/app'));
app.get('/', function (req,res) { 
	res.sendFile(__dirname + '/index.html');

});
var board = new five.Board({
	repl:false
});
board.on('ready', function () {
	var speed, commands, motors;
	var anode = new five.Led({
		pins: {
			led: 13
		},
		isAnode: true

	});

	

	
	commands = null;
	anode.off();

	//anode.color("#efe13d");
	//anode.blink(60);
	var blink = true;
	io.on('connection', function (socket) {



		socket.on('led', function (){
			anode.on();
			console.log('Led Encendido');
			console.log(blink);
			//anode.color("#3366CC");
			
		});
		socket.on('verde', function (){
			anode.off();
			blink = false;
			//anode.color("#009900");
			console.log('Led Apagado');
			console.log(blink);


			if (blink) {

			}else {
				console.log(blink)
			}
		});
		socket.on('rojo', function (){
			anode.on();
			console.log('Paso');
			//anode.color("#FF0000");
		});
		socket.on('stopled', function (){

			console.log('paso');



			if (blink){
				console.log('Blink Encendido');
				socket.emit('ping', 'Blink Activado');
	
				console.log('paso');
				//anode.off(); // to stop blinking
				//blink = True; 
				console.log(blink);
				//anode.blink(1000);
				anode.on();
				anode.blink(1000);
				blink = false;
			}
			else{

				console.log('Blink Apagado');	
				socket.emit('ping', 'Blink Apagado');
				anode.stop();
				console.log(blink);
				//anode.blink(1000);
				blink=true;
			}
		});
		socket.on('off', function (){
			blink = false;
			anode.off();  // to shut it off (stop doesn't mean "off")
			
			console.log(blink);
		});
		socket.on('on', function (){
			anode.on(); // to turn on, but not blink
			blink=true;

		});



	});
});
console.log('Activar el localhost:8081')
