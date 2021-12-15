const express = require('express');
const app = express();
var FastText = require('node-fasttext');
const cors = require('cors');
 
let config = {
  dim: 100,
  input: "index.html",
  output: "model"
}
 
FastText.train("supervised", config, function (success, error) {
 
  if(error) {
    console.log(error)
    return;
  }
   
  console.log(success)
   
})
 
app.use(cors())
 
app.get('/', (req, res) => {
  res.sendfile("index.html");
});
 
app.get('/fasttext/', function(req, res) {
  var statement = req.param('statement');
    res.send(getFastTextResults(statement));
});
 
function getFastTextResults(statement) {
 //predict returns an array with the input and predictions for best cateogires
 let result=null;
  FastText.predict(
  "model.bin", 3,
  [statement],
  function (success, error) {
 
    if(error) {
   console.log(error)
   return;
    }
      result=success;
  })
 return result;
}
function addText(){
  value1 = document.getElementById("getValue1").value
  document.getElementById('putText').textContent = value1
}
const e1= document.getEleementById("button1");
e1.addEventListener("click",addText)
app.listen(80001, () => {
  console.log('Listening on port 8000!')
});