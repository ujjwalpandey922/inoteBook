const connectToMongo = require("./db");
const express = require("express");
const app = express();
var cors = require("cors");
connectToMongo();
const path = require("path");
app.use(cors());
//can send json request using this
app.use(express.json());

//Available Routes.....:
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

const PORT = process.env.PORT || 5000;

//heroku deployment
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("frontend/build"));
//   const path = require("path");
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
//   });
// }

// OTHER DEPLOYMENT

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./frontend/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => {
  console.log(`iNoteBook backend listening on port ${PORT}`);
});
