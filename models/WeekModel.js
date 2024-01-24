// /backend/src/models/WeekModel.js

class WeekModel {
  constructor(id, name, movies, year, user_id) {
    this.id = id;
    this.name = name;
    this.movies = movies;
    this.year = year;
    this.user_id = user_id;
  }
}

module.exports = WeekModel;
