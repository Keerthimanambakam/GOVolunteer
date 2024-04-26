import mongoose from "mongoose";
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
    contact: { type: String },
    location: { type: String },
    profileUrl: { type: String },
    cvUrl: { type: String },
    jobTitle: { type: String },
    about: { type: String },
   },
    { timestamps: true }
);

userSchema.pre('save',async function(){
    if (!this.isModified) return;
    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password,salt);
})

userSchema.methods.comparePassword=async function(userPassword){
<<<<<<< HEAD
    const conformPassword=await bcrypt.compare(userPassword,this.password);
    return conformPassword;
=======
<<<<<<< HEAD
    const conformPassword=await bcrypt.compare(userPassword,this.password);
    return conformPassword;
=======
    const confirmPassword=await bcrypt.compare(userPassword,this.password);
    return confirmPassword;
>>>>>>> b9e5b0a4f244adc51b07bb6efeb19d46de0d84ef
>>>>>>> 4a0f3082c605446168e8e32dd0933022f71a9b01
}

userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
  });
};

const Users=mongoose.model('Users',userSchema);

export default Users;