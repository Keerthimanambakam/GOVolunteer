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
    try {
        let user = await Users.findById(req.params.id);
        
        if (!user) {
            return next(new ErrorResponse(`User not found with id ${req.params.id}`, 404));
        }
        
        user = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return next(error);
    }
};
