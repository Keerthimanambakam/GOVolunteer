import company from "../models/companiesModel.js";
import Job from "../models/jobsModel.js"
export const register = async (req, res, next) => {
    
  const { name, email, password ,number,dob} = req.body;

  if (!name) {
    next("Name is required");
  }
  if (!email) {
    next("email is required");
  }
  if (!password) {
    next("password is required");
  }
  if (!number) {
    next("Number is required");
  }
  if (!dob) {
    next("dob is required");
  }

  try {
    const companyExist = await company.findOne({ email });

    if (companyExist) {
      next("Email Address already exists");
      return;
    }

    const Company = await company.create({
      name,
      email,
      password,
      dob,
      number,

    });

    const token = await Company.createJWT();

    res.status(201).send({
      success: true,
      message: "Account created successfully",
      Company: {
        _id: Company._id,
        name:Company.name,
        email: Company.email,
        dob:Company.dob,
        number:Company.number,
        accountType: Company.accountType,
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

    const Company = await company.findOne({ email }).select("+password");

    if (!Company) {
      next("Invalid email");
      return;
    }

    
    const confirmPassword = await Company.comparePassword(password);

    if (!confirmPassword) {
      next("Invalid password");
      return;
    }

    Company.password = undefined;

    const token = Company.createJWT();

    res.status(201).json({
      success: true,
      message: "Login successfully",
      Company,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};

const showAllComapanies = async (req, res) => {
  try {
    const companies = await company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controller function to show a specific job by ID
const showCompany = async (req, res) => {
  try {
    const Company = await company.findById(req.params.id);
    if (!Company) {
      return res.status(404).json({ message: 'company not found' });
    }
    res.json(Company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Controller function to update a job
const updateCompany = async (req, res) => {
  try {
    const Company = await company.findById(req.params.id);
    if (!Company) {
      return res.status(404).json({ message: 'Job not found' });
    }
      // change this to company
      Company.name = req.body.name;
      Company.email = req.body.email;
      Company.dob = req.body.dob;
      Company.number = req.body.number;
      Company.accountType = req.body.accountType;

    const updatedCompany = await Company.save();
    res.json(updatedCompany);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
const deleteCompany = async (req, res) => {
    try {
        const Company = await company.findById(req.params.id);
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
    
const showAllJobsPosted = async (req,res)=>{
    try{
        const companyId = req.params.id;
        const allJobsPosted = await Job.find({ companyId });
        res.json(allJobsPosted); // Respond with the list of jobs
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}
export default {
        showAllComapanies,
        showCompany,
        register,
        signIn,
        updateCompany,
        deleteCompany,
        showAllJobsPosted
};