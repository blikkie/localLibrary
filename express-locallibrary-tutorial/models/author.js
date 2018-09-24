const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    date_of_birth: { type: Date },
    date_of_death: { type: Date },
  },
);

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function () {
    return `${this.family_name}, ${this.first_name}`;
  });

// Virtual for author's lifespan
AuthorSchema
  .virtual('lifespan')
  .get(function () {
    const dateOfBirthFormatted = this.date_of_birth ? moment(this.date_of_birth).format('MMMM Mo YYYY') : '';
    const dateOfDeathFormatted = this.date_of_death ? moment(this.date_of_death).format('MMMM Mo YYYY') : '';
    return `${dateOfBirthFormatted} - ${dateOfDeathFormatted}`;
  });

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function () {
    return `/catalog/author/${this._id}`;
  });

// Export model
module.exports = mongoose.model('Author', AuthorSchema);
