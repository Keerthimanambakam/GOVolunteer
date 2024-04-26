import mongoose from "mongoose"
const jobCardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  Recruiter: {
    type: String,
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: [String],
  postedAt: {
    type: Date,
    default: Date.now
  },
  ageCategory: {
    type: String,
    enum: ['Under 18', '18-25', '26-35', '36-45', '46-55', '56-65', 'Over 65','Any'],
    required: true
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  timeCommitment: {
    hoursPerWeek: {
      type: Number,
      min: 1,
      required: true
    },
    daysPerWeek: {
      type: Number,
      min: 1,
      max: 7,
      required: true
    }
  },
  durationDays: {
    type: Number,
    min: 1, // Minimum duration in days
    required: true
  },
  applicationDeadline: {
    type: Date,
  }
  
  

 
})

const JobCard = mongoose.model('JobCard', jobCardSchema);

module.exports = JobCard;
