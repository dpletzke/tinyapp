const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const cookieSession =require('cookie-session');
const bcrypt = require('bcrypt');
const { emailLookup, generateRandomString, urlsForUser } = require('./helpers');
app.use(bodyParser.urlencoded({extended: true}));
const sessionKey = '2012';
app.use(cookieSession({
  name: 'session',
  keys: [sessionKey]
}));

app.set("view engine", "ejs");

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  }
};

const urlDatabase = {
  example1: { longURL: "https://www.tsn.ca", userID: "user1" },
};

app.get("/", (req, res) => {
  const { user_id } = req.session;
  console.log(':::', user_id);
  if(user_id) {
    res.redirect("/urls");
  } else {
    res.redirect('/login');
  }
});

app.get("/urls", (req, res) => {
  const { user_id } = req.session;
  const userURLs = urlsForUser(urlDatabase, user_id);
  const templateVars = {
    user: users[user_id],
    userURLs
  };
  console.log();
  console.log();
  console.log('users::',users);
  console.log();
  console.log('urlDatabase::',urlDatabase);
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  const { user_id } = req.session;
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
  const { user_id } = req.session;
  res.render("register", { user: users[user_id] });
});

app.get("/login", (req, res) => {
  const { user_id } = req.session;
  res.render("login", { user: users[user_id] });
});

app.get("/urls/:shortURL", (req, res) => {
  const { user_id } = req.session;
  const { shortURL } = req.params;
  const templateVars = {
    user: users[user_id],
    error: null
  }
  const urlOwner = urlDatabase[shortURL] ? urlDatabase[shortURL].userID : null;

  if (!user_id) {
    templateVars.error = 'You must be logged in to view this page!'; 
  } else if (!urlOwner || (urlOwner !== user_id)){
    templateVars.error = `This url doesn't exist or it isn't yours!`;
  } else {
    const longURL = urlDatabase[shortURL].longURL;
    const user = users[user_id];
    templateVars.shortURL = shortURL;
    templateVars.longURL = longURL;
  }
  res.render("urls_show", templateVars);
});

app.get("/u/:shortURL", (req, res) => {
  const { shortURL } = req.params;
  const longURL = urlDatabase[shortURL].longURL;
  res.redirect(longURL);
});

app.post("/urls", (req, res) => {
  const { user_id: userID } = req.session;
  const newShortCode = generateRandomString();
  const { longURL } = req.body;
  urlDatabase[newShortCode] = { longURL, userID };
  res.redirect('/urls');
});

app.post("/urls/:id", (req, res) => {
  const { longURL: newLongURL } = req.body;
  const { id } = req.params;
  const { user_id } = req.session;
  if (!user_id) {
    res.end('You need to be logged in on the website!\n');
  } else {
    urlDatabase[id].longURL = newLongURL;
    res.redirect('/urls');
  }

});

app.post("/urls/:id/delete", (req, res) => {
  const { id } = req.params;
  const { user_id } = req.session;
  if (!user_id) {
    res.end('You need to be logged in on the website!\n');
  } else {
    delete urlDatabase[id];
    res.redirect('/urls');
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const user = users[emailLookup(users, email)];

  if (user && bcrypt.compareSync(password, user.hashedPassword)) {
    req.session.user_id = user.id;
    res.redirect('/urls');
  } else {
    res.statusCode = 403;
    res.redirect('/login');
  }
  
});

app.post("/logout", (req, res) => {
  req.session['user_id'] = null;
  res.redirect('/urls');
});

app.post("/register", (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  if (!email || !hashedPassword) {
    res.statusCode = 400;
    res.redirect('/register');
  } else if (emailLookup(users, email)) {
    res.statusCode = 400;
    res.redirect('/register');
  } else {
    const randId = generateRandomString();
    users[randId] = { id: randId, email, hashedPassword };
    req.session.user_id = randId;
    res.redirect('/urls');
  }

});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

