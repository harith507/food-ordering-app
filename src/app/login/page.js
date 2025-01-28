'use client';
import {useState} from "react";

export default function LoginPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loggingInProgress, setLoggingInProgress] = useState(false);

    async function handleFormSubmit(ev){
        ev.preventDefault();
        setLoggingInProgress(true);
        const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        if (response.ok) {
            
        }else {

        }
        setLoggingInProgress(true);
    }

    return(
        <>
            <section className="mt-8">
                <h1 className="text-center text-primary text-4xl ">Login</h1>

            <form className="max-w-xs mx-auto" onSubmit={handleFormSubmit}>
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