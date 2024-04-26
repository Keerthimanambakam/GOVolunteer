import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import { companies, jobs } from "../utils/data";
import { CustomButton, JobCard, Loading, Input } from "../components";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";


/*const CompanyForm=({open,seOpen})=>{
  return(
    <div>hii</div>
  )
}*/
const CompanyForm = ({ open, setOpen }) => {
 const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user?.user },
  });

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");

  const onSubmit = () => {};

  let from=location.state?.from?.pathname||"/";

 const closeModal = () => {
  setOpen(false);
  console.log(from);
 };

  console.log(open);

  return(
   <>
    <div className="inset-0 backdrop-blur-sm flex items-center justify-center gap-3">
    <Transition appear show={open || false}>
    <motion.div  initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:30}} 
            className="flex-col items-start justify-start w-[30rem] h-[35rem] border-white border-2 bg-slate-200 rounded-xl gap-2 mt-20">
            
              <Link to={from}>
               <button className='flex flex-row-reverse px-1 py-1 outline-none' onClick={closeModal}>
              <IoMdClose className='w-full' />
              </button>
              </Link>
              
              <div>

                <h3>
                 Edit Company Profile
                </h3>

                <form
                    className='w-full mt-2 flex flex-col gap-5'
                    onSubmit={handleSubmit(onSubmit)}
                >
                   <Input
                      name='name'
                      label='Recruiter Name'
                      type='text'
                      register={register("name", {
                        required: "Name is required",
                      })}
                      error={errors.name ? errors.name?.message : ""}
                    />

                    <Input
                      name='location'
                      label='Location/Address'
                      placeholder='eg. Califonia'
                      type='text'
                      register={register("location", {
                        required: "Address is required",
                      })}
                      error={errors.location ? errors.location?.message : ""}
                    />

                    <div className='w-full flex gap-2'>

                      <div className='w-1/2'>
                        <Input
                          name='contact'
                          label='Contact'
                          placeholder='Phone Number'
                          type='text'
                          register={register("contact", {
                            required: "Contact is required!",
                          })}
                          error={errors.contact ? errors.contact?.message : ""}
                        />
                      </div>

                      <div className='w-1/2 mt-2'>
                        <label className='text-gray-600 text-sm mb-1'>
                          Company Logo
                        </label>
                        <input
                          type='file'
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>

                    </div>

                    <div className='flex flex-col'>

                      <label className='text-gray-600 text-sm mb-1'>
                        About Company
                      </label>
                      <textarea
                        className='ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required: "Write a little bit about your company.",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role='alert'
                          className='text-xs text-red-500 mt-0.5'
                        >
                          {errors.about?.message}
                        </span>
                      )}

                    </div>

                    <div className='mt-4'>
                      <CustomButton
                        type='submit'
                        containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                        title={"Submit"}
                      />
                    </div>

                </form>


              </div>
              
                  

    </motion.div>
    </Transition>

    </div>
   
   </>

  )

}

const CompanyProfile = () => {

  const params = useParams();
  const location=useLocation();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  useEffect(() => {
    setInfo(companies[parseInt(params?.id) - 1 ?? 0]);
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  
  if (isLoading) {
    return <Loading />;
  }

   return (

     <div className='container mx-auto bg-alice_blue p-5'>
        
        <div>

          <div className='w-full flex flex-col md:flex-row gap-3 justify-between'>

            <h2 className='text-gray-600 text-xl font-semibold'>
              WELCOME {info?.name}
            </h2>

            {user?.user?.accountType === undefined &&
              info?._id === user?.user?._id && (
                <div className='flex items-center justifu-center py-5 md:py-0 gap-4'>
                  
                  <CustomButton
                    title='Edit'
                    onClick={() => setOpenForm(true)}
                    iconRight={<FiEdit3 />}
                    containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
                  />

                  <Link to='/upload-job'>
                    <CustomButton
                      title='Upload Job'
                      iconRight={<FiUpload />}
                      containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600`}
                    />
                  </Link>
                </div>
              )}
            
          </div>
        

          <div className='w-full flex flex-col justify-start mt-4 md:mt-8 text-sm'>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <HiLocationMarker /> {info?.location ?? "No Location"}
            </p>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <AiOutlineMail /> {info?.email ?? "No Email"}
            </p>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <FiPhoneCall /> {info?.contact ?? "No Contact"}
            </p>

          </div>

          <CompanyForm open={openForm} setOpen={setOpenForm} />

        </div>

        <div className='w-full mt-20 flex flex-col gap-2'>

          <p>Jobs Posted</p>

          <div className='flex flex-wrap gap-3'>
            {jobs?.map((job, index) => {
              const data = {
                name: info?.name,
                email: info?.email,
                ...job,
              };
              return <JobCard job={data} key={index} />;
            })}
          </div>

        </div>
  
     </div>

   )



}

export default CompanyProfile;







/*import React from 'react'
import { Card } from '../UI/Card'

const CompanyProfile = () => {
  return (
    <div className='flex items-center justify-center flex-col '>
      <h5 className='mt-4 font-sans font-bold text-xl text-center '>Job Status</h5>
      <div className='flex items-center justify-start mt-6'>
        <ul>
          <Card name="Full Stack developer" date="2023-12-12" Number="13"/>
          <li>
            <Card name="Senior Software Developer" date="2023-12-12" Number="15"/>
          </li>
          <li>
            
          <Card name="Systems administator" date="2023-13-13" Number="17"/>
          </li>
          <li>
            <Card name="Hardware engineer" date="2027-12-11" Number="19"/>
          </li>
      
        </ul>
      </div>
    </div>
  )
}

export default CompanyProfile*/