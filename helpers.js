const urlsForUser = (urlsDatabase, user) => {
  const output = {};
  if (!user) {
    return null;
  }
  for (const url in urlsDatabase) {
    const urlOwner = urlsDatabase[url].userID;
    if (urlOwner === user.id) {
      output[url] = urlsDatabase[url];
    }
  }
  return output;

};

const emailLookup = (users, email) => {
  for (const user in users) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  return null;
};

const generateRandomString = () => {
  let result = '';
  while (!result) {
    result = Math.random().toString(36).substring(2, 8);
    return result;
  }
};

const testUser = {
  id: 'aJ48lW',
  email: 'user@example.com',
  password: 'purple-monkey-dinosaur'
};

const testURLs = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};


// console.log(urlsForUser(testURLs,testUser));

module.exports = { emailLookup, generateRandomString, urlsForUser };