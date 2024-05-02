import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../redux/userSlice";
export const EditUser = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const submitHandler = async (event) => {
        event.preventDefault();
        const userToken = localStorage.getItem("userInfo");
        const user_json = JSON.parse(userToken);
        const id = user_json._id;
        const token = user_json.token;
        const newURL = "http://localhost:8800/api/user/update-user/" + id;
        const data = new FormData(event.target);
       console.log(data);
       const FormDict = {
        email:data.get("email"),
        name:data.get("Name"),
        number:data.get("PhoneNumber")
       }
        try {
            const res = await fetch(newURL, {
                method: "PATCH",
                body: JSON.stringify(FormDict), 
                headers: {
                    "Content-Type": "application/json",
                    "Authorization":`Bearer ${token}`
                }
            });
            const data = await res.json();
            const newData = {token:data.token,...data.user};
            console.log(newData);
            dispatch(Login(newData))
            localStorage.setItem("userInfo",JSON.stringify(newData))
            window.location.reload();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="flex items-center justify-center mt-5 mb-5">
        <form onSubmit={submitHandler} className="flex flex-col items-center gap-2  p-6 w-full max-w-lg rounded-lg border border-gray-200 ">
         <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">email</label>
         <input type="email" defaultValue={user.user.email} name="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-xl p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="example@gmail.com" required />
         <label htmlFor="Name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"> Name</label>
         <input type="text" name="Name" defaultValue={user.user.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" required />  
         <label htmlFor="PhoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Phone Number</label>
        <input type="text" name="PhoneNumber" defaultValue={user.user.number} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="+91-------" required />  
        <button type="submit" className=" mt-3 bg-blue-500 hover:bg-blue-300 text-white rounded-xl px-10 py-3">Submit</button>
        </form>
        </div>
    );
}