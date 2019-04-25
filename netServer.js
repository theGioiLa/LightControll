const net = require('net');

const server = net.createServer(function(connection) {
    console.log('client connected at ', connection.localAddress, connection.localPort);
    console.log('client: ', connection.remoteAddress, connection.remotePort);

    connection.on('end', function() {
        console.log('client disconnected');
    });

	connection.on('data', function(chunk) {
		console.log('>> received', chunk.toString());
	});

    connection.write('hello\r\n');
    connection.pipe(connection);
});

server.listen(8124, function() {
    console.log('server bound');
});

