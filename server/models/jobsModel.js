import mongoose,{Schema} from "mongoose"

const jobSchema = new mongoose.Schema({
     company: { type: Schema.Types.ObjectId, ref: "Companies" },
    jobTitle: {
      type: String,
      required: true
    },
    jobType: {
      type: String,
      required: true
    },
    salary: {
      type: Number,
      default:0
    },
    vacancies: {
      type: Number,
      default:0
    },
    experience: {
      type: Number,
      default:0
    },
    location: {
      type: String,
      required: true
    },
    desc: { type: String,
    requires:true },
  }, {
    timestamps: true
  });
  

const Jobs = mongoose.model("Jobs", jobSchema);

export default Jobs;

