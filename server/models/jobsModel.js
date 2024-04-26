import mongoose from "mongoose"

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
