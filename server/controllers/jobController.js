
import Jobs from "../models/jobsModel.js"
import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";
// Controller function to show all jobs
const showAllJobs = async (req, res) => {
  try {
    const { search, sort, location, jtype, exp } = req.query;
    const types = jtype?.split(","); 
    const experience = exp?.split("-"); 

    let queryObject = {};

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    if (jtype) {
      queryObject.jobType = { $in: types };
    }

    if (exp) {
      if(experience[1]==="undefined")
      {
        experience[1]=0
      }
      if(experience[0]==6)
      {
        queryObject.experience = {
        $gte: Number(experience[0]) - 1,
        
      };
      }
      else{
      queryObject.experience = {
        $gte: Number(experience[0]) - 1,
        $lte: Number(experience[1]) + 1,
      };
    }
    }

    if (search) {
      const searchQuery = {
        $or: [
          { jobTitle: { $regex: search, $options: "i" } },
          { jobType: { $regex: search, $options: "i" } },
        ],
      };
      queryObject = { ...queryObject, ...searchQuery };
    }

    //let queryResult = Jobs.find(queryObject).select("-password");

    let queryResult = Jobs.find(queryObject).populate({
      path: "company",
      select: "-password",
    });
 
    //console.log(sort,queryResult)
    
    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("jobTitle");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-jobTitle");
    }

   
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;

    const totalJobs = await Jobs.countDocuments(queryResult);
    const numOfPage = Math.ceil(totalJobs / limit);

    console.log("pagee",numOfPage,totalJobs)
    queryResult = queryResult.limit(limit * page);

    const jobs = await queryResult;

    res.status(200).json({
      success: true,
      totalJobs,
      data: jobs,
      page,
      numOfPage
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Controller function to show a specific job by ID
const showJob = async (req, res) => {
 try {
    const { id } = req.params;

    const job = await Jobs.findById({ _id: id }).populate({
      path: "company",
      select: "-password",
    });

    if (!job) {
      return res.status(200).send({
        message: "Job Post Not Found",
        success: false,
      });
    }

    const searchQuery = {
      $or: [
        { jobTitle: { $regex: job?.jobTitle, $options: "i" } },
        { jobType: { $regex: job?.jobType, $options: "i" } },
      ],
    };

    let queryResult = Jobs.find(searchQuery)
      .populate({
        path: "company",
        select: "-password",
      })
      .sort({ _id: -1 });

    queryResult = queryResult.limit(6);
    const similarJobs = await queryResult;

    res.status(200).json({
      success: true,
      data: job,
      similarJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

// Controller function to create a new job
const createJob = async (req, res,next) => {
   try {
    console.log("upload job request",req.body)
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
    } = req.body;

    if (!jobTitle){
        next("Please Provide jobtitle");
      }
    if(!jobType){
        next("Please Provide jobtype");
      }
    if(!location){
        next("Please Provide loctaion");
      }
    if(!salary)
    {
      next("Please Provide salary");
    } 
    if(!desc){
      next("Please Provide desc");
    }
    

    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      company: id,

    };

    const job = new Jobs(jobPost);
    await job.save();
     console.log("whyyyy",job)
    const company = await Companies.findById(id);

    company.jobPosts.push(job._id);
    const updateCompany = await Companies.findByIdAndUpdate(id, company, {
      new: true,
    });
    console.log("AFTER UPDATING",updateCompany)
    res.status(200).json({
      success: true,
      message: "Job Posted SUccessfully",
      job,
    });

  }catch(e){
    console.log(e);
    res.status(404).json({ message: e.message });
  }

  
};

// Controller function to update a job
const updateJob = async (req, res,next) => {
  try {
    const {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      desc,
      requirements,
    } = req.body;
    const { jobId } = req.params;

    if (
      !jobTitle ||
      !jobType ||
      !location ||
      !salary ||
      !desc ||
      !requirements
    ) {
      next("Please Provide All Required Fields");
      return;
    }
    const id = req.body.user.userId;

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    const jobPost = {
      jobTitle,
      jobType,
      location,
      salary,
      vacancies,
      experience,
      detail: { desc, requirements },
      _id: jobId,
    };

    await Jobs.findByIdAndUpdate(jobId, jobPost, { new: true });

    res.status(200).json({
      success: true,
      message: "Job Post Updated SUccessfully",
      jobPost,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
    };

const deleteJob= async (req, res, next) => {
  try {
    const { id } = req.params;

    await Jobs.findByIdAndDelete(id);

    res.status(200).send({
      success: true,
      messsage: "Job Post Delted Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};
    
export default {
        showAllJobs,
        showJob,
        createJob,
        updateJob,
        deleteJob
};