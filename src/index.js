const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 3000;
app.use(express.urlencoded());
let posts = require("./initialData");
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
// your code goes here
let max = 10;
prevMax=null;
let requestCount = 0;
let timeOutId = null;
const setInitials = () => {
  prevMax = null;
  requestCount = 0;
  timeOutId = null;
};
app.get("/api/posts", (req, res) => {
  requestCount++;
  noOfPosts=Number(req.query.max);
  if (requestCount <= 5) {
    if (noOfPosts <= 20) {
        if(prevMax)//if not set to null means not firsst request    
        {
            noOfPosts=noOfPosts<prevMax?noOfPosts:prevMax;
        }
        prevMax=noOfPosts>prevMax?noOfPosts:prevMax;//>prevMax?noOfPosts:prevMax;

      res.send(posts.slice(0, noOfPosts));
    } else {
      res.send(posts.slice(0, max));
    }
  } else {
      res.status(429).send({message: "Exceed Number of API Calls"});

  }

  if (timeOutId == null) {
    timeOutId = setTimeout(setInitials, 30 * 1000);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
