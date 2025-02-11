"use client";
import Tabs from "@/components/layout/Tabs";
import Link from "next/link";
import { useState } from "react";
import UseProfile from "@/components/UseProfile";

export default function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("waiter"); // Set default role to "waiter"
    const [creatingUser, setCreatingUser] = useState(false);
    const [userCreated, setUserCreated] = useState(true);
    const [error, setError] = useState(false);
    const { loading: profileLoading, role: profileRole } = UseProfile();

    async function handleFromSubmit(ev) {
        ev.preventDefault();
        setCreatingUser(true);
        setError(false);
        try {
            const response = await fetch("/api/register", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password,
                    username,
                    phone,
                    role
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error);
            }
            setUserCreated(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setCreatingUser(false);
        }
    }

    if(profileRole !== "businessOwner") {
        <div>Please return, you have no auhtorization on this page!</div>
    }

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl mb-4">Register</h1>
            <Tabs role={profileRole} />
            <form className="block max-w-sm mx-auto mt-4" onSubmit={handleFromSubmit}>
                {!userCreated && (
                    <div className="my-4">
                        User created successfully.<br />
                        Please {''}
                        <Link className="underline" href={'/accounts'}>Check at Users Tab &raquo;</Link>.
                    </div>
                )}
                {error && <div className="error">{error}</div>}
                <label>Email</label>
                <input type="email" placeholder="email" value={email} disabled={creatingUser} onChange={ev => setEmail(ev.target.value)} />
                <label>Password</label>
                <input type="password" placeholder="password" value={password} disabled={creatingUser} onChange={ev => setPassword(ev.target.value)} />
                <label>Username</label>
                <input type="text" placeholder="username" value={username} disabled={creatingUser} onChange={ev => setUsername(ev.target.value)} />
                <label>Email</label>
                <input type="text" placeholder="phone number" value={phone} disabled={creatingUser} onChange={ev => setPhone(ev.target.value)} />

                <label className="flex flex-col">
                    Pick a role:
                    <select value={role} disabled={creatingUser} onChange={ev => setRole(ev.target.value)} >
                        <option value="businessOwner">Business Owner</option>
                        <option value="waiter">Waiter</option>
                        <option value="kitchenStaff">Kitchen Staff</option>
                        <option value="cashier">Cashier</option>
                    </select>
                </label>
                <button disabled={creatingUser} type="submit">Register</button>

            </form>
        </section>
    );
}