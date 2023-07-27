const express = require('express');
const app = express();
const path = require('path');  //express에 내장된 모듈 
const redditData = require('./data.json'); // 데이터를 가져 올 경우 

// app.use(express.static('public')); // 정적 Assets 사용 하기 
// 위 코드는 애플리케이션을 연 곳에서 public 디렉토리를 찾는다. 즉 public 폴더가 있는 곳에서 실행해야 css가 동작.. (상대경로)
app.use(express.static(path.join(__dirname, 'public'))); // 절대경로


app.set('view engine', 'ejs');
// EJS 지정, require 필요 X , views 폴더는 디폴트 디렉토리 
// 위 코드만 있을 경우 view 폴더가 있는 디렉토리와 동일한 곳에서 애플리케이션을 열어야 동작한다. (실행했을 때의 디렉토리에서 view를 찾기에..)
app.set('views', path.join(__dirname, '/views'));
// views와 다른 디렉토리에서 호출해도 동작 (절대경로)
// 이 파일이 있는 현재 디렉토리(__dirname)를 가져와서 /views를 붙여주는 것 (path.join)

app.get('/', (req, res) => {
    res.render('home')     //view를 렌더링하고 렌더링 된 html 문자열을 클라이언트로 보낸다 
    // res.render를 호출할 때마다 보이는 디폴트 위치가 별도 지정이 없으면 /views 라고 가정하기 때문에 
})

app.get('/cats', (req, res) => { //EJS의 루프 
    const cats = ['Blue', 'Rocket', 'Moncty', 'Ruru', 'Rara', 'Jump']; 
    res.render('cats', { cats }); 

})

app.get('/r/:subreddit', (req, res) => {
    // 경로에 있는 변수를 전달하는 경우
    const { subreddit } = req.params;
    const data = redditData[subreddit]; 
    if (data) {
        res.render('subreddit', { ...data }); // name
        //res.render('subreddit', { data }); // 분해 하지 않는다면 subreddit.ejs에서 데이터 접근시 data.name ~ 이런식으로 접근해야함.     
    }else{
        res.render('notfound', { subreddit });
    }
})

app.get('/rand', (req, res) => {
    const num = Math.floor(Math.random() * 10 ) + 1;
    res.render('random', { num })
})
app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000");
})