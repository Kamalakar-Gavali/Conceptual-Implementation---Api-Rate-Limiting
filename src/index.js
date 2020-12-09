const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());
let posts=require('./initialData');
// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here
let max=10;
app.get('/api/posts',(req,res)=>{
   
 if(Number(req.query.max)<=20)
    {
        
        res.send(posts.slice(0,Number(req.query.max)));
    }
    else
    {
        res.send(posts.slice(0,max));
    }
  
 /* setTimeout(()=>{
    setInterval(,1)

  },0);*/

})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;
