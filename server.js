const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const URL = require("./database/models/url");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

const port = process.env.PORT ?? 3000;

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log("Could not connect to database: " + err);
      process.exit(1);
      return;
    }

    app.listen(port, () => {
      console.log("Server started");
    });
  }
);

app.post("/api", async (req, res) => {
  try {
    const keyString = req.headers.authorization.split(" ")[1];
    if (keyString !== process.env.API_KEY) throw new Error("Keys don't match");
    await URL.create({
      fullUrl: req.body.fullUrl,
      shortUrl: req.body.shortUrl,
    });
    return res.sendStatus(200);
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(401);
  }
});

const getUrl = async (req, res, next) => {
  const url = await URL.findOne({ shortUrl: req.params.url });
  req.url = url;
  next();
};

app.get("/:url", getUrl, async (req, res) => {
  if (req.url == null) return res.sendStatus(404);
  console.log(
    `Redirecting from ${req.url.shortUrl} to ${
      req.url.fullUrl
    }. This has been done ${req.url.uses + 1} times`
  );
  await URL.findOneAndUpdate({ _id: req.url._id }, { $inc: { uses: 1 } });
  res.redirect(req.url.fullUrl);
});
