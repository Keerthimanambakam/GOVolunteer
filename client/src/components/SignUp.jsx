import React, {useState} from 'react'
import {useLocation} from "react-router-dom";
import {useDispatch} from "react-redux"
import { motion } from "framer-motion";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import Logo from "../assets/volunteer.png"
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router-dom";
import {Input,CustomButton} from './index';

const SignUp = ({open,setOpen,isRegister,setIsRegister}) => {
  const dispatch=useDispatch();
  const loctaion=useLocation();
 const [accountType,setAccountType]=useState("volunteer");
 const [errMsg,setErrMsg]=useState("");

 let from=location.state?.from?.pathname||"/";

 const closeModal = () => {
  setOpen(false);
  console.log(from);
 };

 const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

 const onSubmit = () => {};


  return(
    <>
    <div className="fixed inset-0 bg-paynes_gray backdrop-blur-sm flex items-center justify-center gap-3">
    <Transition appear show={open || false}>
    <motion.div  initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:30}} 
            className={`${isRegister?"flex-col items-start justify-start w-[30rem] h-[35rem] border-white border-2 bg-slate-200 rounded-xl gap-2 mt-20":"flex-col items-start justify-start w-[25rem] h-[25rem] border-white border-2 bg-slate-200 rounded-xl gap-2 mt-20"}`}>
            
              <Link to={from}>
               <button className='flex flex-row-reverse px-1 py-1 outline-none' onClick={closeModal}>
              <IoMdClose className='w-full' />
              </button>
              </Link>

             <h3 className='text-xl font-semibold text-gray-900'>                   
              {isRegister ? "Create Account" : "Account Sign In"}
             </h3>
             <div className='w-full flex items-center justify-center py-4 px-1'>
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType === "volunteer"
                          ? "bg-persian_orange font-semibold"
                          : "bg-white border border-burnt_seinna"
                      }`}
                      onClick={() => setAccountType("volunteer")}
                    >
                      Volunteer Account
                    </button>
                    <button
                      className={`flex-1 px-4 py-2 rounded text-sm outline-none ${
                        accountType !== "volunteer"
                          ? "bg-persian_orange font-semibold"
                          : "bg-white border border-burnt_seinna"
                      }`}
                      onClick={() => setAccountType("recruiter")}
                    >
                      Recruiter Account
                    </button>
            </div>

          <form className='w-full flex flex-col gap-5 px-1' onSubmit={handleSubmit(onSubmit)}>

            <div className={`${isRegister ? "grid grid-cols-2 gap-4" : "w-full"}`}>

            {isRegister && (
                      <div >
                        <div>
                          <Input
                            name="Full Name"
                            label="Full Name"
                            placeholder="name"
                            type='text'
                            register={register(
                               "name",
                              {
                                required:
                                  "Name is required",
                              }
                            )}
                            error={
                             errors.name
                                ? errors.name?.message
                                : ""
                            }
                          />
                        </div>
                      </div>
                    )}

            <Input name='email' 
                   label='Email Address'
                   placeholder='email@example.com'
                   type='email'
                   register={register("email", {
                    required: "Email Address is required!",
                     })}
                    error={errors.email ? errors.email.message : ""}
            />
            {isRegister && 
            <Input name='dob' 
                   label='Date of Birth'
                   type='date'
                   register={register("dob", {
                    required: "Date of Birth is required!",
                     })}
                    error={errors.dob ? errors.dob.message : ""}
            />}

            {isRegister && 
            <Input name='number' 
                   label='PhoneNumber'
                   type='Number'
                   register={register("number", {
                    required: "Number is required!",
                     })}
                    error={errors.number ? errors.number.message : ""}
            />}


            
            <div >
                <Input name='password'
                       label='password'
                        placeholder='password'
                        type='password'
                          register={register("password", {
                            required: "Password is required!",
                          })}
                          error={
                            errors.password ? errors.password?.message : ""
                          }
                 />
             </div>

               {isRegister && (
                    <div className=''>
                          <Input
                            label='Confirm Password'
                            placeholder='password'
                            type='password'
                            register={register("cPassword", {
                              validate: (value) => {
                                const { password } = getValues();

                                if (password != value) {
                                  return "Passwords do no match";
                                }
                              },
                            })}
                            error={
                              errors.cPassword &&
                              errors.cPassword.type === "validate"
                                ? errors.cPassword?.message
                                : ""
                            }
                          />
                      </div>
                   )}
      

             {errMsg && (
                      <span
                        role='alert'
                        className='text-sm text-red-500 mt-0.5'
                      >
                        {errMsg}
                      </span>
                    )}

              <div className='mt-2'>
                  <CustomButton
                      type='submit'
                       containerStyles={`inline-flex justify-center rounded-md bg-burnt_seinna px-8 py-2 text-sm font-medium text-white outline-none hover:bg-persian_orange`}
                        title={isRegister ? "SignUp" : "Login"}
                   />
               </div>
                  
            </div>
          
          </form>

                   <div className='mt-4'>
                    <p className='text-sm text-gray-700'>
                      {isRegister
                        ? "Already has an account?"
                        : "Do not have an account"}

                      <span
                        className='text-sm text-blue-600 ml-2 hover:text-blue-700 hover:font-semibold cursor-pointer'
                        onClick={() => setIsRegister((prev) => !prev)}
                      >
                        {isRegister ? "Login" : "Create Account"}
                      </span>
                    </p>
                  </div>

                  

    </motion.div>
    </Transition>

    </div>
    </>
  )
}

export default SignUp