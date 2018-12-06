var events = require('events');
//eventsConfig = require('./config');
module.exports = class Reservation extends events.EventEmitter {
    constructor(){
        super();
        this.currReservation = 0;               //counts how many reservations made
        this.maxReservation = 10;               //max reservations possible
    }
    makeReservation(history, tables) {
        if(this.currReservation <= this.maxReservation && this.currReservation + tables <= this.maxReservation){
            this.currReservation += tables;
            this.emit('reservation made');
            console.log(this.currReservation);
            history.push(`Number of table ordered: ${this.currReservation}`);
        }
        else {
            history.push(`sorry, you tryied to make ${tables} reservations, and there are: ${this.currReservation}/${this.maxReservation} reservations already`)
            console.log(`sorry, you tryied to make ${tables} reservations, and there are: ${this.currReservation}/${this.maxReservation} reservations already`)
        };
    }

    cancelReservation(history, canceles) {
        if(this.currReservation > 0 && this.currReservation - canceles >= 0){
            this.currReservation-=canceles;
            this.emit('reservation canceled');
            console.log(this.currReservation);
            history.push(`reservation canceled now there is: ${this.currReservation} reservations`);
        }
        else {
            history.push(`sorry, you tryied to cancel ${canceles} reservations and there are only ${this.currReservation} reserved tables`)
            console.log(`sorry, you tryied to cancel ${canceles} reservations and there are only ${this.currReservation} reserved tables`)
        };
    }

    getall(history) {
        this.emit(`total`);
        history.push(`total reservations: ${this.currReservation}`);
    }

    deleteall(history) {
        this.currReservation = 0;
        this.emit(`delete all`);
        history.push(`all reservation deleted, there are ${this.currReservation} tables reservation`);
    }

//--the callbacks functions -----
    displayReservations() {
        console.log(`amount of reservations:  ${this.currReservation}`);
    }
    checkOverdrawn() {
        
        console.log(`amount of reservations: ${this.currReservation}`);
    }
    showAll() {
        console.log(`total reservations: ${this.currReservation}`)
    }
    deleteallReservations() {
        console.log(`all reservation deleted, there are ${this.currReservation} tables reservation`);
    }
}
