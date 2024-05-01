
import Jobs from "../models/jobsModel.js"
import mongoose from "mongoose";
import Companies from "../models/companiesModel.js";
import Users from "../models/userModel.js"
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

const applyJob=async(req,res,next)=>{
  try {
    console.log(req.body);
    const {
      name,
      email,
      number,
      cvUrl,
      desc,
      job_id
    } = req.body;

    if (!name){
        next("Please Provide name");
      }
    if(!email){
        next("Please Provide email");
      }
    if(!number){
        next("Please Provide number");
      }
    

    const user_id = req.body.user.userId;

    
   if (!mongoose.Types.ObjectId.isValid(user_id))
      return res.status(404).send(`No user with id: ${user_id}`);
    

    const user = await Users.findById(user_id);

    console.log("userr",user)

    user.appliedJobs.push(job_id);
    if(cvUrl!=undefined){
      user.cvUrl=cvUrl;
    }
    
    if(desc!=undefined)
    {
     user.desc=desc;
    }
    

    const updateUser = await Users.findByIdAndUpdate(user_id, user, {
      new: true,
    });

    console.log("jobiidd",job_id)

    const job = await Jobs.findById(job_id);

    console.log("jobsss",job)

    job.applicants.push(user_id);

    const updateJob = await Jobs.findByIdAndUpdate(job_id, job, {
      new: true,
    });
 
    console.log("hiiiiiiii")

    res.status(200).json({
      success: true,
      message: "Oppurtunity Applied Successfully",
      job,
    });

  }catch(e){
    console.log(e);
    console.log("thiss errorr")
    res.status(404).json({ message: e.message });
  }

}
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

const showApplications=async(req,res,next)=>{
  try {
   console.log("khyaaa",req.body)
    const { location, sort, jTitle } = req.query;

    console.log("whooo",jTitle,location);
    const user_id = req.body._id;
    const queryObject = {};

    if (jTitle) {
      queryObject.jobTitle = { $regex: jTitle, $options: "i" };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }
    
    const user = await Users.findById(user_id);

  
    const jobs=user.appliedJobs
     
    
    let queryResult=Jobs.find({...queryObject,_id:{$in:jobs}});
    
    console.log("finalll")

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
    const limit = Number(req.query.limit) || 20;

    //const skip = (page - 1) * limit;

    const total = jobs.length;
    const numOfPage = Math.ceil(total / limit);
    
    queryResult = queryResult.limit(limit * page);

    console.log("hiiiii",queryResult)
    const applications = await queryResult;
    
    console.log("yahooo")
    
    console.log()

    res.status(200).json({
      success: true,
      total,
      data: applications,
      page,
      numOfPage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

const withdrawJob=async(req,res,next)=>{
  try {
    const { id } = req.params;

    //const job=await Jobs.findById(id);
    const user_id = req.body._id;
    const user = await Users.findById(user_id);

    console.log("jobbbid",user.appliedJobs)

    await Jobs.updateOne({ _id: id },{ $pull: { applicants: user_id } } )

    await Users.updateOne( { _id: user_id }, { $pull: { appliedJobs:  id } } )
    

    
    const users = await Users.findById(user_id);
    console.log("jobbbid",users.appliedJobs)



    //console.log("applicantions",user.appliedJobs);

    res.status(200).send({
      success: true,
      messsage: "Application withdraw Successful.",
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
}

const isAppliedJob=async(req,res,next)=>{
  try{
    console.log("hiii",req.params);
   const job_id=req.params.id;
  const user_id = req.body._id;
  const user = await Users.findById(user_id);
  const jobs=user.appliedJobs
  console.log("iddd",job_id)
  if(jobs.includes(job_id)){
    console.log("included",job_id)
    res.status(200).json({
      success: true,
      data: true,
      
    });
  }
  else{
  res.status(200).json({
      success: true,
      data: false,
    });
  }
  
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
  


}
    
export default {
        showAllJobs,
        showJob,
        createJob,
        updateJob,
        withdrawJob,
        deleteJob,
        applyJob,
        isAppliedJob,
        showApplications
};