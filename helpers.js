const emailLookup = (users, email) => {
  for (user in users) {
    if (users[user].email === email) {
      return users[user];
    }
  }
  return null;
}

const generateRandomString = () => { 
  let result = '';
  while (!result) {
    result = Math.random().toString(36).substring(2, 8);
    return result;
  }
}

module.exports = { emailLookup, generateRandomString }