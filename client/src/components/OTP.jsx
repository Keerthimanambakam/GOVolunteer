import React, { useEffect, useState } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../utils/setup';
import {  useLocation, useNavigate } from "react-router-dom";
import { apiRequest } from "../utils/index.js";
import { useDispatch } from "react-redux";
import { Login } from "../redux/userSlice.js";
export const OTPModal = () => {
    const [errMsg, setErrMsg] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;
    const {url,...remainingData} = data;
    if (!data) return null;
    let confirmation_schema;
      useEffect(() => {
        const generateRecaptcha = async () => {
            try {
                window.recaptchaVerifier = new RecaptchaVerifier(
                    "recaptcha",
                    {
                        size: 'invisible',
                        callback: (response) => {
                            console.log(response);
                        },
                        'expired-callback': (response) => {
                            console.log(response);
                        }
                    },
                    auth
                );
                let newNumber = "+91" + data.number;
                console.log(newNumber);
                const confirmation = await signInWithPhoneNumber(auth, newNumber, window.recaptchaVerifier);
                confirmation_schema = confirmation;
            } catch (error) {
                console.log(error);
            }
        };
        generateRecaptcha();
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        const Data = new FormData(event.target);
        let OTP = "";
        for(let i=0;i<6;i++){
          const val = Data.get(`otp-${i}`);
          OTP+=val
        }
        confirmation_schema.confirm(OTP).then(() => {
          const SignInRequest = async() => {
            try{
              const res= await apiRequest({
               url:url,
               data:remainingData,
               method:"POST",
              });
              if(res.status=="failed")
              {
                setErrMsg(res?.message);
              }
              else{
               setErrMsg("");
               const data={token:res?.token,...res?.user};
               console.log(data);
               dispatch(Login(data));
               localStorage.setItem("userInfo",JSON.stringify(data));
               window.location.replace(from);
               console.log(data);
              }
             }catch(e){
                console.log(e)
             }
          }
            SignInRequest();
            navigate("/find-oppurtunities")
          }).catch((error) => {
            console.log(error);
          })

        };
    
    return (
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
          <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
              <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
                  <div className="flex flex-col items-center justify-center text-center space-y-2">
                      <div className="font-semibold text-3xl">
                          <p>Phone Number Verification</p>
                      </div>
                      <div className="flex flex-row text-sm font-medium text-gray-400">
                          <p>We have sent a code to your phone Number {data.number}</p>
                      </div>
                  </div>
                  <div id="recaptcha"></div>
                  <div>
                      <form onSubmit={submitHandler}>
                          <div className="flex flex-col space-y-16">
                              <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs gap-3">
                                  {[...Array(6)].map((_, index) => (
                                    <div key={index} className="w-16 h-16">
                                          <input
                                              className="w-full h-full flex flex-col items-center justify-center text-center px-2 outline-none rounded-md border border-gray-300 text-lg text-black bg-white focus:bg-gray-100 focus:ring-1 focus:ring-blue-500"
                                              type="text"
                                              name={`otp-${index}`}
                                              id={`otp-${index}`}
                                              maxLength={1}
                                              />
                                      </div>
                                  ))}
                              </div>
                              <div className="flex flex-col space-y-5">
                                  <div>
                                      <button
                                          className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-3 bg-blue-700 border-none text-white text-lg shadow-sm"
                                          type="submit"
                                          >
                                          Verify Account
                                      </button>
                                  </div>
                                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                      <p>Didn't receive code?</p> <a className="flex flex-row items-center text-blue-600" href="http://" target="_blank" rel="noopener noreferrer">Resend</a>
                                  </div>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  );
};