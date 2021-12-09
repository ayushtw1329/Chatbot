import express from "express";
const app = express();
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";

import { talkToChatbot } from "./chatbot";
var jsonParser = bodyParser.json();
var urlEncoded = bodyParser.urlencoded({ extended: true });

app.use(cors());
app.use(morgan("dev"));

app.post("/chatbot", jsonParser, urlEncoded, function (req, res, next) {
  const message = req.body.message;
  console.log('inside server');
  
  // talkToChatbot(message)
  //   .then((response) => {
  //     res.send({ message: response });
  //   })
  //   .catch((error) => {
  //     console.log("Something went wrong: " + error);
  //     res.send({
  //       error: "Error occured here",
  //     });
  //   });
  res.send({message: message})
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
