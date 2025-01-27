"use client";
import { useState } from "react";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");

    function handleFromSubmit(ev){
        ev.preventDefault();
        fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
                name,
                phone,
                role
            }),
            headers: {
                "Content-Type": "application/json"
            },
        })

    }

    return(
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl ">Register</h1>
            <form className="block max-w-sm mx-auto" onSubmit={handleFromSubmit}>
                <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="password" placeholder="password" value={password} onChange={ev => setPassword(ev.target.value)} />
                <input type="text" placeholder="name" value={name} onChange={ev => setName(ev.target.value) }/>
                <input type="text" placeholder="phone number" value={phone} onChange={ev => setPhone(ev.target.value) }/>
                
                <label className="flex flex-col">
                Pick a role:
                <select value={role} onChange={ev => setRole(ev.target.value)} defaultValue={"businessOwner"}>
                    <option value="businessOwner">Business Owner</option>
                    <option value="waiter">Waiter</option>
                    <option value="kitchenStaff">Kitchen Staff</option>
                </select>
                </label>
                <button type="submit">Register</button>
            </form>
        </section>
    );
}