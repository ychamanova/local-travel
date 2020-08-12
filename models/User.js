const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  savedPlaces: [{}],
});

mongoose.model('users', userSchema);
