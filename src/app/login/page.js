'use client';
import {useState} from "react";
import { signIn } from "next-auth/react";
import { set } from "mongoose";

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggingInProgress, setLoggingInProgress] = useState(false);


    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoggingInProgress(true);
        await signIn('credentials', {email, password, callbackUrl: '/'});
        setLoggingInProgress(false);
    }

    return(
       
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl ">Login</h1>

            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>

                <input type="text" placeholder="email" 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}  
                    disabled={loggingInProgress}  
                />
                <input type="password" name="password" placeholder="password" value={password}
               disabled={loggingInProgress}
               onChange={ev => setPassword(ev.target.value)}/>  
            <button type="submit" disabled={loggingInProgress} >Login</button>                
            </form>

            </section>
       
    
    )
    

}