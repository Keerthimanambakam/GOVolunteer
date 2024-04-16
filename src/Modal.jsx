import React from "react";
import Logo from "./assets/logo.png"
import { motion } from "framer-motion";
export const Modal = (props) => {
    const clickHandler = () => {
        props.onClose(false);
    }
    return(
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center gap-3">
            <motion.div   
            initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:30}} 
            className="flex-col items-start justify-start w-[30rem] h-[35rem] border-white border-2 bg-slate-200 rounded-xl gap-2">
                <img src={Logo} alt="logo" className="w-25 h-20 my-2 mx-3"/>
                <h1 className="mx-3 font-bold font-sans text-2xl">Sign Up</h1>
                <span className="font-extralight">Enter your details below to create your account and get started</span>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                    <label htmlFor="Full Name" className="font-light mx-1">Full Name</label><br/>
                    <input type="text" required placeholder="enter..." className="px-3 h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                    <label htmlFor="email" className="font-light mx-1">Email</label><br/>
                    <input type="email"  placeholder="someone@example.com" className="w-[90%] h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                    <label htmlFor="Date of Birth" className="font-light mx-1">Date Of Birth</label><br/>
                    <input type="date" required  className="w-[90%] h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                    <label htmlFor="PhoneNumber" className="font-light mx-1">PhoneNumber</label><br/>
                    <input  required placeholder="+91 ----" className="w-[90%] h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                    <label htmlFor="password" className="font-light mx-1">password</label><br/>
                    <input type="password" required placeholder="enter..." className="w-[90%] h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                    <label htmlFor="password" className="font-light mx-1">Confirm password</label><br/>
                    <input type="password" required placeholder="enter..." className="w-[90%] h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                    <label htmlFor="details" className="font-light mx-1">Education details</label><br/>
                    <input type="Education details" required placeholder="enter..." className="w-[90%] h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                    <label htmlFor="Aadhar Card Number" className="font-light mx-1">Aadhar Card Number</label><br/>
                    <input type="number" required placeholder="12-digit Number" className="w-[90%] h-[33px] mx-1 rounded-sm shadow border-slate-100 border-2"/>
                    </div>
                    <div>
                        <button onClick={clickHandler} className="mx-6 my-2 w-[90%] p-2 text-center text-black bg-slate-100 rounded-xl font-sans hover:bg-slate-50">Cancel</button>
                    </div>
                    <div>
                        <button  className=" my-2 w-[90%] p-2 text-center text-black bg-blue-500 rounded-xl font-sans hover:bg-blue-400">SignUp</button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}