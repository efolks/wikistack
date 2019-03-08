const express = require("express");
const router = express.Router();
const addPage = require("../views/addPage");
const { Page } = require("../models");

router.get("/", (req, res, next) => {
  // res.send('this is wiki');
  res.redirect("./");
});

router.post("/", async (req, res, next) => {
  const newTitle = req.body.title;
  const newContent = req.body.content;

  const page = new Page({
    title: newTitle,
    content: newContent
  });

  try {
    await page.save();
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(addPage());
});

module.exports = router;
