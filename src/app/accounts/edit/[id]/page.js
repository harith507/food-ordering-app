'use client';
import UseProfile from "@/components/UseProfile";
import UserForm from "@/components/UserForm";
import Tabs from "@/components/layout/Tabs";
import { useEffect, useState } from "react";import { redirect, useParams } from "next/navigation";

export default function accountEditPage() { 
    
    const {loading:profileLoading, role:profileRole} = UseProfile();
    const [user,setUser] = useState(null);
    const {id} = useParams();


    useEffect(() => {
        fetch("/api/users").then(res =>{
            res.json().then(users => {
                const user = users.find(i => i._id === id);
                setUser(user);
            })
        })
    }, []);
    

    function handleSaveButtonClick(ev, data){
        ev.preventDefault();
        
        fetch("/api/profile", {
            method: "PUT",
            body: JSON.stringify({...data,_id:id}),
            headers: {"Content-Type": "application/json"}
        }).then(res => {
            if(res.ok){
                redirect("/accounts");
            }
         
        })
    }
    
    
    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(profileRole === "waiter"|| profileRole === "kitchenStaff" || profileRole === "cashier"||profileRole === " "){
        return redirect("/login");}



    return(
        <section className="">
            <Tabs role={profileRole} />

            <div className="mt-8">
                <UserForm user={user} onSave={handleSaveButtonClick}/>
            </div>
            
            </section>
    )}