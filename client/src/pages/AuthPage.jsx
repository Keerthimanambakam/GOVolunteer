import React from 'react'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';



const AuthPage = () => {
  const {user}=useSelector((state)=>state.user);
  const location=useLocation();

  let from=location?.state?.from?.pathname||"/";

  if(user?.token){
    return window.location.replace(from);
  }
  return (
    <>
    <div className='w-full relative overflow-x-clip'>

       <div className="absolute hidden sm:flex sm:z-100">
        <div className="bg-paynes_gray w-[150vh] h-[150vh] absolute left-[65vw] -top-[24vh] rotate-[30deg]  rounded-[30vh]">
        </div>
       </div>

    </div>
    <div class="flex flex-col items-center mt-[10vh] md:flex-row md:justify-between md:mt-[15vh] relative z-10">
            <div class="mt-[10vh] md:mt-0 pl-[4vw] w-[45vw] ">
                <div>
                    <div class="font-bold text-[3em]">
                        <p>When humanity meets the technology</p>
                    </div >
                    <div class="text-[1em]">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem autem distinctio ullam, 

                        </p>
                    </div>
                </div>

                <div class="flex flex-row justify-between items-center mt-[2vh] border-solid border-2 border-dutch_white rounded-2xl w-[30vw] h-[7vh] p-[0.5rem] bg-dutch_white">
                        <div class="border-solid border-r-black border-r-2 mr-4">
                            job title/keyword
                        </div>
                        <div>
                            Location
                        </div>
                        <div>
                            <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"
                                height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                    d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>

                        </div>
                </div>

                <div class="mt-[5vh]" >
                    <h class="font-bold">Popular searches</h>
                    <div class="mt-[3vh]">
                        <ul class="flex flex-row flex-wrap justify-between">
                            <li
                                class="p-[0.3em] mr-[1em] border-solid border-2 border-dutch_white rounded-2xl bg-dutch_white text-burnt_seinna mb-[1em]">
                                <a href="#">hola</a>
                        
                            </li>
                            <li class="p-[0.3em] mr-[1em] border-solid border-2 border-dutch_white rounded-2xl bg-dutch_white text-burnt_seinna mb-[1em]">
                                <a href="#">hu</a>
                            
                            </li>
                            <li class="p-[0.3em] mr-[1em] border-solid border-2 border-dutch_white rounded-2xl bg-dutch_white text-burnt_seinna mb-[1em]">
                                <a href="#">huhu</a>
                            
                            </li>
                            <li class="p-[0.3em] mr-[1em] border-solid border-2 border-dutch_white rounded-2xl bg-dutch_white text-burnt_seinna mb-[1em]">
                                <a href="#">tae</a>
                            
                            </li>
                            <li class="p-[0.3em] mr-[1em] border-solid border-2 border-dutch_white rounded-2xl bg-dutch_white text-burnt_seinna mb-[1em]">
                                <a href="#">khya</a>
                            
                            </li>
                            <li className="p-[0.3em] mr-[1em] border-solid border-2 border-dutch_white rounded-2xl bg-dutch_white text-burnt_seinna mb-[1em]">
                                <a href="#">wooo</a>
                            
                            </li>
                            <li className="p-[0.3em] mr-[1em] border-solid border-2 border-dutch_white rounded-2xl bg-dutch_white text-burnt_seinna mb-[1em]">
                                <a href="#">wohuuo</a>
                            
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="z-20 pl-[20vw] md:relative">

                
                

            </div>
        </div>

    </>
    
  )
}

export default AuthPage;