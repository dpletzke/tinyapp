const { assert, expect } = require('chai');

const { emailLookup, generateRandomString, urlsForUser } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('emailLookup', function() {
  it('should return a user with valid email', function() {
    const user = emailLookup(testUsers, "user@example.com");
    const expectedOutput = "userRandomID";
    expect(user).to.be.equal(expectedOutput);
  });

  it('should return null with no valid email', function() {
    const user = emailLookup(testUsers, "user@badexample.com");
    expect(user).to.be.null;
  });
});

const testUrlDatabase = {
  shortCode1: { longURL: "https://www.tsn.ca", userID: "user1" },
  shortCode2: { longURL: "https://www.youtube.com", userID: "user1" },
  shortCode3: { longURL: "https://www.google.ca", userID: "user2" }
};

describe('urlsForUser', () => {
  it('should return all of the urls for a given user', () => {
    const urls = urlsForUser(testUrlDatabase, 'user1');
    const expectedOutput = {
      shortCode1: { longURL: "https://www.tsn.ca", userID: "user1" },
      shortCode2: { longURL: "https://www.youtube.com", userID: "user1" }
    }
    expect(urls).to.be.deep.equal(expectedOutput);
  });

  it('should return an empty object no urls for that user', () => {
    const urls = urlsForUser(testUrlDatabase, 'user3');
    const expectedOutput = {};
    expect(urls).to.be.deep.equal(expectedOutput);
  });
});