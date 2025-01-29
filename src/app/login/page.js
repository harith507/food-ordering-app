'use client';
import {useState} from "react";
import { signIn } from "next-auth/react";
import { set } from "mongoose";

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggingInProgress, setLoggingInProgress] = useState(false);
    const [error, setError] = useState(false);

    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoggingInProgress(true);
        setError(false);
    try {
        await signIn("credentials", {
            username,
            password,
            redirect: false
        });
        setLoggingInProgress(false);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }
        setUserCreated(false);
    } catch (error) {
        setError(error.message);
    } 
    }

    return(
        <>
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl ">Login</h1>

            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
            {error && <div className="error">{error}</div>}
                <input type="text" placeholder="username" 
                    value={username} 
                    onChange={ev => setUsername(ev.target.value)}  
                    disabled={loggingInProgress}  
                />
                <input type="password" placeholder="password"  
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}   
                    disabled={loggingInProgress} 
                />   
            <button type="submit" disabled={loggingInProgress} >Login</button>                
            </form>

            </section>
        </>
    
    )
    

}