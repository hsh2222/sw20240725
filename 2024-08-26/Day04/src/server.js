const http = require('http');
const express = require('express');
const app = express();

const mongojs = require("mongojs");
const db =mongojs('vehicle', ['car']);

app.get('/', (req, res) => {
    if(db) {
        const carList = await db.car.find((err,result => {
            if(err) throw err;
        }));
    } else {
        res.end("db가 연결되지 않았습니다!");
    }
});

const server = http.createServer(app);
server.listen(app.get('port'), ()=> {

});