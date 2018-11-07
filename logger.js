

const EventEmiter = require('events');

var url = "url.com";

class Logger extends EventEmiter {
    log(message){
        console.log(message);
    
        this.emit('messageLogged',  {id: 1, url: 'http://'});
    }
}


module.exports = Logger;