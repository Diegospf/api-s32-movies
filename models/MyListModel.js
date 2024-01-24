// /backend/src/models/MyListModel.js

class MyListModel {
  constructor(id, user_id, movie_id) {
    this.id = id;
    this.user_id = user_id;
    this.movie_id = movie_id;
  }
}

module.exports = MyListModel;
