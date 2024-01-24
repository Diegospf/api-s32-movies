// /backend/src/models/UserModel.js

class UserModel {
  constructor(id, username, password) {
    this.id = id;
    this.username = username;
    this.password = password;
  }
}

module.exports = UserModel;
