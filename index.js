const express = require('express');
const bodyParser = require('body-parser');

var app = Express();


var port = process.env.PORT || 8080;

// Send message for default URL
app.get('/', (req, res) => res.send('Hello. in the address bar, type in http://localhost:8080 and add in ?busNumber=yourchoice%startingBusStopCode=yourchoice &endingBusStopCode=yourchoice&direction=1'));
    
    
     DistanceBetweenStops = (busNumber, startingBusStopCode, endingBusStopCode, direction) => {
         let rawdata = fs.readFileSync('database/routes.json');
         let routes = JSON.parse(rawdata);
     
         const findDist = (busNumber, busStop, direction) => {
             for(i=0; i <routes.length; i++) {
                 if(busNumber == routes[i].ServiceNo && busStop == routes[i].BusStopCode && direction == routes[i].Direction) {
                     return routes[i].Distance; 
                 }
             }
         }
     
         let DistBus1 = findDist(busNumber, startingBusStopCode, direction);
         let DistBus2 = findDist(busNumber, endingBusStopCode, direction);
     
         return  DistBus2 - DistBus1;
     
     }
     
     
     var final = findDist(req.query.busNumber, req.query.startingBusStopCode, req.query.endingBusStopCode, req.query.direction); 
     
     
     res.send(`The distance between the stops is ${finalDist}`); 
 })

app.listen(port, function () {
    console.log("busrouting at port " + port);
});
