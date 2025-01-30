'use client';
import UseProfile from "@/components/UseProfile";
import Tabs from "@/components/layout/Tabs";

export default function accountEditPage() { 
    
    const {loading:profileLoading, role:profileRole} = UseProfile();

    if(profileLoading){
        return <p>Loading...</p>;
    }

    if(profileRole === "waiter"|| profileRole === "kitchenStaff" || profileRole === "cashier"||profileRole === " "){
        return redirect("/login");}



    return(
        <section className="">
            <Tabs role={profileRole} />

            <div className="mt-8">
                user info form
            </div>
            
            </section>
    )}