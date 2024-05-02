import Users from "../models/userModel.js";
import ErrorResponse from "../utils/errorResponse.js";


export const getUser = async (req, res, next) => {
    try {
        const user = await Users.findById(req.params.id);
        
        if (!user) {
            return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
        }
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error);
    }
};


export const updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;
  try {
      let user = await Users.findById(req.params.id);
      if (!user) {
          return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
      }
      user = await Users.findByIdAndUpdate(id,{$set:data},{new:true,runValidators:true})
      user.password=undefined;
      const token = await user.createJWT(); 
      return res.status(200).json({user:user,token:token});
  } catch (error) {
      return next(error);
  }
};



export const showUserById= async (req, res, next) => {
  try {
    
    const { id } = req.params;
    const user = await Users.findById({ _id: id }).populate({
      path: "appliedJobs",
      options: {
        sort: "-_id",
      },
    });

    if (!user) {
      return res.status(200).send({
        message: "User Not Found",
        success: false,
      });
    }

    user.password = undefined;

    console.log(user)

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("heyyy",error);
    res.status(404).json({ message: error.message });
  }
};
