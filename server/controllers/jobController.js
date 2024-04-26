
import Job from "../models/jobsModel.js"
// Controller function to show all jobs
const showAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to show a specific job by ID
const showJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to create a new job
const createJob = async (req, res) => {
  const job = new Job({
    companyId: req.body.companyIdId,
    jobTitle: req.body.jobTitle,
    jobType: req.body.jobType,
    salaryUSD: req.body.salaryUSD,
    vacancies: req.body.vacancies,
    yearsOfExperience: req.body.yearsOfExperience,
    experience: req.body.experience,
    workLocation: req.body.workLocation,
    workDescription: req.body.workDescription
  });

  try {
    const newJob = await job.save();
    res.status(201).json(newJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controller function to update a job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    job.companyId = req.body.companyId;
    job.jobTitle = req.body.jobTitle;
    job.jobType = req.body.jobType;
    job.salaryUSD = req.body.salaryUSD;
    job.vacancies = req.body.vacancies;
    job.yearsOfExperience = req.body.yearsOfExperience;
    job.experience = req.body.experience;
    job.workLocation = req.body.workLocation;
    job.workDescription = req.body.workDescription;

    const updatedJob = await job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deleteJob = async (req, res) => {
    try {
        const job = await Job.findById(req.params.id);
        console.log("job:", job);
        if (!job) {
        return res.status(404).json({ message: 'Job not found' });
        }
        await Job.deleteOne({id:req.param.id});
        res.json({ message: 'Job deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };
    
export default {
        showAllJobs,
        showJob,
        createJob,
        updateJob,
        deleteJob
};