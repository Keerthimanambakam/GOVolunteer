import React from 'react'
import {useState} from "react";
import {useLocation,useNavigate} from 'react-router-dom';

import { TbNetwork } from "react-icons/tb";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { FaPagelines } from "react-icons/fa";

import {experience,jobTypes,jobs} from "../utils/data"
import { Background,CustomButton, List,JobCard } from '../components';



const FindOppurtunities = () => {
    const location=useLocation();
    const navigate=useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [jobLocation, setJobLocation] = useState("");

    const [filterJobTypes, setFilterJobTypes] = useState([]);
    const [filterExp, setFilterExp] = useState([]);

    const [sort, setSort] = useState("Newest");


    const [isFetching, setIsFetching] = useState(false);
    const [page, setPage] = useState(1);
    const [numPage, setNumPage] = useState(1);



    const filterJobs = (val) => {
    if (filterJobTypes?.includes(val)) {
      setFilterJobTypes(filterJobTypes.filter((el) => el != val));
    } else {
      setFilterJobTypes([...filterJobTypes, val]);
    }
    };


    const filterExperience = async (e) => {
    setFilterExp(e);
  };

 return(
  <div>

    <div className='w-full relative overflow-x-clip'>

       <div className="absolute hidden sm:flex sm:z-100">
        <div className="bg-paynes_gray w-[150vh] h-[150vh] absolute left-[65vw] -top-[24vh] rotate-[30deg]  rounded-[30vh]">
        </div>
       </div>

     </div>

    <Background type='home' title='When Humanity meets Technology'  handleClick={() => {}} searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}/>
      
     <div className=' w-full mx-auto flex gap-6 2xl:gap-10 md:px-5 py-0 md:py-6 bg-alice_blue'>
         
        <div className='hidden md:flex flex-col w-1/6 h-fit px-3 bg-white_smoke shadow-sm'>
          
          <p className='text-lg font-semibold text-slate-600'>Filter Search</p>

          <div className='py-2'>

             <div className='flex justify-between mb-3'>
               <p className='flex items-center gap-2 font-semibold'>
                <TbNetwork />
                 Work Type
               </p>

               <button>
                <MdOutlineKeyboardArrowDown />
              </button>
 
             </div>
              
             <div className='flex flex-col gap-2'>

                {jobTypes.map((job, index) => (
                <div key={index} className='flex gap-2 text-sm md:text-base '>
                  <input
                    type='checkbox'
                    value={job}
                    className='w-4 h-4'
                    onChange={(e) => filterJobs(e.target.value)}
                  />
                  <span>{job}</span>
                </div>
                ))}

             </div>

          </div>

          <div className='py-2 mt-4'>

            <div className='flex justify-between mb-3'>

                <p className='flex items-center gap-2 font-semibold'>
                <FaPagelines />
                Experience
                </p>

                <button>
                <MdOutlineKeyboardArrowDown />
                </button>

            </div>

            <div className='flex flex-col gap-2'>
              {experience.map((exp) => (
                <div key={exp.title} className='flex gap-3'>
                  <input
                    type='checkbox'
                    value={exp?.value}
                    className='w-4 h-4'
                    onChange={(e) => filterExperience(e.target.value)}
                  />
                  <span>{exp.title}</span>
                </div>
              ))}
            </div>

          </div>

        </div>

         <div className='w-full md:w-5/6 px-5 md:px-0'>
            <div className='flex items-center justify-between mb-4'>

              <p className='text-sm md:text-base'>
                Showing Oppurtunities Available
              </p>

              <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center realtive z-20'>
                 <p className='text-sm md:text-base relative'>Sort By:</p>

                 <List sort={sort} setSort={setSort} />
           
              </div>

            </div>
            
            <div className='w-full flex flex-wrap gap-6 relative z-10'>
            {jobs.map((job, index) => (
              <JobCard job={job} key={index} />
            ))}
            </div>

            {numPage > page && !isFetching && (
            <div className='w-full flex items-center justify-center pt-16'>
              <CustomButton
                title='Load More'
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </div>
            )}

         </div>

     </div>


      
  </div>
 )
}

export default FindOppurtunities