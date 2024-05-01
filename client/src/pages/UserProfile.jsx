import React, { useEffect, useState } from "react";
import { CustomButton, JobCard, Input,JobTypes } from "../components";import { FiEdit3, FiPhoneCall, FiUpload } from "react-icons/fi";
import { IoAccessibility } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
const UserProfile = () => {
  const navigate = useNavigate();
  const [data, SetData] = useState();
  const [name,SetName] = useState("");
  const [phoneNo,SetPhoneNo] = useState("");
  const [email,SetEmail] = useState("");
  const [Type,SetType] = useState("");
  const fetchData = async () => {
    try {
      const userToken = localStorage.getItem("userInfo");
      const user_json = JSON.parse(userToken);
      const id = user_json._id;
      const newURL = "http://localhost:8800/api/user/get-user/" + id;
      const res = await fetch(newURL);
      if (!res.ok) {
        const errorMessage = await res.text();
        console.error(errorMessage);
      } else {
        const userData = await res.json();
        console.log(userData);
        // Assuming userData contains the user object directly
        SetName(userData.data.name);
        SetPhoneNo(userData.data.number);
        SetEmail(userData.data.email);
        SetType(userData.data.accountType);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const EditHandler = () => {
    navigate("/EditUser");
  }
  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <>
    <div className='container mx-auto bg-alice_blue p-5'>
        
        <div>

          <div className='w-full flex flex-col md:flex-row gap-3 justify-between'>

            <h2 className='text-gray-600 text-xl font-semibold'>
              WELCOME {name}
            </h2>
                <div className='flex items-center justifu-center py-5 md:py-0 gap-4'>
                  
                  <CustomButton
                    title='Edit'
                    iconRight={<FiEdit3 />}
                    containerStyles={`py-1.5 mx-5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
                    onClick={EditHandler}
                  />
                </div>
            
          </div>
        

          <div className='w-full flex flex-col justify-start mt-4 md:mt-8 text-sm'>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <IoAccessibility /> {Type}
            </p>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <AiOutlineMail /> {email}
            </p>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <FiPhoneCall /> {phoneNo}
            </p>

          </div>


        </div>
        </div>
    </>
  )
}

export default UserProfile