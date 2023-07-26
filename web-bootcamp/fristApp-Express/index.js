// 이번 강의의 목표는 express를 이용하여 서버를 생성하고 실행하는 것 

const express = require('express');
const app = express();

// 하나 이상의 응답을 얻는 http 요청은 받을 수 없다. (아래 .get이 있기에 )
// app.use((req,res) => { // app.use 어떤 요청이 들어오든 콜백 실행. 
        // 라우트는 아님. 경로도 중요 하지 않음 
//      * req는 들어온 HTTP 요청을 기반으로 Express가 생성한 객체
//      * res도 Express가 생성한 객체로 둘 다 콜백에 전달
//        
//     console.log(" WE GOT A NEW REQUEST")
//     // console.dir(req)  // Express가 자동으로 HTTP 요청 정보를 파싱해 JavaScript 객체를 만들고 그걸 콜백의 첫 번째 인수로 전달한다
//     res.send('<h1>TEST</h1>')
//     //res.send는 http 응답을 보내고 생성해야한다. 
// })


// /cats => 'meow'
// /dogs => 'woof'
// '/'(루트 라우트)


app.get('/', (req, res) => {
    res.send("THIS IS MY HOMEPAGE ~  ~  ! ! ! ");
    //요청이 들어오고 response를 해주어한다. 그렇지 않으면 계속 요청을 기다린다. 
})


// 쿼리 문자열 
app.get('/search', (req, res) => { // http://localhost:3000/search?q=test&f=bad 
    console.dir(req.query); //{ q: 'test', f: 'bad' }
    const { q } = req.query; 
    if (!q) res.send('NO RESULLT');
    res.send(`<h1> Search result for : ${q}! <h1>`);
})

// * 제너릭 패턴 생성 :: 라우트를 생성해서 그 안에 경로 문자열에 콜론을 이용해 변수나 경로 변수로 지정 
app.get('/r/:subreddit', (req, res) => { // ~/r/dfjdnsjdnf 
    const { subreddit } = req.params; // { subreddit: 'tstdfdfdfd'} 
    res.send(`<h1> THIS IS A ${subreddit}! <h1>`);
})

app.get('/r/:subreddit/:postId', (req, res) => {
    // console.dir(req.params); // { subreddit: 'tstdfdfdfd', postId: '232323232' }
    const { subreddit, postId } = req.params;
    res.send(`<h1> POST ID IS ${postId} THIS IS A ${subreddit}! <h1>`);
})

app.get('/cats', (req, res) => { //get 라우트 요청에만 응답
    res.send("MEOW! ");
})

app.post('/cats', (req, res) => {
    res.send("POST REQUEST TO /cats ! MEOW! ");
})

app.get('/dogs', (req, res) => {
    res.send("WOOF!");
})

app.listen(3000, () => { // app.listen  해당 포트에 요청을 받고 서버가 실행되면 아래 코드 실행
    console.log(`Example app listening on port 3000`);
})

// 존재하지 않는 라우트를 요청할 경우 라우트를 가져올 수 없다는 Cannot GET /~~~ 뜨는 것을 막기위해 
// 제네릭 응답 작성 
// * 맨 아래에 작성하는 것이 중요! (상위에 있을경우 아래의 코드를 무시하기 때문)

app.get('*', (req, res) => {
    res.send(`I don't know that path`);
}) 


