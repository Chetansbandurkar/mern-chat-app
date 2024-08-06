import {  useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const {setAuthUser}=useAuthContext();
    const signup=async({fullName,username,password,confirmPassword,gender})=>{
        const success=handleInputError({fullName,username,password,confirmPassword,gender})
        if(!success) return;
        setLoading(true);
        try{
           const res =await fetch("/api/auth/signup",{
            method:"POST",
            //  you're informing the server that the data being sent is in JSON format. 
            headers:{"Content-Type":"application/json"},
            // data into json format
            body:JSON.stringify({fullName,username,password,confirmPassword,gender})
           })
           const data = await res.json();
           console.log(data);
           if(data.error){
            throw new Error(data.error);
           }
        //    localStorage
        localStorage.setItem("chat-user",JSON.stringify(data))
        // context
        setAuthUser(data);

        }
        catch(error){
            toast.error(error.message);
        }
        finally{
            setLoading(false);
        }
    }
    return {loading,signup};
}
export default useSignup;
function handleInputError({fullName,username,password,confirmPassword,gender}){
    if(!fullName || !username || !password || !confirmPassword||!gender){
        toast.error("please fill all the fields below")
        return false;
    }

    if(password!==confirmPassword){
        toast.error("password and confirm password should be same");
        return false;
    }
    if(password.length<6){
        toast.error("password must be at least 6 characters");
        return false;
    }
    return true;
}