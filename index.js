const express = require('express');
const expressws = require('express-ws');


const app = express();

const expressWs = expressws(app);

app.use(express.json());

app.get('/', ( req ,res ,next) => {
    res.send("Hi there 🚀");
});

app.ws('/', function(ws, req) {
    ws.on('message', function(msg) {
      console.log(msg);
    });
    console.log('socket', req.testing);
  });

app.listen(3000, () => {
  
  console.log(`Server listening on port 3000`)
})