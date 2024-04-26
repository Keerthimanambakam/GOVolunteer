import mongoose from "mongoose"
<<<<<<< HEAD
=======
<<<<<<< HEAD
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
=======
>>>>>>> 4a0f3082c605446168e8e32dd0933022f71a9b01

const jobSchema = new mongoose.Schema({
    userId: {
      type: String,
      ref: 'User',
      required: true
    },
    jobTitle: {
      type: String,
      required: true
    },
    jobType: {
      type: String,
      enum: ['Full-time', 'Part-time', 'Contract', 'Freelance'],
      required: true
    },
    salaryUSD: {
      type: Number,
      default:0
    },
    vacancies: {
      type: Number,
      default:0
    },
    yearsOfExperience: {
      type: Number,
      default:0
    },
    workLocation: {
      type: String,
      required: true
    },
    workDescription: {
      type: String,
      required: true
    }
  }, {
    timestamps: true
  });
  

const JobCard = mongoose.model('JobCard', jobSchema);

export default JobCard;
<<<<<<< HEAD
=======
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
>>>>>>> 4a0f3082c605446168e8e32dd0933022f71a9b01
