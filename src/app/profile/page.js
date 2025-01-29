'use client';
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export default function ProfilePage() {
    const { data: session, status } = useSession();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("");
    const [updatingUser, setUpdatingUser] = useState(false);
    const [userUpdated, setUserUpdated] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setEmail(session.user.email);
            setUsername(session.user.username);
            setPhone(session.user.phone);
            setRole(session.user.role);
        }
    }, [session]);

    if (status === "loading") {
        return <p>Loading...</p>;
    }

    if (status === "unauthenticated") {
        return redirect("/login");
    }

    async function handleProfileUpdate(ev) {
        ev.preventDefault();
        const response = await fetch("api/profile", {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                email,
                username,
                phone,
                role
            }),
           
        });
}

console.log(session);

return (
    <section className="mt-8">
        <h1 className="text-center text-primary text-4xl">Profile</h1>
        <form className="block max-w-sm mx-auto" onSubmit={handleProfileUpdate}>
            <div className="my-4">
                <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} />
                <input type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
                <input type="text" placeholder="phone" value={phone} onChange={ev => setPhone(ev.target.value)} />
                <input type="text" placeholder="role" value={role} onChange={ev => setRole(ev.target.value)} />
            </div>
            <button type="submit">Edit</button>
        </form>
    </section>
);
}