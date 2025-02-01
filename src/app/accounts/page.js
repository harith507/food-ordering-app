'use client';
import Tabs from "@/components/layout/Tabs";
import UseProfile from "@/components/UseProfile";
import { useEffect, useState } from "react";
import Link from "next/link";

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

    

    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(profileRole === "waiter"|| profileRole === "kitchenStaff" || profileRole === "cashier"||profileRole === " "){
        return redirect("/login");
    }


    return(
        <section className="mt-8">
            <Tabs role={profileRole} />

            <div className=" max-w-2xl mx-auto mt-8 ">
                <div className="mb-4 items-center flex max-w-2xl mx-auto">
                <nav className=" font-semibold max-w-2xl mx-auto">
                <Link href={'/register'} className="border-2 text-gray-600  rounded-full px-8 py-2" > + Add New User</Link>
                </nav> 
                </div>
                {users?.length > 0 && users.map(user => (
                    <div key={user._id} className="bg-gray-200 rounded-lg mb-2 p-1 px-4 flex items-center gap-4">
                       <div className="grid grid-cols-2 md:grid-cols-3 gap-4 grow">
                        
                            {!!user.email && (<span>{user.email}</span>)}
                            {!user.email && (<span className="italic">No email</span>)}

                        
                            {!!user.role && (<span>{user.role}</span>)}
                            {!user.role && (<span className="italic">No Name</span>)}

                        
                            <div className="flex justify-end gap-3">
                                <Link className="block w-full text-gray-700 font-semibold border rounded-xl border-gray-700 px-6 py-2 " href={"/accounts/edit/"+user._id}>
                                    Edit
                                </Link > 
                                <button>
                                    Disable
                                </button>
                            
                            </div>

                        </div>
                        
                        
                    </div>
                ))}
            </div>


        </section>
    )
}