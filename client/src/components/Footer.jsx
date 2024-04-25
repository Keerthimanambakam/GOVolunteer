import React from 'react'
import {FaFacebookF,FaTwitter,FaLinkedinIn} from "react-icons/fa"
import {FiInstagram} from "react-icons/fi"
import { footerLinks } from "../utils/data";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative bottom-0  text-white bg-paynes_gray z-50">
      <div className='-mb-0.5 px-20 py-20 mx-auto max-w-full'>

        <div className='w-full flex flex-wrap gap-10 justify-between -mb-10 -px-4'>
            {footerLinks.map(({ id, title, links }) => (
              <div className='px-4' key={id + title}>
                <h2 className='font-medium text-white tracking-widest text-sm mb-3'>
                  {title}
                </h2>

                <div className='mb-10 flex flex-col gap-3 '>
                  {links.map((link, index) => (
                    <Link
                      key={link + index}
                      to='/'
                      className='text-gray-400 text-sm hover:text-white '
                    >
                      {link}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
  
      </div>

      <div className='w-full h-16 flex items-center justify-center md:justify-start '>

        <span className='inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center'>

          <a className='text-white text-xl  hover:scale-125 ease-in-out duration-300'>
            <FaFacebookF />
          </a>
          <a className='ml-3 text-white text-xl  hover:scale-125 ease-in-out duration-300'>
            <FaTwitter />
          </a>
          <a className='ml-3 text-white text-xl  hover:scale-125 ease-in-out duration-300'>
            <FiInstagram />
          </a>

          <a className='ml-3 text-white text-xl  hover:scale-125 ease-in-out duration-300'>
            <FaLinkedinIn />
          </a>
        </span>

 </div>
      {/* <div className='bg-paynes_gray container flex flex-wrap flex-col sm:flex-row px-5 py-3  max-w-full'>
        <p className='text-gray-300 text-sm text-center sm:text-left'>
              &copy; 2024 GOVolunteer —
              <a
                href='/'
                className='text-[#1199e7] ml-1'
                target='_blank'
                rel='link'
              >
                @GoVolunteer
              </a>
          </p>
            
      </div>
       */}
    </footer>
  );
}

export default Footer