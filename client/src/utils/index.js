import axios from "axios";

const API_URL="http://localhost:8800/api"

export const API=axios.create({
    baseURL:API_URL,
    responseType:"json"
});

export const apiRequest=async({url,token,data,method})=>{
    console.log("dataaa",data)
   try{
       const response=await API(url,{
        method:method || "GET",
        data:data,
        headers:{
            "content-Type":"application/json",
            Authorization:token?`Bearer ${token}` :"",
        }
       })

       return response?.data;
   }
   catch(e){
  
    const err=e.response.data;
     return {
        status:err.success,message:err.message
     }
   }
}

export const handleFileUpload=async(uploadFile)=>{
    const formData=new FormData();
    formData.append("file",uploadFile);
    formData.append("upload_preset","govolunteer");
    console.log("ghhhhhhhhhhhhhh",formData)
    try{
        const response=await axios.post(
            "https://api.cloudinary.com/v1_1/dvdjmc9xb/image/upload/",
            formData
        );
        return response.data.secure_url;
    }
    catch(e){
        console.log(e);
    }
};

export const updateURL=({pageNum,query,recLoc,sort,navigate,location,jType,jTitle,exp})=>{
    const params=new URLSearchParams();

    if(query)
    {
        params.set("search",query)
    }
    if(pageNum)
    {
        params.set("page",pageNum)
    }
    if(recLoc)
    {
        params.set("location",recLoc);
    }
    if(jTitle)
    {
        params.set("jTitle",jTitle);
    }
    if(jType)
    {
        params.set("jtype",jType);
    }
    if(exp)
    {
        params.set("exp",exp);
    }
    if(sort)
    {
        params.set("sort",sort)
    }

    const newURL=`${location.pathname}?${params.toString()}`;
    navigate(newURL,{replace:true});

    return newURL;
};