import Companies from "../models/companiesModel.js";
import mongoose from "mongoose";
import { response } from "express";




export const register = async (req, res, next) => {
   const { name, email, password ,number, dob} = req.body;

  if (!name) {
    next("Company Name is required!");
    return;
  }
  if (!email) {
    next("Email address is required!");
    return;
  }
  if (!dob) {
    next("DOBis required!");
    return;
  }
  if (!number) {
    next("Number is required!");
    return;
  }
  if (!password) {
    next("Password is required and must be greater than 6 characters");
    return;
  }  

  console.log(email)

  try {
    const accountExist = await Companies.findOne({ email });

    if (accountExist) {
      next("Email Already Registered. Please Login");
      return;
    }

    const company = await Companies.create({
      name,
      email,
      password,
      dob,
      number
    });

    // user token
    const token = company.createJWT();

    res.status(201).json({
      success: true,
      message: "Company Account Created Successfully",
      user: {
        _id: company._id,
        name: company.name,
        email: company.email,
        dob: company.dob,
        number:company.number
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};



export const signIn = async (req, res, next) => {
    console.log("hiyay")
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    const user = await Companies.findOne({ email }).select("+password");

    console.log(user)

    if (!user) {
      next("Invalid email");
      return;
    }

    
    const confirmPassword = await user.comparePassword(password);

    if (!confirmPassword) {
      next("Invalid password");
      return;
    }

    user.password = undefined;

    const token = user.createJWT();

    res.status(201).json({
      success: true,
      message: "Login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const showAllComapanies = async (req, res, next) => {
  try {

    const { search, sort, location } = req.query;

    const queryObject = {};

    if (search) {
      queryObject.name = { $regex: jobTitle, $options: "i" };
    }

    if (location) {
      queryObject.location = { $regex: location, $options: "i" };
    }

    let queryResult = Companies.find(queryObject).select("-password");

    console.log("hiiii",queryResult)


    if (sort === "Newest") {
      queryResult = queryResult.sort("-createdAt");
    }
    if (sort === "Oldest") {
      queryResult = queryResult.sort("createdAt");
    }
    if (sort === "A-Z") {
      queryResult = queryResult.sort("name");
    }
    if (sort === "Z-A") {
      queryResult = queryResult.sort("-name");
    }

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    //const skip = (page - 1) * limit;

    const total = await Companies.countDocuments(queryResult);
    const numOfPage = Math.ceil(total / limit);
    

    queryResult = queryResult.limit(limit * page);

    
    const companies = await queryResult;

    res.status(200).json({
      success: true,
      total,
      data: companies,
      page,
      numOfPage,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to show a specific job by ID
const showCompany = async (req, res,next) => {
  try {
    const id = req.body.user.userId;

    const Company = await Companies.findById(req.params.id);
    if (!Company) {
      return res.status(404).json({ message: 'company not found' });
    }
    Company.password = undefined;
    res.status(200).json({
      success: true,
      data: Company,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Controller function to update a job
const updateCompany = async (req, res,next) => {
   const {name,  location, profileUrl,number,dob, about } = req.body;

   console.log("hii")

  try {
    //const {id}=req.body
    console.log("heyyhii")

    if (!name || !location || !about || !number) {
      next("Please Provide All Required Fields");
      return;
    }
     
    console.log("what",req.body)
    const id = req.body._id;
    console.log(id)
    console.log("wrong")

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send(`No Company with id: ${id}`);

    console.log("correct",profileUrl)
    const updateCompany = {
      name,
      number,
      location,
      profileUrl,
      about,
      _id: id,
    };

    const company = await Companies.findByIdAndUpdate(id, updateCompany, {
      new: true,
    });
    console.log("still correct")

    const token = company.createJWT();

    company.password = undefined;

    console.log("correct again")

    res.status(200).json({
      success: true,
      message: "Company Profile Updated SUccessfully",
      company,
      token,
    });
     
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: err.message });
  }
};

const deleteCompany = async (req, res) => {
    try {
        const Company = await Companies.findById(req.params.id);
        console.log("company:", Company);
        if (!Company) {
        return res.status(404).json({ message: 'Company not found' });
        }
        await Company.deleteOne({id:req.param.id});
        res.json({ message: 'Company deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
    };

const showCompanyById= async (req, res, next) => {
  try {
    console.log("yoooopp",req.body)
    console.log("yoooopp",req.params)
    const { id } = req.params;
    console.log("khkh")
    const company = await Companies.findById({ _id: id }).populate({
      path: "jobPosts",
      options: {
        sort: "-_id",
      },
    });

    if (!company) {
      return res.status(200).send({
        message: "Company Not Found",
        success: false,
      });
    }

    company.password = undefined;

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    console.log("heyyy",error);
    res.status(404).json({ message: error.message });
  }
};
    
const showAllJobsPosted = async (req,res)=>{
    const { search, sort } = req.query;
    const id = req.body.user.userId;

    try{
       const queryObject = {};

        if (search) {
          queryObject.location = { $regex: search, $options: "i" };
        }

        let sorting;
        if (sort === "Newest") {
          sorting = "-createdAt";
        }
        if (sort === "Oldest") {
          sorting = "createdAt";
        }
        if (sort === "A-Z") {
          sorting = "name";
        }
        if (sort === "Z-A") {
          sorting = "-name";
        }
         let queryResult = await Companies.findById({ _id: id }).populate({
            path: "jobPosts",
            options: { sort: sorting },
          });
          const companies = queryResult;

          res.status(200).json({
            success: true,
            companies,
          });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

export default {
        showAllComapanies,
        showCompany,
        showCompanyById,
        register,
        signIn,
        updateCompany,
        deleteCompany,
        showAllJobsPosted
};