'use client';
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";
import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UsersPage() {

    const {loading:profileLoading, role:profileRole} = UseProfile();
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch('/api/users').then(response => {
          response.json().then(users => {
            setUsers(users);
          });
        })
      }, []);

    const handleDisable = async (userId) => {
        const savingPromise = new Promise(async(resolve,reject) => {
            const response = await fetch('/api/users', {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: userId, active: false })
              });

                if(response.ok){
                    setUsers(users.map(u => u._id === userId ? { ...u, active: false } : u));
                    resolve();
                }
                else{
                    reject();
                }
        });
        await toast.promise(savingPromise, {
            loading: "Loading...",
            success: "Success",
            error: "Failed",
        })
    };

    const handleEnable = async (userId) => {
        const savingPromise = new Promise(async(resolve,reject) => {
            const response = await fetch('/api/users', {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ id: userId, active: true })
      });
      if(response.ok){
        setUsers(users.map(u => u._id === userId ? { ...u, active: true } : u));
        resolve();
    }
    else{
        reject();
    }
});
await toast.promise(savingPromise, {
loading: "Loading...",
success: "Success",
error: "Failed",
})
     
    };

    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(profileRole === "waiter"|| profileRole === "kitchenStaff" || profileRole === "cashier"||profileRole === " "){
        return redirect("/login");
    }

    console.log(users);

    return(
        <section className="mt-8">
            <Tabs role={profileRole} />

            <div className=" max-w-2xl mx-auto mt-8 ">
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className="bg-gray-200 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                        
                            {!!user.email && (<span>{user.email}</span>)}
                            {!user.email && (<span className="italic">No email</span>)}

                        
                            {!!user.role && (<span>{user.role}</span>)}
                            {!user.role && (<span className="italic">No Name</span>)}

                            <span>{user.active ? "Active" : "Disable"}</span>
                        
                            <div className="flex justify-end gap-3">
                                <Link className="block w-full text-gray-700 font-semibold border rounded-xl border-gray-700 px-6 py-2 " href={"/accounts/edit/"+user._id}>
                                    Edit
                                </Link > 
                                <button onClick={() => user.active ? handleDisable(user._id) : handleEnable(user._id)}>
                                   {user.active ? "Disable" : "Enable"}
                                </button>
                            
                            </div>

                        </div>
                        
                        
                    </div>
                ))}
            </div>
        </section>
    )
}