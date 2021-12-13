import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { talkToChatbot } from "./chatbot";

const Gtts = require("gtts");

var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(morgan("dev"));

app.post("/chatbot", jsonParser, urlEncoded, function (req, res, next) {
  const message = req.body.message;
  talkToChatbot(message)
    .then((response) => {
      res.send({ message: response });
    })
    .catch((error) => {
      console.log("Something went wrong: " + error);
      res.send({
        error: "Error occured here",
      });
    });
});

app.get("/hear", function (req, res) {
  const gtts = new Gtts(req.query.text, req.query.lang);
  gtts.stream().pipe(res);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
