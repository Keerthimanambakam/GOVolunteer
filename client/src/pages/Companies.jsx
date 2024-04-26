import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CompanyCard, CustomButton, Background, List } from "../components";
import { companies } from "../utils/data";

const Companies = () => {

  const [page, setPage] = useState(1);
  const [numPage, setNumPage] = useState(1);
  const [recordsCount, setRecordsCount] = useState(0);
  const [data, setData] = useState(companies ?? []);
  const [searchQuery, setSearchQuery] = useState("");
  const [recLocation, setRecLocation] = useState("");
  const [sort, setSort] = useState("Newest");
  const [isFetching, setIsFetching] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {};
  const handleShowMore = () => {};

  return (
     <div className='w-full bg-alice_blue'>

       <div className='w-full relative overflow-x-clip'>

        <div className="absolute hidden sm:flex sm:z-100">
          <div className="bg-paynes_gray w-[150vh] h-[150vh] absolute left-[65vw] -top-[24vh] rotate-[30deg]  rounded-[30vh]">
          </div>
        </div>

       </div>


       <Background
        title='Help your community'
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={recLocation}
        setLocation={setSearchQuery}
      />

      <div className='container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 md:px-0 py-6 bg-alice_blue'>

         <div className='flex items-center justify-between mb-4'>
            <p className='text-sm md:text-base'>
            Shwoing: <span className='font-semibold'>10</span> 
            Recruiters
            </p>

            <div className='flex flex-col md:flex-row gap-0 md:gap-2 md:items-center mr-6 lg:mr-16'>

              <p className='text-sm md:text-base'>Sort By:</p>

              <List sort={sort} setSort={setSort} />

            </div>

         </div>
         
          <div className='w-3/4 ml-6 sm:ml-16  flex flex-col gap-6 relative z-20'>

            {data?.map((rec, index) => (
            <CompanyCard rec={rec} key={index} />
            ))}

            {isFetching && (
              <div className='mt-10'>
                <Loading />
              </div>
            )}

            <p className='text-sm text-right'>
              {data?.length} records out of {recordsCount}
            </p>

          </div>

          {numPage > page && !isFetching && (
            <div className='w-full flex items-center justify-center pt-16'>
              <CustomButton
                onClick={handleShowMore}
                title='Load More'
                containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
              />
            </div>
           )}


      </div>

     </div>
  )
}

export default Companies