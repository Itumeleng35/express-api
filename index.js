import express from 'express';
const app = express();

app.get("/api", function(req, res){
  res.json({ msg : "Hi, welcome to my webpage"});
});

app.use(express.json())
// add the line below to add the html and css files
app.use(express.static('public'));

const greetings = {
  'english' : 'Hello',
}

// call the api like this - 
app.get('/api/greet', function(req, res){
  // console.log(req.query);
  const username = req.query.username;
  const language = req.query.language;

  if (!greetings[language]) {
    return res.json({
      error : 'Invalid language supplied'
    })
  }

  const greeting = greetings[language];
  res.json({
    message : `${greeting}, ${username}!`
  })
});

app.post('/api/greet', function(req, res){
  // add an entry to our greetings map
  const language = req.body.language;
  greetings[language] = req.body.greeting

  res.json({
    status : 'success',
    message : `Added a greeting for ${language}`
  });
});

// call the api like this - http://localhost:3009/api/greet?username=Neo
app.get('/api/greet', function(req, res){
  console.log(req.query);
  const username = req.query.username;
  res.json({
    message : `Hello, ${username}!`
  })
});

app.post('/api/greet', function(req, res) {
  res.send('Hello from my API!')
  const username = req.query.username;
  const language = req.query.language;
})

app.get('/api/greet/:username', function(req, res){
  console.log(req.params);
  const username = req.params.username;
  res.json({
    message : `Hello, ${username}!`
  })
});


const PORT = process.env.PORT || 3009;

app.listen(PORT, function(){
  console.log('App starting on port', PORT);
});
