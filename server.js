const express = require('express'),
    net = require('net'),
    path = require('path');

const app = express();
const espSocket = net.createConnection(8124, "192.168.59.67", function() {
	console.log('-------------ESP------------');
	console.log('esp8266 is Connected');
	console.log('Local: ', espSocket.localAddress, espSocket.localPort);
	console.log('espServer: ', espSocket.remoteAddress, espSocket.remotePort);
	console.log('-------------END------------');
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index');
});

app.post('/on', function(req, res) {
	espSocket.write('1\r\n');
	res.status(200).end('On');
});

app.post('/off', function(req, res) {
	espSocket.write('0\r\n');
	res.status(200).end('Off');
});

app.listen(8000);
