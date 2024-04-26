import React from 'react'
import { Link } from "react-router-dom";


const CompanyCard = ({rec}) => {
  return (
    <div className='w-full h-16 flex gap-4 items-center justify-between bg-columbia_blue shadow-md rounded mt-4 hover:transition-all hover:mt-1 hover:shadow-2xl'>
        <div className='w-3/4 md:w-2/4 flex gap-4 items-center'>
            <Link to={`/company-profile/${rec?._id}`}>
                <img
                    src={rec?.profileUrl}
                    alt={rec?.name}
                    className='w-8 md:w-12 h-8 md:h-12 rounded'
                />
            </Link>

            <div className='h-full flex flex-col'>
                <Link
                    to={`/company-profile/${rec?._id}`}
                    className='text-base md:text-lg font-semibold text-gray-600 truncate'
                >
                    {rec?.name}
                </Link>
                <span className='text-sm text-blue-600'>{rec?.email}</span>
            </div>

        </div>

        <div className='hidden w-1/4 h-full md:flex items-center'>
        <p className='text-base text-start'>{rec?.location}</p>
        </div>

        <div className='w-1/4 h-full flex flex-col items-center'>
        <p className='text-blue-600 font-semibold'>{rec?.jobPosts?.length}</p>
        <span className='text-xs md:base font-normal text-gray-600'>
          Jobs Posted
        </span>
        </div>

    </div>
  )
}

export default CompanyCard