import React from 'react'
import { useEffect, useState } from "react";
import moment from "moment";
import { VscWorkspaceTrusted } from "react-icons/vsc";
import { Link, useParams } from "react-router-dom";
import { jobs } from "../utils/data";
import { CustomButton, JobCard, Loading } from "../components";
import { useSelector } from 'react-redux';
import { apiRequest } from '../utils';
import { Listbox } from '@headlessui/react';
import { useLocation } from 'react-router-dom';

const OppurtunityDetail = () => {
  const location=useLocation()
  const {id} = useParams();
  const {user}=useSelector((state)=>state.user)

  const [job, setJob] = useState(null);
  const [similarJobs,setSimilarJobs]=useState([]);
  const [selected, setSelected] = useState("0");
  const [isFetching,setIsFetching]=useState(false);
  const [isApplied,setIsApplied]=useState(false)

  const getIsApplied=async()=>{
    try{
      const res=await apiRequest({
        url:"/jobs/is-applied/"+id,
        method:"GET"
      });
      setIsApplied(res.stat);

  }catch(e){
    console.log(e);
  }
}

  const getJobDetails=async()=>{
    setIsFetching(true);
    try{
      const res=await apiRequest({
        url:"/jobs/get-job/"+id,
        method:"GET"
      });
      
      setJob(res.data);
      setSimilarJobs(res?.similarJobs);
      setIsFetching(false);

    }catch(e){
      setIsFetching(false)
      console.log(e);
    }
  }

  

  const handleDeletePost=async()=>{
    console.log("deleteee youuu")
    setIsFetching(true);
    try{
    if(window.confirm("Delete Job Post?")){
      const res=await apiRequest({
      url:"/jobs/delete-job/"+job?._id,
      token: user?.token,
      method:"DELETE"
    });
     
    
    if(res?.success){
      console.log("deleteeee")
      alert("post deleted");
      window.location.replace("/");

    }
    setIsFetching(false)
  }
    }catch(e){
      setIsFetching(false);
      console.log(e);
    }
  }

  useEffect(() => {
    id&& getJobDetails();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [id]);

  return (
    <div className='container mx-auto'>

      <div className='w-full flex flex-col md:flex-row gap-6'>

        {isFetching?(
          <Loading/>
        ):(
          <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-alice_blue px-5 py-10 md:px-10 shadow-md mt-2 sm:ml-4'>

          <div className='w-full flex py-6 sm:pt-11 items-center justify-between'>

            <div className='w-3/4 flex gap-2'>

               <img
                src={job?.company?.profileUrl}
                alt={job?.company?.name}
                className='w-20 h-20 md:w-24 md:h-20 rounded'
              />

              <div className='flex flex-col'>

                <p className='text-xl font-semibold text-gray-600'>
                  {job?.jobTitle}
                </p>
                 <span className='text-base'>{job?.location}</span>

                <span className='text-base text-blue-600'>
                  {job?.company?.name}
                </span>

                <span className='text-gray-500 text-sm'>
                  {moment(job?.createdAt).fromNow()}
                </span>

              </div>

            </div>
            
            <div className=''>
              <VscWorkspaceTrusted className='text-3xl text-blue-500' />
            </div>

          </div>

          <div className='w-full flex flex-wrap md:flex-row gap-2 items-center justify-between my-10'>

            <div className='bg-dutch_white w-40 h-16 rounded-lg flex flex-col items-center justify-center'>

               <span className='text-sm'>Salary</span>
               <p className='text-lg font-semibold text-gray-700'>
                {job && job.salary ? job.salary : "unpaid"}
                
               </p>

            </div>

             <div className='bg-columbia_blue w-40 h-16 rounded-lg flex flex-col items-center justify-center'>

              <span className='text-sm'>Job Type</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.jobType}
              </p>

             </div>

             <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>

              <span className='text-sm'>No. of Applicants</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.application?.length??0}
              </p>

             </div>

             <div className='bg-ash_gray w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>

              <span className='text-sm'>No. of Vacancies</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.vacancies}
              </p>

            </div>

             <div className='bg-[#fed0ab] w-40 h-16 px-6 rounded-lg flex flex-col items-center justify-center'>

              <span className='text-sm'>No. of Experience</span>
              <p className='text-lg font-semibold text-gray-700'>
                {job?.experience}
              </p>

             </div>


          </div>

          <div className='w-full flex gap-4 py-5'>

             <CustomButton
              onClick={() => setSelected("0")}
              title='Job Description'
              containerStyles={`w-full flex items-center justify-center py-3 px-5 outline-none rounded-full text-sm ${
                selected === "0"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
             />

              <CustomButton
              onClick={() => setSelected("1")}
              title='Company'
              containerStyles={`w-full flex items-center justify-center  py-3 px-5 outline-none rounded-full text-sm ${
                selected === "1"
                  ? "bg-black text-white"
                  : "bg-white text-black border border-gray-300"
              }`}
             />

          </div>

          <div className='my-6'>

            {selected === "0" ? (
              <>
                <p className='text-xl font-semibold'>Job Decsription</p>

                <span className='text-base'>{job?.desc}</span>

              </>
            ) : (
              <>
                <div className='mb-6 flex flex-col'>
                  <p className='text-xl text-blue-600 font-semibold'>
                    {job?.company?.name}
                  </p>
                  <span className='text-base'>{job?.company?.location}</span>
                  <span className='text-sm'>{job?.company?.email}</span>
                </div>

                <p className='text-xl font-semibold'>About Company</p>
                <span>{job?.company?.about}</span>
              </>
            )}

          </div>
           
          <div className='w-full'>
            {user?._id===job?.company?._id?  (<CustomButton
                title='Delete Post'
                onClick={handleDeletePost}
                containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
              />):(
              <>
             
              {user?.accountType=="volunteer"?(
            
              <Link to={'/apply-oppurtunity/'+id} >
                <CustomButton
              title='Apply Now'
              containerStyles={`w-full flex items-center justify-center text-white bg-black py-3 px-5 outline-none rounded-full text-base`}
             />
              </Link>):("")}
              
    
              </>
              

             
              )
            }
          </div>


        </div>
        )}
        
        <div className='w-full md:w-1/3 2xl:w-2/4 p-5 mt-20 md:mt-0 bg-white'>

          <p className='text-gray-500 font-semibold'>Similar Oppurtunities</p>

          <div className='w-full flex flex-wrap gap-3'>
            {similarJobs?.slice(0, 6).map((job, index) =>{ 
              
              const data={
                name:job?.company.name,
                logo:job?.company.profileUrl,
                ...job,
              };
              return <JobCard job={data} key={index} />
            })}
          </div>

        </div>


      </div>

    </div>
  )
}

export default OppurtunityDetail