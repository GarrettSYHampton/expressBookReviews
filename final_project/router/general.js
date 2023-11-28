const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

async function wait(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

// Allow a user to register
public_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username && password) {
    if (!isValid(username)) {
      users.push({ username: username, password: password });
      return res.status(200).json({
        message: "Customer successfully registered. Now you can login.",
      });
    } else {
      return res.status(404).json({ message: "Customer already exists!" });
    }
  }
  return res.status(404).json({ message: "Unable to register customer." });
});

// Get the book list available in the shop asynchronously
public_users.get("/", async function (req, res) {
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      res.send(books);
      resolve();
    }, 2000);
  });
});

// Get book details based on ISBN asynchronously
public_users.get("/isbn/:isbn", async function (req, res) {
  const isbn = req.params.isbn;
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      res.send(books[isbn]);
      resolve();
    }, 2000);
  });
});

// Get book details based on author asynchronously
public_users.get("/author/:author", async function (req, res) {
  const author = req.params.author;
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksToReturn = [];
      for (const property in books) {
        if (books[property].author === author) {
          booksToReturn.push(books[property]);
        }
      }
      res.send(booksToReturn);
      resolve();
    }, 2000);
  });
});

// Get all books based on title asynchronously
public_users.get("/title/:title", async function (req, res) {
  const title = req.params.title;
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      const booksToReturn = [];
      for (const property in books) {
        if (books[property].title === title) {
          booksToReturn.push(books[property]);
        }
      }
      res.send(booksToReturn);
      resolve();
    }, 2000);
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  const isbn = req.params.isbn;
  res.send(books[isbn].reviews);
});

module.exports.general = public_users;
