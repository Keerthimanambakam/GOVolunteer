import React from 'react'
import { Link } from "react-router-dom";
import { GoLocation } from "react-icons/go";
import moment from "moment";

const JobCard = ({job}) => {
  console.log(job)
  return (
      
     <Link to={`/oppurtunity-detail/${job?._id}`}>
        {console.log("myyyyjooobbb",job)}
        <div className='w-full md:w-[16rem] 2xl:w-[18rem] h-[16rem] md:h-[18rem] mt-6 bg-columbia_blue flex flex-col border border-paynes_gray justify-between shadow-lg rounded-md px-3 py-5 hover:transition-all hover:mt-2 hover:shadow-2xl'
        >
          <div className='w-full h-full flex flex-col justify-between'>
              <div className='flex gap-3'>
                
               <img
                src={job?.logo}
                alt={job?.name}
                className='w-14 h-14'
              />

               <div className='w-full h-16 flex flex-col justify-center'>
                    <p className='w-full h-12 flex items-center text-lg font-semibold truncate overflow leading-5'>{job?.jobTitle}</p>

                    <span className='flex gap-2 items-center'>
                    <GoLocation className='text-slate-900 text-sm' />
                    {job?.location}
                    </span>
               </div>

            </div>
            {console.log(job)}
            <div className='py-3'>
                <p className='text-sm'>
                    {job?.desc?.slice(0, 150) + "..."}
                </p>
            </div>

            <div className='flex items-center justify-between'>

                <p className='bg-[#1d4fd826] text-[#1d4fd8] py-0.5 px-1.5 rounded font-semibold text-sm'>
                    {job?.jobType}
                </p>

                <span className='text-gray-500 text-sm'>
                    {moment(job?.createdAt).fromNow()}
                </span>

           </div>
          </div>


        </div>

     </Link>
  )
}

export default JobCard