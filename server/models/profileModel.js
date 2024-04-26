const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  profilePic: {
    type: String // You can store the URL/path to the profile picture
  },
  bio: {
    type: String
  },
  resume: {
    type: String // You can store the URL/path to the resume file
  },
  pastWorks: {
    title: String,
    description: String,
    review: //star
  }
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;
