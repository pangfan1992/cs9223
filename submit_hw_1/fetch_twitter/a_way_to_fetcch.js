//my keys
/*
consumer_key: 'n4ZJtM5lOXc89IFTuBUFXqGlh',
  consumer_secret: 'NcDK3HhifOvx4FPnwNrFw0vpa6sS4Gb1GpyXheKp14wJNG0b3a',
  access_token_key: '774226290706681856-ZSUYRknTuKMHenGBk7QD6SxeSaN6EV1',
  access_token_secret: 'uSxoArc3p9G8FyurePHygXtczxyd8KkChGIjEbN174Fkz'
  */

var twitter = require('twitter'),
    express = require('express'),
    app = express(),
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server);
stream = null;

server.listen(process.env.PORT || 8081);

//create a socket and use it to fetch twiteer
app.use(express.static(__dirname + '/public'));

io.sockets.on('connection', function (socket) {

  socket.on("start tweets", function() {

    if(stream === null) {
      
      twit.stream('statuses/filter', {track: 'value','locations':'-180,-90,180,90'}, function(stream) {
          stream.on('data', function(data) {
          
              if (data.coordinates){
                if (data.coordinates !== null){
                  
                  var outputPoint = {"lat": data.coordinates.coordinates[0],"lng": data.coordinates.coordinates[1]};

                  socket.broadcast.emit("twitter-stream", outputPoint);

                  socket.emit('twitter-stream', outputPoint);
                }
                else if(data.place){
                  if(data.place.bounding_box === 'Polygon'){
                    var coord, _i, _len;
                    var centerLat = 0;
                    var centerLng = 0;

                    for (_i = 0, _len = coords.length; _i < _len; _i++) {
                      coord = coords[_i];
                      centerLat += coord[0];
                      centerLng += coord[1];
                    }
                    centerLat = centerLat / coords.length;
                    centerLng = centerLng / coords.length;

                    var outputPoint = {"lat": centerLat,"lng": centerLng};
                    socket.broadcast.emit("twitter-stream", outputPoint);

                  }
                }
              }
              stream.on('limit', function(limitMessage) {
                return console.log(limitMessage);
              });

              stream.on('warning', function(warning) {
                return console.log(warning);
              });

              stream.on('disconnect', function(disconnectMessage) {
                return console.log(disconnectMessage);
              });
          });
      });
    }
  });

    socket.emit("connected");
});