import mongoose,{Schema} from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"name is required"]
    },
    email:{
         type:String,
         required:[true,"email is required"],
         validate:validator.isEmail,
         unique:true
    },
    number:{
        type:Number,
        required:[true,"number is required"],
        unique:true,
    },
    dob:{
        type:Date,
        required:[true,"date of birth is required"],
    },
    password:{
        type:String,
        required:[true,"password is required"],
        minlength: [6, "Password length should be greater than 6 character"],
        select: true,
    },
    accountType: { type: String, default: "volunteer" },
    location: { type: String },
    profileUrl: { type: String },
    cvUrl: { type: String },
    about: { type: String },
    feedback:[{type: Schema.Types.ObjectId, ref: "Jobs" }],
    appliedJobs:[{ type: Schema.Types.ObjectId, ref: "Jobs" }]
   },
    { timestamps: true }
);

userSchema.pre('save',async function(){
    if (!this.isModified) return;
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword=async function(userPassword){


    const confirmPassword=await bcrypt.compare(userPassword,this.password);
    return confirmPassword;
}

userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Users=mongoose.model('Users',userSchema);

export default Users;