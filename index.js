var express = require('express');
var app = express();
app.listen(8080, () => console.log("The server is working!"));

var account = require('./reservation');


//create Account instance and attach callbacks to events
var reserv = new account();
var history = [];                                                   //array to print to the browser


reserv.on("reservation made",reserv.displayReservations);           //add another reservation
reserv.on("reservation canceled",reserv.checkOverdrawn);            //cancel exist reservation
reserv.on("total",reserv.showAll);                                  //show total reservations already made
reserv.on("delete all", reserv.deleteallReservations);              //delete all reservations


// run some methods
reserv.makeReservation(history, 2);                                 //add 2 reservations
reserv.makeReservation(history, 5);
reserv.makeReservation(history, 2);
reserv.makeReservation(history, 5);                                 //check when there is to much reservations

reserv.getall(history);                                             //show all reservations that made until this point
reserv.deleteall(history);                                          //delete all reservations
reserv.makeReservation(history, 5);

reserv.cancelReservation(history, 1);                               //cancell reservation
reserv.cancelReservation(history, 1);
reserv.cancelReservation(history, 10);                              //check when trying to cancel more reservations then possible
reserv.cancelReservation(history, 1);


app.get('/', (req,res) => {
    res.json(history);
});