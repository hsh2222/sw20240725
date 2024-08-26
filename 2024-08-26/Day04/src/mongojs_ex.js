const http = require('http');
const express = require('express');
const app = express();

const mongojs = require("mongojs");

const db =mongojs('vehicle', ['car']);

app.get('/', (req, res) => {
db.car.find(function(err, data) {
    console.log(data);
    });
});