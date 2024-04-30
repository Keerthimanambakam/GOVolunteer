import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useLocation, useParams } from "react-router-dom";
import { useState } from 'react';
import { Transition } from '@headlessui/react';
import { motion } from 'framer-motion';
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { Input,CustomButton,JobCard ,JobTypes,Loading} from '../components';
import { useEffect } from 'react';
import { apiRequest } from '../utils';
import { handleFileUpload } from '../utils';


const ApplyOppurtunity = () =>{
  const [openForm,setOpenForm]=useState(true);
  const [jobType,setJobType]=useState("")
  const dispatch = useDispatch();
  const [uploadCv, setUploadCv] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [errMsg,setErrMsg]=useState("")
  const [recentPost,setRecentPost]=useState([]);
  const location=useLocation();
   const {user}= useSelector((state)=>state.user)

   const {id} = useParams();
  //console.log(user)
  const {
    register,handleSubmit,formState:{errors}}=useForm({
      mode:"onChange",
      defaultValues:{...user},
    });

  

  const onSubmit=async(data)=>{
    setIsLoading(true);
    setErrMsg(null);

    const uri=uploadCv && (await handleFileUpload(uploadCv));
    console.log("paramsss",id)
    console.log("yell",uri)
    const newData=uri?{...data,cvUrl:uri,job_id:id}:{...data,job_id:id};
    
    console.log("newwww",newData)
    

     try{
        const res=await apiRequest({
          url:"/jobs/apply-job",
          token:user?.token,
          data:newData,
          method:"POST",
        })
        
        if(res.status=="failed")
        {
          setErrMsg({...res});
        }
        else{
          setErrMsg("success");
          setTimeout(()=>{
          window.location.reload();
          },1500);
        }

    }catch(e){
      console.log(e);
      setIsLoading(false);
    }
}

   const getRecentPost=async()=>{
    try{
      const id=user?._id;
      const res=await apiRequest({
        url:"/user/get-user/"+id,
        method:"GET",
      })
      console.log("gytguyfyvu",res.data)
      setRecentPost(res?.data.appliedJobs);
      
    }catch(error){
        console.log(error)
      }
    
  }
   
  useEffect(()=>{
    {getRecentPost()}
  },[])

  
return (
    <div className='w-full bg-alice_blue'>
    <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 px-5'
    >
      <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-slate-200 px-5 py-10 md:px-10 shadow-md mt-8'>

        <div>

           <p className='text-gray-500 font-semibold text-2xl'>Apply an oppurtunity</p>

          <form className='w-full mt-2 flex flex-col gap-5' onSubmit={handleSubmit(onSubmit)}
          >
            <Input name='name'
                      label='Name'
                      type='text'
                      register={register("name", {
                        required: "Name is required",
                      })}
                      error={errors.name ? errors.name?.message : ""}
                    />

                    <Input
                      name='email'
                      label='Email'
                      placeholder='eg. email@email.com'
                      type='text'
                      register={register("email", {
                        required: "Email is required",
                      })}
                      error={errors.email ? errors.email?.message : ""}
                    />

                    <div className='w-full flex gap-2'>

                      <div className='w-1/2'>
                        <Input
                          name='number'
                          label='number'
                          placeholder='Phone Number'
                          type='text'
                          register={register("number", {
                            required: "Number is required!",
                          })}
                          error={errors.number ? errors.number?.message : ""}
                        />
                      </div>

                      <div className='w-1/2 mt-2'>
                        <label className='text-gray-600 text-sm mb-1'>
                          Resume/cv
                        </label>
                        <input
                          type='file'
                          onChange={(e) => setUploadCv(e.target.files[0])}
                        />
                      </div>

                    </div>

                    <div className='flex flex-col'>

                      <label className='text-gray-600 text-sm mb-1'>
                        Description
                      </label>
                      

                      <textarea
                        className='ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                        placeholder='write about yourself'
                        rows={4}
                        cols={6}
                        {...register("desc", {
                        required: "Description is required",
                      })}
                        aria-invalid={errors.desc ? "true" : "false"}
                      ></textarea>
                      {errors.desc && (
                        <span
                          role='alert'
                          className='text-xs text-red-500 mt-0.5'
                        >
                          {errors.desc?.message}
                        </span>
                      )}

                    </div>

                    <div className='mt-4'>
                      {
                        isLoading?(
                          <Loading/>
                        ):(<CustomButton
                        type='submit'
                        containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                        title={"Submit"}
                      />
                      )}
                      
                    </div>
          </form>


        </div>

      </div>
      
      <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>

        <p className='text-gray-900 font-semibold'>Recent Applied Oppurtunities</p>

       <div className='w-full flex flex-wrap gap-6'>
          {console.log("reeeecent",recentPost)}
          {recentPost?.slice(0, 3).map((job, index) => {
            console.log("jooob",job)
            const data={
              name:user?.name,
              email:user?.email,
              logo:user?.profileUrl,
              ...job
            }
            console.log("daaata",data)
            return <JobCard job={data} key={index} />;
          })}
        </div>

      </div>


    </div>
    </div>
  )

}

export default ApplyOppurtunity