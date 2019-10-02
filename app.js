/*
(req.params) Checks route params, ex: /user/:id

(req.query) Checks query string params, ex: ?id=12 Checks urlencoded body params

(req.body), ex: id=12 To utilize urlencoded request bodies, req.body should be an object. 
This can be done by using the _express.bodyParser middleware.
*/

var express = require('express');
var app = express();

app.use(express.json());

//mysql
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'my_schema'
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!");
});

//endpoints

app.get("/api/user", function (request, response) {

})

app.post("/api/user", function (request, response) {

    console.log(request.body.id);
    console.log(request.body.token);

    console.log("Inserting into...");
    connection.query('INSERT INTO my_table (id, first_name, last_name) VALUES (128, \'pancho\', \'testov\')',
        function (error, results, fields) {

            if (error) throw error;
            // connected!
        });
    console.log("Inserting done!");

    response.send();
})

app.get("/page/:id", function (request, response) {
    var id = request.params.id;
    // do something with id
    // send a response to user based on id
    var obj = { id: id, Content: "content " + id };

    response.writeHead(200, { "Content-Type": "application/json" });
    response.write(JSON.stringify(obj));
});

app.post('/api/users', function (req, res) {
    console.log(req);
    var user_id = req.body.id;
    var token = req.body.token;

    res.send(user_id + ' ' + token);
});


//init app
const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});