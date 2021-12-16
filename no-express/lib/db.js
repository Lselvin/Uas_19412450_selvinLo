var mysql = require('mysql');
    var connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'',
        database:'db19412450'
    });
    connection.connect(function(error){
        if(!!error) {
            console.log(error);
        } else {
            console.log('Connected..YES BISA!');
        }
    });

    module.exports = connection;