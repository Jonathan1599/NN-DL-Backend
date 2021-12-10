const express = require("express");
const expressws = require("express-ws");
const cors = require("cors");
const multer  = require('multer')
const upload = multer({ dest: 'public/files' ,fileFilter: function (req, file, cb) {
  file.mimetype === 'text/csv' ? cb(null, true) : cb(null, false)
}});
const path = require("path");
const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const app = express();
//app.use(bodyParser.urlencoded({extended: true}))

httpServer.listen(9000);

app.use(express.static("public"));

const expressWs = expressws(app);

app.use(express.json());
app.use(cors());
app.options("*", cors());

app.post('/upload_csv', upload.single('input_data'), function (req, res, next) {
  if(req.file == undefined){
    res.end("Unable to run training, too few resources")
  }
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  
})

app.get('/data', async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  res.sendFile(__dirname + "/public/data.csv")
});

app.get("/test", (req, res, next) => {
  res.sendFile(path.join(__dirname, "public/station_goa.html"));
});

app.get("/", (req, res, next) => {
  res.redirect("/test");
});


app.ws("/", function (ws, req) {
  ws.on("message", function (msg) {
    console.log(msg);
    try {
    io.emit("data", JSON.parse(msg));
    }

    catch(e){
      console.log(e);
    }
    
  });
  console.log("socket", req.testing);
});



app.listen(3000, () => {
  console.log(`Server listening on port 3000`);
});
