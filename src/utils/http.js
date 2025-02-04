import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient(); // create a new instance of the QueryClient

const postSignup = async (data) => {
    try{
        const response = await axios.post('http://localhost:3000/signup', data);
        console.log(response);
        alert("Account Created")
        return response;
    }catch(err){
        console.log(err);
        return err;
    }
}

export { postSignup };