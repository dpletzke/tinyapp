const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const { emailLookup, generateRandomString, urlsForUser } = require('./helpers');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.set("view engine", "ejs");

const users = { 
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  }
}

const urlDatabase = {
  example1: { longURL: "https://www.tsn.ca", userID: "user1" },
  example2: { longURL: "https://www.google.ca", userID: "user1" }
};

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls", (req, res) => {
  const { user_id } = req.cookies;
  const userURLs = urlsForUser(urlDatabase, users[user_id]);
  const templateVars = {
    user: users[user_id],
    userURLs    
  };
  console.log();
  console.log();
  console.log();
  console.log('users::',users);
  console.log('urlDatabase::',urlDatabase);
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const { user_id } = req.cookies;
  if (!user_id) {
    res.redirect('/login');
  } else {
    const templateVars = {
      user: users[user_id],
    };
    res.render("urls_new", templateVars);
  }
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/urls/:shortURL", (req, res) => {
  const { user_id } = req.cookies;
  const { shortURL } = req.params;
  const longURL = urlDatabase[shortURL].longURL;
  const user = users[user_id];

  const templateVars = {
    user, 
    shortURL,
    longURL,
  };
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const { shortURL } = req.params;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
  const { user_id: userID } = req.cookies; 
  const newShortCode = generateRandomString();
  const { longURL } = req.body;
  urlDatabase[newShortCode] = { longURL, userID }
  res.redirect('/urls');
});

app.post("/urls/:id", (req, res) => {
  const { longURL: newLongURL } = req.body;
  const { id } = req.params
  const { user_id } = req.cookies;
  if(!user_id) {
    res.end('You need to be logged in on the website!\n');
  } else {
    urlDatabase[id].longURL = newLongURL;
    res.redirect('/urls');
  }

});

app.post("/urls/:id/delete", (req, res) => {
  const { id } = req.params;
  const { user_id } = req.cookies;
  if(!user_id) {
    res.end('You need to be logged in on the website!\n');
  } else {
    delete urlDatabase[id];
    res.redirect('/urls');
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = emailLookup(users, email);

  if(user && user.password === password) {
    res.cookie('user_id', user.id);
    res.redirect('/urls');
  } else {
    res.statusCode = 403;
    res.redirect('/login');
  }
  
});

app.post("/logout", (req, res) => {
  res.clearCookie('user_id');
  res.redirect('/urls');
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  
  if(!email && !password) {
    res.statusCode = 400;
    res.redirect('/register');
  } else if (emailLookup(users, email)) {
    res.statusCode = 400;
    res.redirect('/register');
  } else {
    const randId = generateRandomString();
    users[randId] = { id: randId, email, password };
    res.cookie('user_id', randId);
    res.redirect('/urls');
  }

});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

