import React from 'react'
import CustomButton from './CustomButton'
import { popularSearch } from '../utils/data'
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";
import { Taehyungaesthetic,tae,flowers, main_volunteer } from '../assets';

const Search= ({ placeholder, icon, value, setValue, styles }) => {
  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const clearInput = () => setValue("");

  return (
    <div className={`flex w-full md:w-1/3 items-center ${styles}`}>
      {icon}

      <input
        value={value}
        onChange={(e) => handleChange(e)}
        type='text'
        className='w-full md:w-64 p-2 outline-none bg-transparent text-base'
        placeholder={placeholder}
      />

      <AiOutlineCloseCircle
        className='hidden md:flex text-gray-600 text-xl cursor-pointer'
        onClick={clearInput}
      />
    </div>
  );
};

const Background = ({type,
  title,
  handleClick,
  searchQuery,
  setSearchQuery,
  location,
  setLocation,}) => {
  return (
    <>
    <div className='bg-alice_blue'>

       <div className={`container mx-auto px-5 flex items-center relative`}
       >
        <div  className='w-full z-10 bg-alice-blue'>
            
            <div className='mb-20 sm:mb-0 flex flex-col items-center sm:flex-row sm:justify-between relative z-10'> 
               <div>
                 <p className='text-paynes_gray font-bold text-4xl md:text-5xl pt-32 sm:pt-2 mb-8 sm:mb-8'>{title}</p>
                </div>
                <div className="z-20 pl-[20vw] sm:relative sm:pt-16">
                 
                 <div>
                 <div className="z-20 absolute">
                    <img className="h-[23rem] w-[18rem] mr-[16rem] rounded-3xl" src={main_volunteer} alt=""/>
                  </div>
                <div className="z-10 absolute rotate-6 origin-bottom-left">
                    <img className="h-[23rem] w-[18rem] mr-[16rem] rounded-3xl" src={flowers} alt=""/>
                </div>
                <div className="z-0  rotate-12 origin-bottom-left">
                    <img className="h-[23rem] w-[18rem] mr-[16rem] rounded-3xl" src={tae} alt=""/>
                </div>
            </div>
                

            </div>

            </div>

            <div className='w-3/4 sm:w-1/2 flex items-center justify-around bg-white px-2 md:px-5 sm:py-3 shadow-2xl rounded-full'>
            <Search
              placeholder='name'
              icon={<AiOutlineSearch className='text-gray-600 text-xl' />}
              value={searchQuery}
              setValue={setSearchQuery}
            />
            <Search
              placeholder='Add place'
              icon={<CiLocationOn className='text-gray-600 text-xl' />}
              value={location}
              setValue={setLocation}
              styles={"hidden md:flex"}
            />

            <div>
              <CustomButton
                onClick={handleClick}
                title='Search'
                containerStyles={
                  "text-white py-2 md:py3 px-3 md:px-10 focus:outline-none bg-orange-300 rounded-full md:rounded-md text-sm md:text-base"
                }
              />
            </div>
          </div>

           {type && (
            <div className='w-1/2 lg:1/2 flex flex-wrap gap-3 md:gap-6 py-10 md:py-14'>
              {popularSearch.map((search, index) => (
                <span
                  key={index}
                  className='bg-[#1d4fd826] text-[#1d4ed8] py-1 px-2 rounded-full text-sm md:text-base'
                >
                  {search}
                </span>
              ))}
            </div>
          )}
          

        </div>
       </div>

    </div>
    </>
  )
}



export default Background