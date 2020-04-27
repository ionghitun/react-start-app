require('dotenv').config({
    path: __dirname + '/.env'
});

const REDIS = {
    "host": process.env.REACT_APP_REDIS_HOST,
    "port": process.env.REACT_APP_REDIS_PORT,
    "password": process.env.REACT_APP_REDIS_PASSWORD,
    "family": 4
};

function handler(request, response) {
    response.writeHead(200);
    response.end('');
}

try {
    let app;

    if (process.env.REACT_APP_APP_ENV === 'local') {
        app = require('http').createServer({}, handler);
    } else {
        let fs = require('fs');

        let options = {
            key: fs.readFileSync('/etc/certs/react.ro.key').toString(),
            cert: fs.readFileSync('/etc/certs/react.ro.crt').toString()
        };

        app = require('https').createServer(options, handler);
    }

    app.listen(process.env.REACT_APP_SOCKET_PORT, function () {
        if (process.env.REACT_APP_APP_DEBUG) {
            console.log(new Date, 'Server is running on port ' + process.env.REACT_APP_SOCKET_PORT);
        }
    });

    try {
        let io = require('socket.io').listen(app, {log: false, origins: '*:*'});

        io.on('connection', function (socket) {
            if (process.env.REACT_APP_APP_DEBUG) {
                console.log(new Date, 'Connected to Socket', socket.id);
            }
        });

        try {
            let ioredis = require('ioredis');
            let redis = new ioredis(REDIS);

            if (process.env.REACT_APP_APP_DEBUG) {
                console.log(new Date, 'Connect to Redis server on port ' + REDIS.port);
            }

            try {
                redis.psubscribe('*', function (error, count) {
                    if (process.env.REACT_APP_APP_DEBUG) {
                        console.log(new Date, 'Server is listening for broadcasted messages');
                    }
                });

                redis.on('pmessage', function (subscribed, channel, data) {
                    let json = JSON.parse(data);

                    if (process.env.REACT_APP_APP_DEBUG) {
                        console.log(new Date, channel + ':' + json.event, json.data);
                    }

                    io.emit(channel, {type: json.event, data: json.data});
                });
            } catch (err) {
                console.log(new Date, 'Error receiving message');
                process.exit(1);
            }
        } catch (err) {
            console.log(new Date, 'Cannot connect to Redis server on process.env.REACT_APP_SOCKET_PORT ' + REDIS + process.env.REACT_APP_SOCKET_PORT);
            process.exit(1);
        }
    } catch (err) {
        console.log(new Date, 'Cannot connect to Socket');
        process.exit(1);
    }
} catch (err) {
    console.log(new Date, 'Server failed to run on port ' + process.env.REACT_APP_SOCKET_PORT);
    process.exit(1);
}
