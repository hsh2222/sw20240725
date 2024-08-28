const http = require("http"); // Node.js 내장 모듈인 http를 불러옵니다.
const express = require("express"); // Express 웹 프레임워크를 불러옵니다.
const app = express(); // Express 애플리케이션 인스턴스를 생성합니다.
const bodyParser = require('body-parser'); // 요청 본문을 파싱하기 위한 body-parser 미들웨어를 불러옵니다.
const cookieParser = require('cookie-parser'); // 쿠키를 파싱하기 위한 미들웨어를 불러옵니다.
const expressSession = require("express-session"); // 세션 관리를 위한 미들웨어를 불러옵니다.

// 파일 업로드용 미들웨어
var multer = require('multer'); // 파일 업로드 처리를 위한 multer를 불러옵니다.
var fs = require('fs'); // 파일 시스템 모듈을 불러옵니다.

// multer 미들웨어 사용: 미들웨어 사용 순서 
// body-parser -> multer -> router 순으로 실행됩니다.
var storage = multer.diskStorage({ // 파일 업로드 시 저장소 옵션을 설정합니다.
    destination: function(req, file, callback) {
        callback(null, 'uploads'); // 업로드된 파일이 저장될 디렉토리를 지정합니다.
    },
    filename: function(req, file, callback) {
        // 한글 파일명 깨짐 방지
        const fileName = Buffer.from(file.originalname, 'latin1').toString('utf8'); // 파일명을 UTF-8로 변환하여 한글 깨짐을 방지합니다.
        // 파일명 중복을 방지하기 위한 처리
        let index = fileName.lastIndexOf("."); // 파일명에서 확장자 위치를 찾습니다.
        let newFileName = fileName.substring(0, index); // 확장자 전 파일명을 가져옵니다.
        newFileName += Date.now(); // 타임스탬프를 추가하여 파일명을 고유하게 만듭니다.
        newFileName += fileName.substring(index); // 기존 확장자를 붙입니다.
        callback(null, newFileName); // 완성된 파일명을 저장합니다.
    }
});
// 파일 제한: 최대 10개, 1GB 이하
var upload = multer({
    storage: storage, // 앞서 정의한 저장소 옵션을 사용합니다.
    limits: {
        files: 10, // 파일 개수를 최대 10개로 제한합니다.
        fileSize: 1024 * 1024 * 1024 // 파일 크기를 최대 1GB로 제한합니다.
    }
});

app.set('port', 3000); // 서버가 실행될 포트를 3000번으로 설정합니다.
app.set("views", "views"); // EJS 뷰 파일들이 위치할 디렉토리를 설정합니다.
app.set("view engine", "ejs"); // EJS를 뷰 엔진으로 설정합니다.

// 정적 파일 제공 설정
app.use(express.static("public")); // public 디렉토리의 정적 파일을 제공하도록 설정합니다.
app.use('/uploads', express.static("uploads")); // uploads 디렉토리의 정적 파일을 제공하도록 설정합니다.
// POST 방식으로 파라미터 전달 받기 위한 설정
app.use(bodyParser.urlencoded({extended: false})); // URL-encoded 형식의 요청 본문을 파싱합니다.
app.use(bodyParser.json()); // JSON 형식의 요청 본문을 파싱합니다.
// 쿠키 사용 미들웨어 설정
app.use(cookieParser()); // 쿠키 파싱 미들웨어를 등록합니다.
// 세션 미들웨어 등록
app.use(expressSession({
    secret: 'my key', // 세션 암호화에 사용할 키를 설정합니다.
    resave: true, // 세션을 항상 저장할지 여부를 설정합니다.
    saveUninitialized: true // 초기화되지 않은 세션을 저장할지 여부를 설정합니다.
}));

// 임시 데이터: 회원 목록
const memberList = [
    {no:101, id:"user01", password:"1234", name:"홍길동", email:"hong@gmail.com"},
    {no:102, id:"user02", password:"12345", name:"김길동", email:"kim@gmail.com"},
    {no:103, id:"user03", password:"123", name:"박길동", email:"lee@gmail.com"},
    {no:104, id:"user04", password:"123456", name:"이길동", email:"park@gmail.com"}
];
let noCnt = 105; // 다음 회원 번호를 설정하기 위한 카운터

// 쇼핑몰 상품 목록
const carList = [
    {
        _id:111, 
        name:'SM5', 
        price:3000, 
        year:1999, 
        company:'SAMSUNG',
        writedate: "",
        photos: [
            {
                originalname: "르노삼성sm520.png", 
                filename: "르노삼성sm520.png",
                filesize: 371000,
                mimetype: "img/png"
            },{ 
                originalname: "르노삼성sm5.png", 
                filename: "르노삼성sm5.png",
                filesize: 95900,
                mimetype: "img/png"
            }
        ]
    }
];
let carSeq = 117; // 다음 상품 번호를 설정하기 위한 카운터

// 요청 라우팅 사용
const router = express.Router(); // 라우터 인스턴스를 생성합니다.

router.route("/home").get((req,res)=> { // "/home" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("home/Home", {}, (err, html)=>{
        res.end(html); // 홈 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/profile").get((req,res)=> { // "/profile" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("profile/Profile", {}, (err, html)=>{
        res.end(html); // 프로필 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/member").get((req,res)=> { // "/member" 경로에 대한 GET 요청을 처리합니다.
    // 로그인이 되어 있다면 member 페이지를 보여줍니다.
    if(req.session.user !== undefined) { // 세션에 사용자가 존재하는지 확인합니다.
        const user = req.session.user;
        req.app.render("member/Member", {user}, (err, html)=>{
            res.end(html); // 멤버 페이지를 렌더링하여 응답합니다.
        });
    } else {
        res.redirect("/login"); // 로그인이 되어 있지 않다면 로그인 페이지로 리다이렉트합니다.
    }
});
router.route("/login").get((req,res)=> { // "/login" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("member/Login", {}, (err, html)=>{
        // 사용자(접속자)의 로컬에 쿠키가 저장됩니다.
        res.cookie('user', {
            id:'TestUser',
            name: '테스트 유저',
            authorized: true
        });
        res.end(html); // 로그인 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/login").post((req,res)=> { // "/login" 경로에 대한 POST 요청을 처리합니다.
    console.log(req.body.id, req.body.password);
    const idx = memberList.findIndex(member => member.id === req.body.id); // 입력된 ID로 회원을 찾습니다.
    if(idx != -1) {
        if(memberList[idx].password === req.body.password) { // 패스워드가 일치하는지 확인합니다.
            console.log("로그인 성공!");
            // 세션에 로그인 정보를 등록한 후 멤버 페이지로 이동합니다.
            req.session.user = {
                id: req.body.id,
                name: memberList[idx].name,
                email: memberList[idx].email, 
                no: memberList[idx].no
            }
            res.redirect("/member"); // 멤버 페이지로 리다이렉트합니다.
        } else {
            console.log("로그인 실패! 패스워드가 맞지 않습니다.");
            res.redirect("/login"); // 패스워드가 틀린 경우 로그인 페이지로 다시 이동합니다.
        }
    } else {
        console.log("존재하지 않는 계정입니다.");
        res.redirect("/login"); // ID가 존재하지 않는 경우 로그인 페이지로 다시 이동합니다.
    }
});
router.route("/logout").get((req, res)=>{ // "/logout" 경로에 대한 GET 요청을 처리합니다.
    console.log("GET - /logout 호출 ...");
    if(!req.session.user) { // 사용자가 로그인되어 있지 않다면
        console.log("아직 로그인 전 상태입니다.");
        res.redirect("/login"); // 로그인 페이지로 리다이렉트합니다.
        return;
    }
    // 세션의 user 정보를 제거하여 로그아웃 처리
    req.session.destroy((err)=>{
        if(err) throw err;
        console.log("로그아웃 성공!");
        res.redirect("/login"); // 로그아웃 후 로그인 페이지로 리다이렉트합니다.
    });
});
router.route("/joinus").get((req,res)=> { // "/joinus" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("member/Joinus", {}, (err, html)=>{
        res.end(html); // 회원 가입 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/joinus").post((req,res)=> { // "/joinus" 경로에 대한 POST 요청을 처리합니다.
    // 회원 가입 후 멤버 목록으로 리다이렉트합니다.
    res.redirect("/member");
});
router.route("/gallery").get((req,res)=> { // "/gallery" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("gallery/Gallery", {}, (err, html)=>{
        res.end(html); // 갤러리 페이지를 렌더링하여 응답합니다.
    });
});

// ---- 쇼핑몰 기능
router.route("/shop").get((req,res)=> { // "/shop" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("shop/Shop", {carList}, (err, html)=>{
        if(err) throw err;
        res.end(html); // 쇼핑몰 메인 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/shop/insert").get((req,res)=> { // "/shop/insert" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("shop/Insert", {}, (err, html)=>{
        res.end(html); // 상품 등록 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/shop/insert").post(upload.array('photo', 1),(req,res)=> { // "/shop/insert" 경로에 대한 POST 요청을 처리합니다.
    console.log("POST - /shop/insert");
    // 구조분해 할당으로 body의 파라미터를 꺼냅니다.
    const {name, price, year, company} = req.body;
    const newCar = {
        _id:carSeq++, name, price, year, company,
        writedate: Date.now(),
        photos: []
    };
    newCar.photos = req.files; // 업로드된 파일들을 newCar 객체에 추가합니다.
    carList.push(newCar); // 새 상품을 상품 목록에 추가합니다.
    res.redirect('/shop'); // 쇼핑몰 메인 페이지로 리다이렉트합니다.
});
router.route("/shop/modify").get((req,res)=> { // "/shop/modify" 경로에 대한 GET 요청을 처리합니다.
    const _id = parseInt(req.query._id); // 쿼리 파라미터로 전송된 ID를 정수로 변환합니다.
    console.log(_id);
    const idx = carList.findIndex(car=>_id===car._id); // 해당 ID를 가진 상품을 찾습니다.
    console.log(idx);
    if(idx === -1) { // 상품이 존재하지 않는 경우
        console.log("상품이 존재 하지 않습니다.");
        res.redirect("/shop"); // 쇼핑몰 메인 페이지로 리다이렉트합니다.
        return;
    }
    req.app.render("shop/Modify", {car:carList[idx]}, (err, html)=>{
        if(err) throw err;
        res.end(html); // 상품 수정 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/shop/modify").post((req,res)=> { // "/shop/modify" 경로에 대한 POST 요청을 처리합니다.
    console.log("POST - /shop/modify 호출");
    console.dir(req.body);
    res.redirect('/shop'); // 쇼핑몰 메인 페이지로 리다이렉트합니다.
});
router.route("/shop/detail").get((req,res)=> { // "/shop/detail" 경로에 대한 GET 요청을 처리합니다.
    const _id = parseInt(req.query._id); // 쿼리로 전송된 데이터는 모두 문자열이므로 정수로 변환합니다.
    const idx = carList.findIndex(car=>_id===car._id); // 해당 ID를 가진 상품을 찾습니다.
    if(idx === -1) { // 상품이 존재하지 않는 경우
        console.log("상품이 존재 하지 않습니다.");
        res.redirect("/shop"); // 쇼핑몰 메인 페이지로 리다이렉트합니다.
        return;
    }
    req.app.render("shop/Detail", {car:carList[idx]}, (err, html)=>{
        if(err) throw err;
        res.end(html); // 상품 상세 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/shop/delete").get((req,res)=> { // "/shop/delete" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("shop/Delete", {}, (err, html)=>{
        res.end(html); // 상품 삭제 페이지를 렌더링하여 응답합니다.
    });
});
router.route("/shop/cart").get((req,res)=> { // "/shop/cart" 경로에 대한 GET 요청을 처리합니다.
    req.app.render("shop/Cart", {}, (err, html)=>{
        res.end(html); // 장바구니 페이지를 렌더링하여 응답합니다.
    });
});
// --- 쇼핑몰 기능 끝

// --- TodoList 기능 구현 시작
// HTML 폼에서 REST method은 GET과 POST만 사용 가능합니다.
// Ajax를 사용하지 않기 때문에 GET과 POST만 처리 가능합니다.
// app.get()은 ejs 뷰로 forward 시켜주기, app.post()은 DB와 연동해서 처리하는 process 역할입니다.
// forward란, 주소의 내용이 아닌 다른 파일의 내용을 표시하는 것입니다.
const { MongoClient, ObjectId } = require("mongodb"); // MongoDB와 연동하기 위한 MongoClient 및 ObjectId를 불러옵니다.

const client = new MongoClient("mongodb://localhost:27017"); // MongoDB 클라이언트를 생성합니다.
const dbName = "comstudy"; // 사용할 데이터베이스 이름을 설정합니다.
const collectionName = "todolist"; // 사용할 컬렉션 이름을 설정합니다.

app.get("/todo/list", async (req,res)=>{ // "/todo/list" 경로에 대한 GET 요청을 처리합니다.
    try {
        await client.connect(); // MongoDB에 연결합니다.
        const database = client.db(dbName); // 데이터베이스를 선택합니다.
        const todoCollection = database.collection(collectionName); // 컬렉션을 선택합니다.
        const QUERY = {}; // 모든 문서를 조회하기 위해 빈 쿼리를 사용합니다.
        const cursor = todoCollection.find(QUERY, {}); // 컬렉션에서 문서를 조회합니다.
        if ((await todoCollection.countDocuments(QUERY)) === 0) {
            console.log("No documents found!"); // 문서가 없다면 로그를 출력합니다.
        }
        const todoList = []; // 조회된 문서를 저장할 배열을 생성합니다.
        for await (const doc of cursor) {
            todoList.push(doc); // 조회된 문서를 배열에 추가합니다.
        }
        req.app.render("todolist/TodoList", {todoList}, (err, html)=>{
            if(err) throw err;
            res.end(html); // Todo 리스트 페이지를 렌더링하여 응답합니다.
        });
    } finally {
        await client.close(); // MongoDB 연결을 종료합니다.
    }
});
app.get("/todo/input", (req,res)=>{ // "/todo/input" 경로에 대한 GET 요청을 처리합니다.
    res.render("todolist/TodoInput", {}); // Todo 입력 페이지를 렌더링하여 응답합니다.
});
app.get("/todo/detail", (req,res)=>{ // "/todo/detail" 경로에 대한 GET 요청을 처리합니다.
    res.render("todolist/TodoDetail", {}); // Todo 상세 페이지를 렌더링하여 응답합니다.
});
app.get("/todo/modify", async (req,res)=>{ // "/todo/modify" 경로에 대한 GET 요청을 처리합니다.
    try {
        await client.connect(); // MongoDB에 연결합니다.
        const database = client.db(dbName); // 데이터베이스를 선택합니다.
        const collection = database.collection(collectionName); // 컬렉션을 선택합니다.

        const query = { _id: new ObjectId(req.query._id) }; // 쿼리로 전달된 _id로 문서를 조회합니다.
        const fetch = await collection.findOne(query); // 해당 문서를 찾습니다.
        console.log("Fetched document:", fetch);
        res.render("todolist/TodoModify", {todo: fetch}); // Todo 수정 페이지를 렌더링하여 응답합니다.
    } finally {
        await client.close(); // MongoDB 연결을 종료합니다.
    }
});
// 저장 처리 - 몽고디비와 연동
app.post("/todo/input", async (req,res)=>{ // "/todo/input" 경로에 대한 POST 요청을 처리합니다.
    const doc = {
        title: req.body.title,
        done: (req.body.done=="true"?true:false)
    };
    console.dir(doc);
    try {
        await client.connect(); // MongoDB에 연결합니다.
        const database = client.db(dbName); // 데이터베이스를 선택합니다.
        const todoCollection = database.collection(collectionName); // 컬렉션을 선택합니다.
        const result = await todoCollection.insertOne(doc); // 새 문서를 컬렉션에 추가합니다.
        console.log(`A document was inserted with the _id: ${result.insertedId}`);
        res.redirect("/todo/list"); // Todo 리스트 페이지로 리다이렉트합니다.
    } finally {
        await client.close(); // MongoDB 연결을 종료합니다.
    }
});
app.post("/todo/detail", (req,res)=>{ // "/todo/detail" 경로에 대한 POST 요청을 처리합니다.
    res.redirect("/todo/list"); // Todo 리스트 페이지로 리다이렉트합니다.
});
app.post("/todo/modify", async (req,res)=>{ // "/todo/modify" 경로에 대한 POST 요청을 처리합니다.
    console.log(req.body._id);
    try {
        await client.connect(); // MongoDB에 연결합니다.
        const database = client.db(dbName); // 데이터베이스를 선택합니다.
        const movies = database.collection(collectionName); // 컬렉션을 선택합니다.
        const filter = { _id: new ObjectId(req.body._id) }; // 업데이트할 문서의 _id를 필터로 설정합니다.
        const options = { upsert: true }; // 문서가 없으면 새로 추가합니다.
        const updateDoc = {
            $set: {
                title: req.body.title,
                done: (req.body.done=="true"?true:false)
            }
        };// 필터와 일치하는 첫 번째 문서를 업데이트합니다.
        const result = await movies.updateOne(filter, updateDoc, options);
        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,);
    } finally {
        await client.close(); // MongoDB 연결을 종료합니다.
    }
    res.redirect("/todo/list"); // Todo 리스트 페이지로 리다이렉트합니다.
});
app.get("/todo/delete", async (req,res)=>{ // "/todo/delete" 경로에 대한 GET 요청을 처리합니다.
    try {
        await client.connect(); // MongoDB에 연결합니다.
        const database = client.db(dbName); // 데이터베이스를 선택합니다.
        const todos = database.collection(collectionName); // 컬렉션을 선택합니다.
        const query = { _id: new ObjectId(req.query._id) }; // 쿼리로 전달된 _id를 필터로 설정합니다.
        const result = await todos.deleteOne(query); // 해당 문서를 삭제합니다.
        if (result.deletedCount === 1) {
            console.log("Successfully deleted one document.");
        } else {
            console.log("No documents matched the query. Deleted 0 documents.");
        }
    } finally {
        await client.close(); // MongoDB 연결을 종료합니다.
    }
    res.redirect("/todo/list"); // Todo 리스트 페이지로 리다이렉트합니다.
});
// --- TodoList 기능 구현 끝

// router 설정 맨 아래에 미들웨어 등록
app.use('/', router); // 모든 라우트 요청을 라우터로 처리합니다.

// 등록되지 않은 경로에 대해 페이지 오류 응답
const expressErrorHandler = require('express-error-handler'); // Express 에러 핸들러를 불러옵니다.
// 모든 라우터 처리 후 404 오류 페이지 처리
const errorHandler = expressErrorHandler({
    static : {
        '404':'./public/404.html' // 404 오류가 발생하면 표시할 HTML 파일을 설정합니다.
    }
});
app.use(expressErrorHandler.httpError(404)); // 404 오류 처리 미들웨어를 등록합니다.
app.use(errorHandler); // 에러 핸들러를 등록합니다.

// 서버 생성 및 실행
const server = http.createServer(app); // HTTP 서버를 생성합니다.
server.listen(app.get('port'), ()=>{ // 설정된 포트에서 서버를 실행합니다.
    console.log(`Run on server >>> http://localhost:${app.get('port')}`); // 서버 실행 로그를 출력합니다.
});
