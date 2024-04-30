import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiEdit3, FiUpload } from "react-icons/fi";
import { Link, useLocation, useParams } from "react-router-dom";
import { companies, jobs } from "../utils/data";
import { CustomButton, JobCard, Loading, Input } from "../components";
import { IoMdClose } from "react-icons/io";
import { motion } from "framer-motion";
import { handleFileUpload } from "../utils";
import { apiRequest } from "../utils";
import { Login } from "../redux/userSlice";


/*const CompanyForm=({open,seOpen})=>{
  return(
    <div>hii</div>
  )
}*/
const CompanyForm = ({ open, setOpen }) => {
 const { user } = useSelector((state) => state.user);
 console.log("khyyyyyy",user)
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user},
  });

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const [uploadCv, setUploadCv] = useState("");
  const [isLoading,setIsLoading]=useState(false);
  const [errMsg,setErrMsg]=useState("")

  const onSubmit = async(data) => {
    setIsLoading(true);
    setErrMsg(null)

    console.log("huhuhuhhuhuhhu")

    const uri=profileImage && (await handleFileUpload(profileImage));

    const newData=uri?{...data,profileUrl:uri}:data;
    {console.log("finalllll",newData)}

    try{
        const res=await apiRequest({
          url:"/company/update-company",
          token:user?.token,
          data:newData,
          method:"PUT",
        })
        console.log("nrwww ",res.user)
        setIsLoading(false);
        if(res.status=="failed")
        {
          setErrMsg({...res});
        }
        else{
          setErrMsg("success");
          const newData={token:res?.token,...res.company}
          console.log("nrwww ",res)
          dispatch(Login(newData));
          localStorage.setItem("userInfo",JSON.stringify(newData));
          
          setTimeout(()=>{
            window.location.reload();
          },1500);
        }

    }catch(e){
      console.log(e);
      setIsLoading(false);
    }

  };

  let from=location.state?.from?.pathname||"/";

 const closeModal = () => {
  setOpen(false);
  //console.log("frommm",from);
  window.location.reload();
 };

  console.log(open);

  return(
   <>
    <div className="inset-0 backdrop-blur-sm flex items-center justify-center gap-3">
    <Transition appear show={open || false}>
    <motion.div  initial={{opacity:0,y:30}}
            animate={{opacity:1,y:0}}
            exit={{opacity:0,y:30}} 
            className="flex-col items-start justify-start w-[30rem] h-[35rem] border-white border-2 bg-slate-200 rounded-xl gap-2 mt-20">
            
              <Link to={from}>
               <button className='flex flex-row-reverse px-1 py-1 outline-none' onClick={closeModal}>
              <IoMdClose className='w-full' />
              </button>
              </Link>
              
              <div>

                <h3>
                 Edit Company Profile
                </h3>

                <form
                    className='w-full mt-2 flex flex-col gap-5'
                    onSubmit={handleSubmit(onSubmit)}
                >
                   <Input
                      name='name'
                      label='Recruiter Name'
                      type='text'
                      register={register("name", {
                        required: "Name is required",
                      })}
                      error={errors.name ? errors.name?.message : ""}
                    />

                    <Input
                      name='location'
                      label='Location/Address'
                      placeholder='eg. Califonia'
                      type='text'
                      register={register("location", {
                        required: "Address is required",
                      })}
                      error={errors.location ? errors.location?.message : ""}
                    />

                    <div className='w-full flex gap-2'>

                      <div className='w-1/2'>
                        <Input
                          name='number'
                          label='number'
                          placeholder='Phone Number'
                          type='text'
                          register={register("number", {
                            required: "Number is required!",
                          })}
                          error={errors.number ? errors.number?.message : ""}
                        />
                      </div>

                      <div className='w-1/2 mt-2'>
                        <label className='text-gray-600 text-sm mb-1'>
                          Company Logo
                        </label>
                        <input
                          type='file'
                          onChange={(e) => setProfileImage(e.target.files[0])}
                        />
                      </div>

                    </div>

                    <div className='flex flex-col'>

                      <label className='text-gray-600 text-sm mb-1'>
                        About Company
                      </label>
                      <textarea
                        className='ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                        rows={4}
                        cols={6}
                        {...register("about", {
                          required: "Write a little bit about your company.",
                        })}
                        aria-invalid={errors.about ? "true" : "false"}
                      ></textarea>
                      {errors.about && (
                        <span
                          role='alert'
                          className='text-xs text-red-500 mt-0.5'
                        >
                          {errors.about?.message}
                        </span>
                      )}

                    </div>

                    <div className='mt-4'>
                      {
                        isLoading?(
                          <Loading/>
                        ):(<CustomButton
                        type='submit'
                        containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                        title={"Submit"}
                      />
                      )}
                      
                    </div>

                </form>


              </div>
              
                  

    </motion.div>
    </Transition>

    </div>
   
   </>

  )

}

const CompanyProfile = () => {

  const params = useParams();
  const location=useLocation();
  const { user } = useSelector((state) => state.user);
  console.log("justttyygbj",user)
  const [info, setInfo] = useState(user);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const fetchCompany=async()=>{
    setIsLoading(true);
    let id=null;

    if(params.id&&params.id!==undefined)
    {
      id=params?.id;
    }
    else{
      id=user?._id;
    }
    console.log("idd,",user,id)

   try{
      const res=await apiRequest({
        url:"/company/get-company/"+id,
        method:"GET",
      });
      console.log("eifeqf",res.data)
      setInfo(res?.data);
      setIsLoading(false);

    }catch(e){
      console.log(e);
    }
  }

  useEffect(() => {
    fetchCompany();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);
  
  if (isLoading) {
    return <Loading />;
  }

   return (

     <div className='container mx-auto bg-alice_blue p-5'>
        
        <div>

          <div className='w-full flex flex-col md:flex-row gap-3 justify-between'>
             {console.log("heyyy",info)}
            <h2 className='text-gray-600 text-xl font-semibold'>
              WELCOME {info?.name}
            </h2>
             
             {console.log("huu",user?._id)}
            {user?.accountType === undefined &&
              info?._id === user?._id && (
                <div className='flex items-center justifu-center py-5 md:py-0 gap-4'>
                  
                  <CustomButton
                    title='Edit'
                    onClick={() => setOpenForm(true)}
                    iconRight={<FiEdit3 />}
                    containerStyles={`py-1.5 px-3 md:px-5 focus:outline-none bg-blue-600  hover:bg-blue-700 text-white rounded text-sm md:text-base border border-blue-600`}
                  />

                  <Link to='/upload-oppurtunity'>
                    <CustomButton
                      title='Upload Job'
                      iconRight={<FiUpload />}
                      containerStyles={`text-blue-600 py-1.5 px-3 md:px-5 focus:outline-none  rounded text-sm md:text-base border border-blue-600`}
                    />
                  </Link>
                </div>
              )}
            
          </div>
        

          <div className='w-full flex flex-col justify-start mt-4 md:mt-8 text-sm'>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <HiLocationMarker /> {info?.location ?? "No Location"}
            </p>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <AiOutlineMail /> {info?.email ?? "No Email"}
            </p>
            <p className='flex gap-1 items-center   px-3 py-1 text-slate-600 rounded-full'>
              <FiPhoneCall /> {info?.number ?? "No Number"}
            </p>

          </div>

          <CompanyForm open={openForm} setOpen={setOpenForm} />

        </div>

        <div className='w-full mt-20 flex flex-col gap-2'>

          <p>Jobs Posted</p>

          <div className='flex flex-wrap gap-3'>
            {info?.jobPosts?.map((job, index) => {
              const data = {
                name: info?.name,
                email: info?.email,
                logo:info?.profileUrl,
                ...job,
              };
              return <JobCard job={data} key={index} />;
            })}
          </div>

        </div>
  
     </div>

   )



}

export default CompanyProfile;

