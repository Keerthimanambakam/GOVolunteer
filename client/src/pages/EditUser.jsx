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
        const key = data.get("myDropDown");
        const value = data.get("changed");
        const FormDict = {
            Key: key,
            Value: value
        };
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
        <form onSubmit={submitHandler}>
        <h3>Select the option you want to Edit</h3>
        <select name="myDropDown" id="DropDown">
            <option value="email">Email</option>
            <option value="name">Name</option>
            <option value="number">number</option>
            <option value="password">Password</option>
        </select>
        <input type="text" name="changed" required min={1} placeholder="enter the new password"/>  
        <button type="submit">Submit Here</button>
        </form>
    );
}