function initialize() {
  
  var centers = new google.maps.LatLng(0,0);
  var myOptions = {
    zoom: 1,
    center: centers,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
      position: google.maps.ControlPosition.LEFT_BOTTOM
    },
   
  };
  var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
  


  if(io !== undefined) {
    
    var socket = io.connect('/');
    socket.on('twitter-stream', function (data) {

      var tweetLocation = new google.maps.LatLng(data.lng,data.lat);
      

      
      var marker = new google.maps.Marker({
        position: tweetLocation,
        map: map,
      });
      setTimeout(function(){
        marker.setMap(null);
      },1500);

    });

    
    socket.on("connected", function(r) {
      socket.emit("start tweets");
    });
  }
}