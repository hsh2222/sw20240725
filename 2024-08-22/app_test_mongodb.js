// Express에서 몽고디비 사용-몽고디비 모듈 사용
var MongoClient = require('mongodb').MongoClient;
// 데이터베이스 객체를 위한 변수 선언
var db;
//데이터베이스에 연결
function connectDB() {
    // 데이터베이스 연결 정보
    var databaseUrl = 'mongodb://localhost:27017';
    // 데이터베이스 연결
    MongoClient.connect(databaseUrl, function(err, database) {
            if (err)  { throw err; }
            console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
            // database 변수에 할당할때
            // 몽고디비3 이상에서는 db명을 지정해 주어야 한다.
             db = database.db('vehicle');
     });
}

var authUser = function(database, callback) {
    var car = database.collection('car');   
    car.find({"name": "BMW"}).toArray(function(err, docs){
        console.log(docs);
    });
}



const http = require('http');
const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;

let db = null;

const connectionDB = () => {

}

const server = http.createServer(app);
server.listen(app.get('port', ()=>{
    console.log("서버 실행중 ");
    connectionDB();
}))