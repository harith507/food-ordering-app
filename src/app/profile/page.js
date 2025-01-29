'use client';
import { useSession, signIn } from "next-auth/react";
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
    const [userUpdated, setUserUpdated] = useState(false);
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
        setUpdatingUser(true);
        setUserUpdated(false);
        setError(false);

        try {
            const response = await fetch("api/profile", {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email : email || session?.user?.email,
                    username : username || session?.user?.username,
                    password: password || session?.user?.password,
                    phone   : phone || session?.user?.phone,
                    role: role || session?.user?.role
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update profile");
            }

            await signIn("credentials", { redirect: false });

            setUserUpdated(true);
            setUpdatingUser(false);
        } catch (error) {
            setError(error.message);
        } finally {
            setUpdatingUser(false);
        }
    }

    console.log(session);

    return (
        <section className="mt-8">
            <h1 className="text-center text-primary text-4xl">Profile</h1>
            <div className="max-w-md mx-auto">
                {userUpdated && (
                    <h2 className="text-center mt-4 bg-green-400 p-4 rounded-lg border border-green-300">
                    Profile Saved
                </h2>
                )}

                {updatingUser && (
                    <h2 className="text-center mt-4 bg-yellow-400 p-4 rounded-lg border border-green-300">
                    Profile Saving...
                </h2>
                )}
                
                
            </div>
            <form className="block max-w-sm mx-auto" onSubmit={handleProfileUpdate}>
                {error && <div className="error">{error}</div>}
                <div className="my-4">
                    <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="text" placeholder="username" value={username} onChange={ev => setUsername(ev.target.value)} />
                    <input type="password" placeholder="new password" value={password} onChange={ev => setPassword(ev.target.value)} />
                    <input type="text" placeholder="phone" value={phone} onChange={ev => setPhone(ev.target.value)} />
                    <input type="text" placeholder="role" value={role} onChange={ev => setRole(ev.target.value)} />
                </div>
                <button type="submit" disabled={updatingUser}>Save</button>
            </form>
        </section>
    );
}