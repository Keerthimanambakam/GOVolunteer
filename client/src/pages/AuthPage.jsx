import React,{useState} from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import SignUp from '../components/SignUp';


const AuthPage = ({isRegister,setIsRegister}) => {
  const {user}=useSelector((state)=>state.user);
  const location=useLocation();
  
  const [open,setOpen]=useState(true);

  let from=location?.state?.from?.pathname||"/";

  if(user?.token){
    return window.location.replace(from);
  }
  return (
    <>

    <div className='w-full'> 
      <SignUp open={open} setOpen={setOpen} isRegister={isRegister} setIsRegister={setIsRegister}/>
    </div>

  </>
    
  );
}

export default AuthPage;