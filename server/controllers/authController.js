import Users from "../models/userModel.js";

export const register = async (req, res, next) => {
  const { name, email, password ,number,dob} = req.body;

  if (!name || !email || !password || !number || !dob) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await Users.findOne({ email });

    if (userExist) {
      next("Email Address already exists");
      return;
    }

    const user = await Users.create({
      name,
      email,
      password,
      dob,
      number,

    });

    const token = await user.createJWT();

    res.status(201).send({
      success: true,
      message: "Account created successfully",
      user: {
        _id: user._id,
        name:user.name,
        email: user.email,
        dob:user.dob,
        number:user.number,
        accountType: user.accountType,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: error.message });
  }
};



export const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      next("Please Provide User Credentials");
      return;
    }

    const user = await Users.findOne({ email }).select("+password");

    if (!user) {
      next("Invalid email");
      return;
    }

    
    const conformPassword = await user.comparePassword(password);

    if (!conformPassword) {
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