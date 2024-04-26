import React,{Fragment,useState} from 'react'
import {HiMenuAlt3} from "react-icons/hi"
import {AiOutlineClose,AiOutlineLogout} from "react-icons/ai"
import {Link} from "react-router-dom"
import {CustomButton,MenuList} from "../components"
import { users } from '../utils/data';
import { MdOutlineVolunteerActivism } from "react-icons/md";
import { useSelector } from "react-redux";

const Navbar = () => {
  //const user={}
  //const user=users[0];
  const user = useSelector((state) => state.user).user;
  const [isOpen,setIsOpen]=useState(false);
  console.log(user);
  const handleCloseNavbar=()=>{
    setIsOpen((prev)=>!prev);
  };

  return (
    <>
    <div className='sticky top-0 bg-platinum z-50'>
      <nav className="container mx-auto flex items-center justify-between p-5">
        <div className="inline-flex gap-3 items-center" >
           <MdOutlineVolunteerActivism className='h-10 w-10 text-slate-600' aria-hidden='true' />
          <Link to='/' className="text-blue-700 font-bold text-xl">
            GO<span className="text-burnt_seinna">Volunteer</span>
          </Link>
        </div>

      <ul className="hidden lg:flex gap-10 text-base">
        <li>
          <Link to='/find-oppurtunities'>Find Oppurtunity
          </Link>
        </li>
        <li>
          <Link to='/companies'>Companies
          </Link>
        </li>
        <li>
          <Link to='/upload-oppurtunity'>Upload Oppurtunity
          </Link>
        </li>
        <li>
          <Link to='/about-us'>About
          </Link>
        </li>
      </ul>
      <div className="lg:block">
        {
          !user?.token?(
            <>
            <Link to='/user-login'>
              <CustomButton title="Log In"
              containerStyles="text-black-400 py-1.5 px-5 focus:outline-none hover:text-burnt_seinaa"/>
            </Link>
             <Link to='/user-auth'>
              <CustomButton title="Sign Up"
              containerStyles="text-burnt_seinna py-1.5 px-5 focus:outline-none hover:bg-persian_orange hover:text-white rounded-full text-base border border-white-300"/>
            </Link>
            </>
          ):(
            <div>
              <MenuList user={user}/>
            </div>
          )
        }
      </div>

      
       <button
            className='block lg:hidden text-slate-900'
            onClick={() => setIsOpen((prev) => !prev)}
          >

            {isOpen ? <AiOutlineClose size={26} /> : <HiMenuAlt3 size={26} />}
          </button>


      </nav>
    
    {/*MOBILE MENU*/}
    <div
          className={`${
            isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
          } container mx-auto lg:hidden pr-8 gap-3 py-5 flex-col items-end`}
        >
          <Link to='/' onClick={handleCloseNavbar}>
            Find Oppurtunity
          </Link>
          <Link to='/companies' onClick={handleCloseNavbar}>
            Companies
          </Link>
          <Link
            onClick={handleCloseNavbar}
            to={
              user?.accountType === "seeker" ? "applly-gistory" : "upload-oppurtunity"
            }
          >
            {user?.accountType === "seeker" ? "Applications" : "Upload Opurtunity"}
          </Link>
          <Link to='/about-us' onClick={handleCloseNavbar}>
            About
          </Link>

        
        </div>
 
    </div>
    </>
  )
};

export default Navbar