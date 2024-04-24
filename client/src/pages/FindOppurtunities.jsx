import React from 'react'
import {useState} from "react";
import {useLocation,useNavigate} from 'react-router-dom';
import Background from "../components/Background"
import {experience,jobTypes,jobs} from "../utils/data"
import CustomButton from '../components/CustomButton';


const FindOppurtunities = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [jobLocation, setJobLocation] = useState("");

 return(
  <div>
    <div className='w-full bg-blue relative overflow-x-clip'>

       <div className="absolute hidden sm:flex sm:z-100">
        <div className="bg-paynes_gray w-[150vh] h-[150vh] absolute left-[65vw] -top-[24vh] rotate-[30deg]  rounded-[30vh]">
        </div>
       </div>

    </div>
    <Background type='home'  handleClick={() => {}} searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={jobLocation}
        setLocation={setJobLocation}/>
  </div>
 )
}

export default FindOppurtunities