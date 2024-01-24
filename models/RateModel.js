// /backend/src/models/RateModel.js

class RateModel {
  constructor(id, user_id, movie_id, rate) {
    this.id = id;
    this.user_id = user_id;
    this.movie_id = movie_id;
    this.rate = rate;
  }
}

module.exports = RateModel;
